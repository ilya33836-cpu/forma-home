// Переносит отобранные изображения в public/images по финальной структуре.
// Запуск идемпотентен: недостающие файлы просто пропускаются.
// scripts/finalize-images.mjs
import { copyFile, mkdir, rm, readdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const pool = path.join(root, 'scripts', 'out', 'pool')
const out = path.join(root, 'public', 'images')

const MAP = {
  'hero/main.jpg': 'm1-3.jpg',

  'home/intro.jpg': 'm2-6.jpg',
  'home/concept.jpg': 'm2-3.jpg',
  'home/light.jpg': 'm1-1.jpg',
  'home/feature.jpg': 'm2-4.jpg',
  'home/testimonial.jpg': 'm1-6.jpg',
  'home/contact-texture.jpg': 'm5-8.jpg',

  'projects/apartment/cover.jpg': 'm1-0.jpg',
  'projects/apartment/gallery-1.jpg': 'm9-0.jpg',
  'projects/apartment/gallery-2.jpg': 'm3-11.jpg',
  'projects/apartment/gallery-3.jpg': 'm5-0.jpg',
  'projects/apartment/gallery-4.jpg': 'm6-11.jpg',
  'projects/apartment/gallery-5.jpg': 'm4-2.jpg',

  'projects/house/cover.jpg': 'interior-detail.jpg',
  'projects/house/gallery-1.jpg': 'interior-living.jpg',
  'projects/house/gallery-2.jpg': 'house-exterior-2.jpg',
  'projects/house/gallery-3.jpg': 'bedr-0.jpg',
  'projects/house/gallery-4.jpg': 'bath-2.jpg',
  'projects/house/gallery-5.jpg': 'bath-0.jpg',

  'studio/space.jpg': 'd1-0.jpg',
  'studio/team.jpg': 'd1-11.jpg',
  'studio/review.jpg': 'team-0.jpg',
  'studio/materials.jpg': 'samp-7.jpg',

  'process/plan.jpg': 'd2-9.jpg',
  'process/draft.jpg': 'd2-0.jpg',
  'process/desk.jpg': 'd2-3.jpg',

  'materials/plaster.jpg': 'm5-8.jpg',
  'materials/stone.jpg': 'lux-c-9.jpg',
  'materials/concrete.jpg': 'm7-0.jpg',
  'materials/linen.jpg': 'm2-2.jpg',
  'materials/clay.jpg': 'cta-6.jpg',
  'materials/fabric.jpg': 'material-fabric.jpg',
  'materials/facade.jpg': 'ext1-3.jpg',

  'before/before-0.jpg': 'before-0.jpg',
  'before/before-1.jpg': 'd3-0.jpg',
}

const dirs = new Set(Object.keys(MAP).map((k) => path.dirname(k)))
for (const d of dirs) await mkdir(path.join(out, d), { recursive: true })

let ok = 0
const missing = []
for (const [dest, src] of Object.entries(MAP)) {
  const target = path.join(out, dest)
  const candidates = [path.join(pool, src), path.join(out, path.basename(src)), path.join(out, src)]
  let done = false
  for (const from of candidates) {
    try {
      await copyFile(from, target)
      done = true
      break
    } catch {}
  }
  if (done) ok++
  else missing.push(`${dest} <- ${src}`)
}
console.log(`скопировано ${ok}, пропущено ${missing.length}`)
for (const m of missing) console.log(`  ${m}`)

// удаляем всё, чего нет в MAP
const keep = new Set(Object.keys(MAP).map((k) => k.replace(/\\/g, '/')))
async function prune(dir, prefix = '') {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name
    if (e.isDirectory()) await prune(path.join(dir, e.name), rel)
    else if (!keep.has(rel)) await rm(path.join(dir, e.name), { force: true })
  }
}
await prune(out)
console.log('лишние файлы удалены')

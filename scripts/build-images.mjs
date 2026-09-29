// Готовит адаптивные варианты изображений для статического хостинга.
//
// Оптимизатора next/image на GitHub Pages нет, поэтому варианты считаются заранее:
// из каждого исходника получается набор WebP нужной ширины плюс крошечная
// LQIP-подложка. Скрипт пишет lib/image-manifest.ts, на который опираются
// lib/image-loader.ts и компонент Img.
//
// Запускается автоматически (predev / prebuild). Уже готовые файлы пропускаются,
// поэтому повторный запуск почти мгновенный.

import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SRC_DIR = path.join(root, 'public', 'images')
const OUT_DIR = path.join(SRC_DIR, 'opt')
const MANIFEST = path.join(root, 'lib', 'image-manifest.ts')

// Ширины под deviceSizes/imageSizes из next.config.ts. Ровно эти значения
// запрашивает next/image, поэтому srcset попадает в существующие файлы.
const WIDTHS = [320, 400, 640, 828, 1080, 1280, 1600]
const QUALITY = 68
const LQIP_WIDTH = 20

const list = async (dir) => {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'opt') continue
      out.push(...(await list(p)))
    } else if (/\.jpe?g$/i.test(e.name)) {
      out.push(p)
    }
  }
  return out.sort()
}

const outName = (rel, width) => path.join(OUT_DIR, rel.replace(/\.jpe?g$/i, `-${width}.webp`))

const newer = async (a, b) => {
  try {
    const [sa, sb] = await Promise.all([stat(a), stat(b)])
    return sb.mtimeMs >= sa.mtimeMs
  } catch {
    return false
  }
}

const files = await list(SRC_DIR)
await mkdir(OUT_DIR, { recursive: true })

const manifest = {}
let generated = 0
let reused = 0
let sourceBytes = 0
let outBytes = 0

for (const file of files) {
  const rel = path.relative(SRC_DIR, file).split(path.sep).join('/')
  const key = `/images/${rel}`
  sourceBytes += (await stat(file)).size

  const meta = await sharp(file).metadata()
  const widths = WIDTHS.filter((w) => w <= meta.width)
  if (!widths.length) widths.push(meta.width)

  let cacheHit = true
  for (const w of widths) {
    if (!(await newer(file, outName(rel, w)))) {
      cacheHit = false
      break
    }
  }

  if (cacheHit) {
    reused += widths.length
  } else {
    for (const w of widths) {
      const dest = outName(rel, w)
      await mkdir(path.dirname(dest), { recursive: true })
      await sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: 5 })
        .toFile(dest)
      generated += 1
    }
  }

  for (const w of widths) outBytes += (await stat(outName(rel, w))).size

  // Подложка: 20 px по ширине, размытая — тает при появлении полной картинки.
  const lqipPath = outName(rel, 'lqip')
  if (!(await newer(file, lqipPath))) {
    const buf = await sharp(file)
      .resize({ width: LQIP_WIDTH })
      .blur(1)
      .webp({ quality: 30, effort: 3 })
      .toBuffer()
    await writeFile(lqipPath.replace(/\.webp$/, '.txt'), buf.toString('base64'))
  }
  const blur = (await readFile(path.join(OUT_DIR, rel.replace(/\.jpe?g$/i, '-lqip.txt')))).toString()

  manifest[key] = {
    width: meta.width,
    height: meta.height,
    widths,
    blur: `data:image/webp;base64,${blur}`,
  }
}

await writeFile(
  MANIFEST,
  `// Файл создаётся скриптом scripts/build-images.mjs — не редактировать вручную.
// Крошечная подложка и список готовых ширин для lib/image-loader.ts и components/Img.

export type ImageEntry = {
  width: number
  height: number
  widths: number[]
  blur: string
}

export const imageManifest: Record<string, ImageEntry> = ${JSON.stringify(manifest, null, 2)}
`,
  'utf8',
)

const mb = (n) => `${Math.round(n / 1024 / 1024 * 100) / 100} MB`
console.log(
  `images: ${files.length} исходников (${mb(sourceBytes)}) -> ${generated} новых, ${reused} из кэша (${mb(outBytes)})`,
)

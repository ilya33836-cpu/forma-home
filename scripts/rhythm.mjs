// Нормализует вертикальный ритм секций.
// scripts/rhythm.mjs
import { readdir, readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'components', 'sections')

const STD = 'py-20 sm:py-24 lg:py-28'
const WIDE = 'py-24 sm:py-28 lg:py-32'

const MAP = {
  'Hero.tsx': null,
  'Intro.tsx': STD,
  'IdeaToSpace.tsx': STD,
  'ProjectsGrid.tsx': WIDE,
  'FeaturedCase.tsx': 'lg:py-0',
  'Viewer3D.tsx': WIDE,
  'Services.tsx': STD,
  'Process.tsx': STD,
  'Assembly3D.tsx': WIDE,
  'Studio.tsx': WIDE,
  'Numbers.tsx': 'py-16 sm:py-20 lg:py-24',
  'Testimonials.tsx': WIDE,
  'CTA.tsx': 'py-20 sm:py-24 lg:py-32',
  'ContactSection.tsx': STD,
}

for (const [file, pad] of Object.entries(MAP)) {
  if (!pad) continue
  const p = path.join(dir, file)
  let src = await readFile(p, 'utf8')
  const before = src
  src = src.replace(/className="([^"]*?)\bpy-\d+ sm:py-\d+(?: lg:py-\d+)?\b([^"]*?)"/, (_m, a, b) => {
    const cls = `${a}${b}`.replace(/\s+/g, ' ').trim()
    if (!cls) return `className="${pad}"`
    return `className="${cls.includes('py-') ? cls : `${cls} ${pad}`}"`
  })
  if (src !== before) {
    await writeFile(p, src, 'utf8')
    console.log(`обновлён ${file} → ${pad}`)
  } else {
    console.log(`без изменений ${file}`)
  }
}

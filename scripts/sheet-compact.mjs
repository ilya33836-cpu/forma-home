// Компактные контактные листы для отбора изображений.
// scripts/sheet-compact.mjs
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const poolDir = path.join(root, 'scripts', 'out', 'pool')
const sheetDir = path.join(root, 'scripts', 'out')

const COLS = 6
const THUMB = 150
const PER_SHEET = 48

const groups = {
  A: ['lux-a', 'lux-b', 'lux-c'],
  B: ['r3d-a', 'r3d-b', 'r3d-c', 'p3', 'before', 'cta'],
}

const all = (await readdir(poolDir)).filter((f) => f.endsWith('.jpg')).sort()

for (const [name, slots] of Object.entries(groups)) {
  const files = all.filter((f) => slots.some((s) => f.startsWith(`${s}-`)))
  const sheets = []
  for (let i = 0; i < files.length; i += PER_SHEET) sheets.push(files.slice(i, i + PER_SHEET))
  for (let s = 0; s < sheets.length; s++) {
    const chunk = sheets[s]
    const html = `<!doctype html><meta charset="utf-8"><title>${name}${s + 1}</title>
<style>
body{background:#171715;color:#eee;font:10px/1.2 system-ui;margin:0;padding:8px}
.grid{display:grid;grid-template-columns:repeat(${COLS},1fr);gap:5px}
figure{margin:0;position:relative}
img{width:100%;height:${THUMB}px;object-fit:cover;display:block;background:#333}
figcaption{position:absolute;left:0;bottom:0;background:#000d;padding:1px 4px;font-weight:600}
</style><div class="grid">${chunk
      .map((f) => `<figure><img src="/scripts/out/pool/${f}"><figcaption>${f.replace('.jpg', '')}</figcaption></figure>`)
      .join('')}</div>`
    await writeFile(path.join(sheetDir, `c-${name}${s + 1}.html`), html)
    console.log(`c-${name}${s + 1}.html — ${chunk.length} изображений`)
  }
}

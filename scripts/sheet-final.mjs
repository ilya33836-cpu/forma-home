// Контактный лист финального набора public/images.
// scripts/sheet-final.mjs
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const base = path.join(root, 'public', 'images')

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) out.push(p)
  }
  return out
}

const files = (await walk(base)).sort()
const html = `<!doctype html><meta charset="utf-8"><title>final</title>
<style>
body{background:#171715;color:#eee;font:10px/1.2 system-ui;margin:0;padding:8px}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
figure{margin:0;position:relative}
img{width:100%;height:150px;object-fit:cover;display:block;background:#333}
figcaption{position:absolute;left:0;bottom:0;background:#000d;padding:1px 4px;font-weight:600}
</style><div class="grid">${files
  .map((f) => {
    const rel = path.relative(base, f).replace(/\\/g, '/')
    return `<figure><img src="/public/images/${rel}"><figcaption>${rel}</figcaption></figure>`
  })
  .join('')}</div>`

await writeFile(path.join(root, 'scripts', 'out', 'c-final.html'), html)
console.log(`c-final.html — ${files.length}`)

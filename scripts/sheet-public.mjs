// Контактный лист для уже скачанных public/images.
// scripts/sheet-public.mjs
import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dir = path.join(root, 'public', 'images')
const files = (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f)).sort()

const html = `<!doctype html><meta charset="utf-8"><title>public</title>
<style>
body{background:#171715;color:#eee;font:10px/1.2 system-ui;margin:0;padding:8px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:6px}
figure{margin:0;position:relative}
img{width:100%;height:190px;object-fit:cover;display:block;background:#333}
figcaption{position:absolute;left:0;bottom:0;background:#000d;padding:1px 4px;font-weight:600}
</style><div class="grid">${files
  .map(
    (f) =>
      `<figure><img src="/public/images/${f}"><figcaption>${f}</figcaption></figure>`,
  )
  .join('')}</div>`

await writeFile(path.join(root, 'scripts', 'out', 'c-public.html'), html)
console.log(`c-public.html — ${files.length}`)

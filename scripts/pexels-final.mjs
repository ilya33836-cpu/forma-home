// Точечная дозагрузка: минимализм, скандинавия, ваби-саби, travertine.
// scripts/pexels-final.mjs
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { execFile } from 'node:child_process'
import { promisify } from 'node:util'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const execFileP = promisify(execFile)
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const poolDir = path.join(root, 'scripts', 'out', 'pool')
const sheetDir = path.join(root, 'scripts', 'out')
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
const CAND = 12

const SHEETS = {
  f1: [
    ['m1', 'scandinavian minimal living room beige sofa'],
    ['m2', 'wabi sabi interior plaster wall minimal'],
    ['m3', 'minimalist living room neutral tones large window'],
  ],
  f2: [
    ['m4', 'travertine bathroom minimal stone beige'],
    ['m5', 'minimalist kitchen beige cabinets wood'],
    ['m6', 'bedroom linen bedding neutral minimal beige wall'],
  ],
  f3: [
    ['m7', 'concrete wall interior minimal daylight'],
    ['m8', 'modern minimal house interior white staircase'],
    ['m9', 'minimalist dining table wood chairs beige room'],
  ],
  f4: [
    ['d1', 'design studio interior minimal desk shelves'],
    ['d2', 'architect desk minimal tools drawings top view'],
    ['d3', 'empty apartment room white walls window light'],
  ],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function curl(url, out) {
  const args = ['-sL', '--compressed', '--max-time', '60', '-H', `User-Agent: ${UA}`,
    '-H', 'Accept-Language: en-US,en;q=0.9', url]
  if (out) args.push('-o', out)
  await execFileP('curl.exe', args, { maxBuffer: 64 * 1024 * 1024 })
}

async function search(query) {
  const url = `https://www.pexels.com/search/${encodeURIComponent(query)}/`
  for (let attempt = 0; attempt < 4; attempt++) {
    const file = path.join(poolDir, `_s.html`)
    await curl(url, file)
    const html = await readFile(file, 'utf8')
    if (!html.includes('pexels-photo-')) {
      await sleep(6000 * (attempt + 1))
      continue
    }
    const ids = []
    const re = /images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg/g
    let m
    while ((m = re.exec(html)) !== null) if (!ids.includes(m[1])) ids.push(m[1])
    await sleep(1300)
    return ids.slice(0, CAND)
  }
  throw new Error('rate limit')
}

const imgUrl = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`

async function main() {
  await mkdir(poolDir, { recursive: true })
  for (const [sheet, slots] of Object.entries(SHEETS)) {
    const got = []
    for (const [slot, query] of slots) {
      try {
        const ids = await search(query)
        for (let i = 0; i < ids.length; i++) {
          const file = path.join(poolDir, `${slot}-${i}.jpg`)
          await curl(imgUrl(ids[i]), file)
          const buf = await readFile(file)
          if (buf.length < 15000) continue
          got.push({ slot, i, id: ids[i] })
          console.log(`ok  ${slot}-${i} <- ${ids[i]}`)
        }
      } catch (e) {
        console.log(`ERR ${slot}: ${e.message}`)
      }
    }
    const html = `<!doctype html><meta charset="utf-8"><title>${sheet}</title>
<style>
body{background:#171715;color:#eee;font:10px/1.2 system-ui;margin:0;padding:8px}
h2{font-size:11px;color:#B5ADA0;margin:10px 0 5px;font-weight:500}
.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:5px}
figure{margin:0;position:relative}
img{width:100%;height:150px;object-fit:cover;display:block;background:#333}
figcaption{position:absolute;left:0;bottom:0;background:#000d;padding:1px 4px;font-weight:600}
</style>${slots
      .map(
        ([slot, q]) =>
          `<h2>${slot} — ${q}</h2><div class="grid">${got
            .filter((g) => g.slot === slot)
            .map((g) => `<figure><img src="/scripts/out/pool/${slot}-${g.i}.jpg"><figcaption>${slot}-${g.i}</figcaption></figure>`)
            .join('')}</div>`,
      )
      .join('')}`
    await writeFile(path.join(sheetDir, `${sheet}.html`), html)
    console.log(`\nлист ${sheet}.html готов\n`)
  }
}

main()

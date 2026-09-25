// Собирает пул-кандидатов изображений с Pexels и строит контактные листы для визуального отбора.
// Пул не очищается между запусками: scripts/pexels-pool.mjs [имя-листа]
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

const CAND = 8

const SHEETS = {
  q1: [
    ['hero', 'luxury living room interior natural light large windows'],
    ['p1', 'apartment interior design living room neutral modern'],
    ['p2', 'modern house interior living room wood stone fireplace'],
  ],
  q2: [
    ['p3', 'contemporary architecture house exterior modern'],
    ['before', 'empty room interior bare walls renovation'],
    ['cta', 'minimalist interior detail beige wall vase'],
  ],
  q3: [
    ['about', 'architecture studio interior workspace models desk'],
    ['stair', 'modern staircase interior concrete minimal architecture'],
    ['kitchen', 'kitchen interior stone island wood minimal'],
  ],
  q4: [
    ['d1', 'bedroom interior minimal neutral linen'],
    ['d2', 'bathroom interior stone minimal travertine'],
    ['d3', 'dining room interior minimal wood table'],
    ['d4', 'shelf interior detail minimal ceramics'],
    ['d5', 'window curtain daylight shadow minimal interior'],
    ['d6', 'exterior terrace modern house wood stone'],
  ],
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function curl(url, out) {
  const args = [
    '-sL',
    '--compressed',
    '--max-time',
    '60',
    '-H',
    `User-Agent: ${UA}`,
    '-H',
    'Accept-Language: en-US,en;q=0.9',
    url,
  ]
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
      await sleep(5000 * (attempt + 1))
      continue
    }
    const ids = []
    const re = /images\.pexels\.com\/photos\/(\d+)\/pexels-photo-\1\.jpeg/g
    let m
    while ((m = re.exec(html)) !== null) {
      if (!ids.includes(m[1])) ids.push(m[1])
    }
    await sleep(1200)
    return ids.slice(0, CAND)
  }
  throw new Error('rate limit')
}

const imgUrl = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1800`

async function main() {
  await mkdir(poolDir, { recursive: true })
  const only = process.argv[2]
  const indexFile = path.join(sheetDir, 'pool-index.json')
  const index = {}

  for (const [sheet, slots] of Object.entries(SHEETS)) {
    if (only && only !== sheet) continue
    const got = []
    for (const [slot, query] of slots) {
      try {
        const ids = await search(query)
        for (let i = 0; i < ids.length; i++) {
          const file = path.join(poolDir, `${slot}-${i}.jpg`)
          await curl(imgUrl(ids[i]), file)
          const buf = await readFile(file)
          if (buf.length < 15000) continue
          got.push({ slot, i, id: ids[i], file: `/scripts/out/pool/${slot}-${i}.jpg` })
          console.log(`ok  ${slot}-${i} <- ${ids[i]}`)
        }
      } catch (e) {
        console.log(`ERR ${slot}: ${e.message}`)
      }
    }
    index[sheet] = { slots, got }
    await writeFile(indexFile, JSON.stringify(index, null, 2))

    const rows = slots
      .map(
        ([slot, query]) =>
          `<section><h2>${slot} — ${query}</h2><div class="row">${got
            .filter((g) => g.slot === slot)
            .map((g) => `<img src="${g.file}" alt=""><b>${slot}-${g.i}</b>`)
            .join('')}</div></section>`,
      )
      .join('')
    await writeFile(
      path.join(sheetDir, `${sheet}.html`),
      `<!doctype html><meta charset="utf-8"><title>${sheet}</title>
<style>
body{background:#171715;color:#eee;font:12px/1.4 system-ui;margin:0;padding:14px}
h2{font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#B5ADA0;margin:14px 0 6px;font-weight:500}
.row{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
img{width:100%;height:200px;object-fit:cover;display:block;background:#333;position:relative}
b{position:absolute;left:0;bottom:0;background:#000c;padding:2px 5px;font-size:10px;font-weight:500}
</style>${rows}`,
    )
    console.log(`\nлист ${sheet}.html готов\n`)
  }
}

main()

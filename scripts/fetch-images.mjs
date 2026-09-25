// Загружает реальные фотографии интерьеров в public/images и собирает контактный лист для визуальной проверки.
import { mkdir, writeFile, readFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'scripts', 'out')
const imgDir = path.join(root, 'public', 'images')

// Каталог: имя файла -> список кандидатов (id из images.unsplash.com/photo-...)
const CATALOG = {
  'hero-main': ['1600210492486-724fe5c67fb0', '1600607687939-ce8a6c25118c', '1600566753086-00f18fb6b3ea'],
  'interior-living': ['1600585154340-be6161a56a0c', '1600607687920-4e2a09cf159d', '1618221195710-dd6b41faaea6'],
  'interior-living-2': ['1600566753190-17f0baa2a6c3', '1600573472550-8090b5e0745e', '1567016432779-094069958ea5'],
  'interior-living-3': ['1616486338812-3dadae4b4ace', '1600047509807-ba8f99d2cdde', '1586023492125-27b2c045efd7'],
  'interior-kitchen': ['1484154218962-a197022b5858', '1556912172-45b7abe8b7e1', '1600607687644-c7171b42498b'],
  'interior-kitchen-2': ['1556909114-f6e7ad7d3136', '1600566752447-f4c9fb1c4c1e', '1600607688969-a5bfcd646154'],
  'interior-bedroom': ['1616594039964-ae9021a400a0', '1505693416388-ac5ce068fe85', '1522708323590-d24dbb6b0267'],
  'interior-bath': ['1600566753051-f0b89df2dd90', '1507089947368-19c1da9775ae', '1620626011761-996317b8d101'],
  'interior-stair': ['1512917774080-9991f1c4c750', '1449844908441-8829872d2607', '1600585154340-be6161a56a0c'],
  'interior-hall': ['1600210491369-e753d80a41f3', '1600607687939-ce8a6c25118c', '1600210492486-724fe5c67fb0'],
  'interior-dining': ['1615529182904-14819c35db37', '1592078615290-033ee584e267', '1600121848594-d8644e57abab'],
  'interior-detail': ['1600607688960-e095ff83135c', '1600210491892-03d54c0aaf87', '1600489000022-c2086d79f9d4'],
  'interior-minimal': ['1513694203232-719a280e022f', '1493809842364-78817add7ffb', '1502005229762-cf1b2da7c5d6'],
  'house-exterior': ['1600596542815-ffad4c1539a9', '1600585152220-90363fe7e115', '1600607687939-ce8a6c25118c'],
  'house-exterior-2': ['1613490493576-7fde63acd811', '1605146769289-440113cc3d00', '1600596542815-ffad4c1539a9'],
  'sketch-plan': ['1454165804606-c3d57bc86b40', '1503387762-592deb58ef4e', '1541888946425-d81bb19240f5'],
  'sketch-2': ['1416339306562-f3d12fefd36f', '1509391366360-2e959784a276', '1531973576160-7125cd663d86'],
  'material-stone': ['1595514535215-9a5e0e8e04be', '1615873968403-89e068629265', '1523413651479-597eb2da0ad6'],
  'material-wood': ['1519643381401-22c77e60520e', '1610701596007-11502861dcfa', '1449247709967-d4461a6a6103'],
  'material-fabric': ['1528459105426-b9548367069b', '1595341888016-a392ef81b7de', '1517705008128-361805f42e86'],
  'material-metal': ['1504328345606-18bbc8c9d7d1', '1533106418989-88406c7cc8ca', '1610375461369-d613b564f4c4'],
  'material-plaster': ['1615529182904-14819c35db37', '1577495508048-b635879837f1', '1517581177682-a085bb7ffb15'],
}

const WIDTH = Number(process.env.W || 1800)

async function head(url) {
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), 15000)
    const r = await fetch(url, { method: 'HEAD', signal: ctl.signal })
    clearTimeout(t)
    return r.ok ? Number(r.headers.get('content-length') || 0) : 0
  } catch {
    return 0
  }
}

async function exists(p) {
  try {
    await access(p, constants.F_OK)
    return true
  } catch {
    return false
  }
}

const url = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${WIDTH}&q=78&fm=jpg`

async function main() {
  await mkdir(outDir, { recursive: true })
  await mkdir(imgDir, { recursive: true })

  const report = []
  for (const [name, ids] of Object.entries(CATALOG)) {
    const file = path.join(imgDir, `${name}.jpg`)
    if (await exists(file)) {
      report.push({ name, id: 'cached', ok: true, size: 0 })
      console.log(`skip  ${name} (cached)`)
      continue
    }
    let done = false
    for (const id of ids) {
      const len = await head(url(id))
      if (len < 20000) continue
      try {
        const res = await fetch(url(id))
        if (!res.ok) continue
        const buf = Buffer.from(await res.arrayBuffer())
        if (buf.length < 20000) continue
        await writeFile(file, buf)
        report.push({ name, id, ok: true, size: buf.length })
        console.log(`ok    ${name} <- ${id} (${(buf.length / 1024) | 0} KB)`)
        done = true
        break
      } catch {
        /* next candidate */
      }
    }
    if (!done) {
      report.push({ name, id: null, ok: false, size: 0 })
      console.log(`FAIL  ${name}`)
    }
  }

  await writeFile(path.join(outDir, 'report.json'), JSON.stringify(report, null, 2))

  const cells = report
    .map(
      (r) =>
        `<figure><img src="../images/${r.name}.jpg" alt="${r.name}"><figcaption>${r.name}${r.ok ? '' : ' — НЕТ'}</figcaption></figure>`,
    )
    .join('\n')
  await writeFile(
    path.join(outDir, 'contact.html'),
    `<!doctype html><meta charset="utf-8"><title>Контактный лист</title>
<style>
body{background:#171715;color:#eee;font:12px/1.4 system-ui;margin:0;padding:16px;display:grid;grid-template-columns:repeat(4,1fr);gap:14px}
figure{margin:0}img{width:100%;height:190px;object-fit:cover;display:block;background:#333}
figcaption{padding-top:5px;letter-spacing:.08em;text-transform:uppercase;font-size:10px;color:#B5ADA0}
</style>${cells}`,
  )
  console.log('\ncontact sheet -> scripts/out/contact.html')
}

main()

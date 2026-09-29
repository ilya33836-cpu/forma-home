// Собирает статическое OG-изображение 1200×630 в public/og/og-home.jpg.
// Нужно для GitHub Pages: там нет рантайма Next, поэтому картинка кладётся в public.
// Запуск: node scripts/gen-og.mjs
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const outDir = path.join(root, 'public', 'og')

const SAND = '#F4F1EB'
const SAND2 = '#E9E5DD'
const CLAY = '#B5ADA0'
const INK = '#171715'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${SAND}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${INK}"/>

  <text x="80" y="128" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700" letter-spacing="7" fill="${INK}">FORMA</text>
  <text x="248" y="128" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="400" letter-spacing="7" fill="#8C877E">HOME</text>

  <text x="80" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="${INK}">Пространства,</text>
  <text x="80" y="416" font-family="Georgia, 'Times New Roman', serif" font-size="76" fill="${INK}">которые живут</text>

  <line x1="80" y1="472" x2="1120" y2="472" stroke="${INK}" stroke-opacity="0.15" stroke-width="1"/>

  <text x="80" y="520" font-family="Arial, Helvetica, sans-serif" font-size="21" letter-spacing="3.4" fill="#6E6A63">СТУДИЯ ДИЗАЙНА ИНТЕРЬЕРОВ И АРХИТЕКТУРЫ · МОСКВА</text>

  <rect x="80" y="558" width="56" height="14" fill="${SAND2}"/>
  <rect x="146" y="558" width="56" height="14" fill="${CLAY}"/>
  <rect x="212" y="558" width="56" height="14" fill="#77736C"/>
  <rect x="278" y="558" width="56" height="14" fill="${INK}"/>

  <text x="1120" y="573" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#8C877E" text-anchor="end">forma-home</text>
</svg>`

await mkdir(outDir, { recursive: true })
const target = path.join(outDir, 'og-home.jpg')
await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(target)
console.log(`готово: ${path.relative(root, target)}`)

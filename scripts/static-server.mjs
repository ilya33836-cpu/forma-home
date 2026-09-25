import http from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const port = Number(process.env.PORT || 4321)
const types = {
  '.html': 'text/html; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
}

http
  .createServer(async (req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0])
    let file = path.join(root, url)
    try {
      const s = await stat(file)
      if (s.isDirectory()) file = path.join(file, 'index.html')
    } catch {
      res.writeHead(404)
      res.end('not found')
      return
    }
    try {
      const buf = await readFile(file)
      res.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream' })
      res.end(buf)
    } catch {
      res.writeHead(404)
      res.end('not found')
    }
  })
  .listen(port, () => console.log(`static http://localhost:${port}`))

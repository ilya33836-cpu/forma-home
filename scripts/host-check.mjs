// Диагностика доступности деплоя: отличает блокировку по IP от блокировки по имени.
// Запускать БЕЗ VPN. Использование: node scripts/host-check.mjs [host]
import { connect } from 'node:net'
import { lookup } from 'node:dns/promises'
import tls from 'node:tls'

const host = process.argv[2] || 'forma-home-gamma.vercel.app'
const port = 443
const timeout = 8000

const line = (ok, label, detail) =>
  console.log(`${ok ? '  OK  ' : ' FAIL '} ${label.padEnd(22)} ${detail}`)

async function step(label, fn) {
  const started = Date.now()
  try {
    const detail = await fn()
    line(true, label, `${detail}  (${Date.now() - started} мс)`)
    return true
  } catch (e) {
    const code = e.code || e.name || ''
    line(false, label, `${code || e.message}  (${Date.now() - started} мс)`)
    return false
  }
}

console.log(`\nПроверка доступности: https://${host}\n`)
console.log('Запущено БЕЗ VPN?\n')

let addresses = []
await step('DNS', async () => {
  const found = await lookup(host, { all: true })
  addresses = found.map((a) => a.address)
  return addresses.join(', ')
})

const tcpOk = await step('TCP 443', () =>
  new Promise((resolve, reject) => {
    const socket = connect({ host, port })
    socket.setTimeout(timeout)
    socket.on('connect', () => {
      socket.destroy()
      resolve('соединение установлено')
    })
    socket.on('timeout', () => {
      socket.destroy()
      const e = new Error('timeout')
      e.code = 'TIMEOUT'
      reject(e)
    })
    socket.on('error', reject)
  }),
)

await step('TLS handshake', () =>
  new Promise((resolve, reject) => {
    const socket = tls.connect(
      { host, port, servername: host, timeout },
      () => {
        const proto = socket.getProtocol()
        socket.destroy()
        resolve(`протокол ${proto}`)
      },
    )
    socket.on('timeout', () => {
      socket.destroy()
      const e = new Error('timeout')
      e.code = 'TIMEOUT'
      reject(e)
    })
    socket.on('error', reject)
  }),
)

await step('HTTP GET', async () => {
  const res = await fetch(`https://${host}/`, {
    signal: AbortSignal.timeout(timeout + 4000),
  })
  return `HTTP ${res.status}`
})

console.log('')
if (!tcpOk) {
  console.log('ВЕРДИКТ: соединение не устанавливается.')
  console.log('  Блокировка по IP или на транспортном уровне (DPI).')
  console.log('  Свой домен на том же Vercel НЕ поможет — трафик пойдёт на те же IP.')
  console.log('  Варианты: Cloudflare перед Vercel, либо перенос на другой хостинг.')
} else {
  console.log('ВЕРДИКТ: соединение устанавливается.')
  if (addresses.length) console.log(`  Адреса: ${addresses.join(', ')}`)
  console.log('  Если HTTP всё же не проходит, ограничение работает по имени —')
  console.log('  поможет собственный домен или проксирование через Cloudflare.')
}
console.log('')

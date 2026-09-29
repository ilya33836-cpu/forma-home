import type { NextConfig } from 'next'

// Статическая сборка включается переменной окружения, чтобы один репозиторий
// обслуживал два хостинга:
//   STATIC_BUILD=1 -> GitHub Pages (output: 'export', basePath, без заголовков)
//   без переменной  -> Vercel (серверный рендер, работает /api/contact, работают заголовки)
const isStatic = process.env.STATIC_BUILD === '1'
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || (isStatic ? '/forma-home' : '')

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
]

const nextConfig: NextConfig = {
  ...(isStatic ? { output: 'export' as const, trailingSlash: true } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  images: {
    // Оптимизатор Next на обоих хостингах не нужен: варианты нужной ширины
    // считаются заранее скриптом scripts/build-images.mjs в public/images/opt.
    // Свой лоадер подставляет basePath (иначе на Pages картинки отдают 404)
    // и выбирает готовый файл вместо исходника — на телефоне это ~40 КБ
    // вместо 400–1300 КБ. Списки ширин совпадают с WIDTHS в том скрипте.
    loader: 'custom' as const,
    loaderFile: './lib/image-loader.ts',
    deviceSizes: [400, 640, 828, 1080, 1280, 1600],
    // Только реально существующие варианты: иначе next/image вписывает в
    // srcset несколько одинаковых файлов с разными дескрипторами.
    imageSizes: [320],
    // Внешние хосты не используются: все изображения лежат в public/images.
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@react-three/drei'],
  },
  // Заголовки применяет только серверный рантайм, при экспорте они игнорируются.
  ...(isStatic
    ? {}
    : {
        async headers() {
          return [
            { source: '/:path*', headers: securityHeaders },
            {
              source: '/icon.svg',
              headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
            },
          ]
        },
      }),
}

export default nextConfig

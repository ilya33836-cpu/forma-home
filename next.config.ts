import type { NextConfig } from 'next'

// Статическая сборка включается переменной окружения, чтобы один репозиторий
// обслуживал два хостинга:
//   STATIC_BUILD=1 -> GitHub Pages (output: 'export', basePath, без оптимизации картинок)
//   без переменной  -> Vercel (серверный рендер, работает /api/contact, работают заголовки)
const isStatic = process.env.STATIC_BUILD === '1'
const basePath = process.env.BASE_PATH || (isStatic ? '/forma-home' : '')

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
  ...(isStatic ? { output: 'export' as const } : {}),
  reactStrictMode: true,
  poweredByHeader: false,
  basePath,
  images: {
    // На статическом хостинге оптимизатора Next нет, поэтому отдаём исходники:
    // файлы уже подготовлены скриптом scripts/finalize-images.mjs.
    ...(isStatic ? { unoptimized: true } : { formats: ['image/avif', 'image/webp'] }),
    deviceSizes: [400, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [64, 96, 128, 200, 256, 320, 384],
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

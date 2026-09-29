// Кастомный лоадер next/image для статического хостинга (GitHub Pages).
// Оптимизатора на Pages нет, поэтому отдаём заранее подготовленные WebP-варианты
// из public/images/opt: на телефоне браузер берёт 400–828 px вместо
// полуторамегабайтного исходника. Ширины и подложки — в lib/image-manifest.ts.
import { variantFor } from './image'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/forma-home'

export default function staticLoader({ src, width }: { src: string; width: number }) {
  if (src.startsWith('http') || src.startsWith('data:')) return src
  const path = src.startsWith('/') ? src : `/${src}`
  const variant = variantFor(path, width)
  return `${basePath}${variant ?? path}`
}

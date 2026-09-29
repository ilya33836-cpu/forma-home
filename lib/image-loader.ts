// Кастомный лоадер next/image для статического хостинга (GitHub Pages).
// Оптимизатора на Pages нет, поэтому просто дописываем basePath к пути.
export default function staticLoader({ src }: { src: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/forma-home'
  if (src.startsWith('http') || src.startsWith('data:')) return src
  return `${basePath}${src.startsWith('/') ? src : `/${src}`}`
}

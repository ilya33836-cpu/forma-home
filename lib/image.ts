import { imageManifest } from './image-manifest'

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '/forma-home'

// Ближайшая готовая ширина не уже запрошенной: браузер просит по srcset,
// а на диске лежат только варианты из WIDTHS.
export const variantFor = (src: string, width: number): string | null => {
  const entry = imageManifest[src]
  if (!entry) return null
  const fit = entry.widths.find((w) => w >= width) ?? entry.widths[entry.widths.length - 1]
  return `/images/opt/${src.replace(/^\/images\//, '').replace(/\.jpe?g$/i, `-${fit}.webp`)}`
}

// Абсолютный путь с учётом basePath — для CSS-фонов и обычных <img>,
// где next/image не используется.
export const imageUrl = (src: string, width = 1080): string => {
  const rel = variantFor(src, width) ?? src
  return `${basePath}${rel}`
}

export const blurFor = (src: string): string | undefined => imageManifest[src]?.blur

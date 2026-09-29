import Image, { type ImageProps } from 'next/image'
import { blurFor } from '@/lib/image'

// Обёртка над next/image: подставляет размытую подложку из манифеста,
// чтобы картинка не вспыхивала пустым местом на медленной сети.
export default function Img({ src, alt, ...rest }: ImageProps) {
  const blur = typeof src === 'string' ? blurFor(src) : undefined
  return (
    <Image
      src={src}
      alt={alt}
      {...(blur ? { placeholder: 'blur', blurDataURL: blur } : {})}
      {...rest}
    />
  )
}

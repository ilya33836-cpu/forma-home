'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  parallax?: number
  quality?: number
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  parallax = 12,
  quality = 82,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`])

  return (
    <div ref={ref} className={`relative overflow-hidden bg-sand-200 ${className}`}>
      <motion.div style={{ y }} className="absolute inset-[-14%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          quality={quality}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      </motion.div>
    </div>
  )
}

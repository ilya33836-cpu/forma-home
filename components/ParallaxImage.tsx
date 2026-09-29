'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Img from '@/components/Img'

type Props = {
  src: string
  alt: string
  className?: string
  imgClassName?: string
  priority?: boolean
  sizes?: string
  parallax?: number
}

// Параллакс держит transform на каждом кадре скролла. На тач-устройствах
// скролл и так занят жестами, поэтому там картинка просто стоит на месте:
// кадры живут дольше, батарея не садится. Проверка нужна и на десктопе —
// при prefers-reduced-motion эффект тоже выключается.
function useParallaxAllowed() {
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setAllowed(fine.matches && !calm.matches)
    update()
    fine.addEventListener('change', update)
    calm.addEventListener('change', update)
    return () => {
      fine.removeEventListener('change', update)
      calm.removeEventListener('change', update)
    }
  }, [])
  return allowed
}

function useParallaxY(amount: number) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  return { ref, y: useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]) }
}

export default function ParallaxImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, 50vw',
  parallax = 12,
}: Props) {
  const allowed = useParallaxAllowed()
  const { ref, y } = useParallaxY(parallax)

  return (
    <div ref={ref} className={`relative overflow-hidden bg-sand-200 ${className}`}>
      {allowed ? (
        <motion.div style={{ y }} className="absolute inset-[-14%] will-change-transform">
          <Img
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className={`object-cover ${imgClassName}`}
          />
        </motion.div>
      ) : (
        <Img
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={`object-cover ${imgClassName}`}
        />
      )}
    </div>
  )
}

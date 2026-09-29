'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

// На тач-устройствах появление блока дергает layout в момент, когда палец ещё
// держит палец на экране: элемент с opacity 0 и translate едет вверх, и
// страница «дёргается» под большим пальцем. Там показываем содержимое сразу,
// без анимации — текст и картинки всё равно приезжают своим lazy-механизмом.
function useMotionAllowed() {
  const [allowed, setAllowed] = useState(true)
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
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

export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
  as = 'div',
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useMotionAllowed()
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })
  const MotionTag = motion[as] as typeof motion.div

  if (!allowed) {
    const PlainTag = as as 'div'
    return (
      <PlainTag ref={ref} className={className}>
        {children}
      </PlainTag>
    )
  }

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

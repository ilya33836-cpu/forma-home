'use client'

import { useRef, type ReactNode } from 'react'
import { motion, useInView } from 'framer-motion'

type Props = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  as?: 'div' | 'li' | 'section' | 'article' | 'span'
}

export default function Reveal({ children, delay = 0, y = 26, className, once = true, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once, margin: '-12% 0px -12% 0px' })
  const MotionTag = motion[as] as typeof motion.div

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

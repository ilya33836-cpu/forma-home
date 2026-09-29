'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

// Плавный скролл перехватывает wheel и гоняет свою анимацию на каждый кадр.
// На тач-устройствах это ломает инерцию нативного скролла и заметно повышает
// «тяжесть» страницы, поэтому там оставляем системное поведение.
export default function SmoothScroll() {
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)')
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (calm.matches || !fine.matches) return
    if (window.innerWidth < 768) return

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    })

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])

  return null
}

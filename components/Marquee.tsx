'use client'

import { useEffect, useRef, useState } from 'react'

type Props = {
  items: string[]
  duration?: number
  className?: string
}

// Бесконечная анимация transform держит слой композиции активным даже когда
// строка за пределами экрана. Останавливаем её, когда полоса не видна, и на
// тач-устройствах, где такая анимация съедает кадры.
export default function Marquee({ items, duration = 38, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [run, setRun] = useState(false)
  const row = [...items, ...items]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || calm || !('IntersectionObserver' in window)) {
      setRun(!calm)
      return
    }
    const io = new IntersectionObserver((es) => setRun(es.some((e) => e.isIntersecting)), {
      rootMargin: '80px 0px',
    })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`marquee relative flex overflow-hidden ${className}`}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ animationPlayState: run ? 'running' : 'paused' }}
      >
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 font-display text-display-sm italic text-ink/85 sm:px-10">
              {item}
            </span>
            <span aria-hidden className="size-1 shrink-0 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </div>
  )
}

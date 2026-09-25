'use client'

import { useEffect, useRef, useState } from 'react'

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  const text = useRef<HTMLSpanElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    setEnabled(true)

    const target = { x: -300, y: -300 }
    const pos = { x: -300, y: -300 }
    let current = ''
    let raf = 0

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      const el = (e.target as HTMLElement | null)?.closest?.(
        'a, button, [data-cursor-label]',
      ) as HTMLElement | null
      const next = el?.dataset.cursorLabel ?? ''
      if (next !== current) {
        current = next
        if (text.current) text.current.textContent = next
        ring.current?.setAttribute('data-active', next ? 'true' : 'false')
      }
    }

    const onLeave = () => {
      target.x = -300
      target.y = -300
    }

    const loop = () => {
      pos.x += (target.x - pos.x) * 0.18
      pos.y += (target.y - pos.y) * 0.18
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={dot}
        className="absolute left-0 top-0 size-[5px] rounded-full bg-ink/60 mix-blend-difference"
      />
      <div
        ref={ring}
        data-active="false"
        className="group absolute left-0 top-0 flex size-10 items-center justify-center rounded-full border border-ink/25 transition-[width,height,background-color,border-color] duration-300 ease-premium data-[active=true]:size-[5.5rem] data-[active=true]:border-ink data-[active=true]:bg-ink/[0.06]"
      >
        <span
          ref={text}
          className="w-16 text-center text-[9px] font-medium uppercase leading-tight tracking-[0.14em] text-ink opacity-0 transition-opacity duration-300 group-data-[active=true]:opacity-100"
        />
      </div>
    </div>
  )
}

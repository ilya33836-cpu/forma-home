'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Img from '@/components/Img'
import { MoveHorizontal } from 'lucide-react'
import type { ImageAsset } from '@/lib/projects'

type Props = {
  before: ImageAsset
  after: ImageAsset
  className?: string
}

export default function BeforeAfter({ before, after, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(50)
  const [dragging, setDragging] = useState(false)

  const update = useCallback((clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  useEffect(() => {
    if (!dragging) return
    const move = (e: PointerEvent) => update(e.clientX)
    const up = () => setDragging(false)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerup', up)
    }
  }, [dragging, update])

  return (
    <div
      ref={ref}
      className={`relative aspect-[16/10] w-full touch-none select-none overflow-hidden bg-sand-200 sm:aspect-[16/9] ${className}`}
      onPointerDown={(e) => {
        setDragging(true)
        update(e.clientX)
      }}
    >
      <Img
        src={after.src}
        alt={after.alt}
        fill
        sizes="(max-width: 1024px) calc(100vw - 2.5rem), 66vw"
        className="object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Img
          src={before.src}
          alt={before.alt}
          fill
          sizes="(max-width: 1024px) calc(100vw - 2.5rem), 66vw"
          className="object-cover grayscale"
        />
      </div>

      <span className="micro pointer-events-none absolute left-4 top-4 rounded-soft bg-ink/75 px-3 py-1.5 text-sand backdrop-blur-sm">
        До
      </span>
      <span className="micro pointer-events-none absolute right-4 top-4 rounded-soft bg-sand/85 px-3 py-1.5 text-ink backdrop-blur-sm">
        После
      </span>

      <div
        className="pointer-events-none absolute inset-y-0 w-px bg-sand/90"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-sand/70 bg-sand/90 text-ink shadow-lg backdrop-blur-sm">
          <MoveHorizontal className="size-4" strokeWidth={1.5} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Сравнение до и после"
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}

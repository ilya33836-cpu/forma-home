'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { RotateCw } from 'lucide-react'
import { useWebGLAllowed } from '@/lib/use-webgl'
import { imageUrl } from '@/lib/image'

const RoomViewer = dynamic(() => import('./RoomViewer'), { ssr: false })

type Props = {
  tone?: string
  pieces?: number
  roomName?: string
  className?: string
  poster?: string
}

export default function LazyRoomViewer({ className = '', poster, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const allowed = useWebGLAllowed()
  const [near, setNear] = useState(false)
  // На слабом устройстве сцену не грузим молча: постер с кнопкой. Пользователь
  // сам решает, стоит ли тратить заряд, и первый экран не ждёт инициализацию GPU.
  const [asked, setAsked] = useState(false)

  const active = asked || (allowed === 'allowed' && near)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (active) {
    return (
      <div ref={ref} className={className}>
        <RoomViewer poster={poster} className="size-full" {...rest} />
      </div>
    )
  }

  return (
    <div ref={ref} className={`relative size-full overflow-hidden bg-sand-200 ${className}`}>
      {poster ? (
        <img
          src={imageUrl(poster, 1080)}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="size-full object-cover"
        />
      ) : null}

      {allowed === 'denied' ? (
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4 sm:p-6">
          <p className="micro rounded-soft bg-sand/85 px-3 py-2 text-ink/60 backdrop-blur-sm">
            3D недоступно на этом устройстве
          </p>
          <button
            type="button"
            onClick={() => setAsked(true)}
            className="flex items-center gap-2 rounded-soft bg-sand/85 px-4 py-2.5 text-[13px] text-ink/80 backdrop-blur-sm transition-colors hover:bg-sand"
          >
            <RotateCw className="size-4" strokeWidth={1.5} />
            <span className="hidden sm:inline">Всё равно показать</span>
            <span className="sm:hidden">Показать</span>
          </button>
        </div>
      ) : null}
    </div>
  )
}

'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import { site } from '@/lib/site'

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
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '400px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {active ? (
        <RoomViewer poster={poster} className="size-full" {...rest} />
      ) : (
        <div
          className="size-full bg-sand-200"
          style={
            poster
              ? {
                  backgroundImage: `url(${site.basePath}${poster})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }
              : undefined
          }
        />
      )}
    </div>
  )
}

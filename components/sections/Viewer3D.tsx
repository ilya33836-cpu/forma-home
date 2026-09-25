'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/Reveal'

const LazyRoomViewer = dynamic(() => import('@/components/LazyRoomViewer'), { ssr: false })

export default function Viewer3D() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setActive(true)
          io.disconnect()
        }
      },
      { rootMargin: '600px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-sand py-24 sm:py-28 lg:py-32" aria-label="3D-модель помещения">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="micro text-ink/40">05 — 3D</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl font-display text-display-lg font-light">
                Посмотрите на пространство <em className="italic">до строительства</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
              <p className="max-w-sm text-sm leading-relaxed text-ink/55">
                Интерактивная модель собирается из тех же объёмов, что и рабочая документация.
                Вращайте и приближайте, чтобы проверить пропорции своими руками.
              </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={32}>
          <div className="relative mt-12 aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200 sm:mt-16 sm:aspect-[16/9]">
            {active ? (
              <LazyRoomViewer
                tone="#DED7CB"
                pieces={0}
                roomName="Гостиная-столовая"
                poster="/images/projects/apartment/gallery-2.jpg"
                className="size-full"
              />
            ) : (
              <div
                className="size-full bg-sand-200"
                style={{
                  backgroundImage: 'url(/images/projects/apartment/gallery-2.jpg)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />            )}
          </div>
        </Reveal>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="micro text-ink/35">
            Модель предварительная · финальная геометрия — по рабочей документации
          </p>
          <p className="micro text-ink/35">Перетащите, чтобы осмотреть</p>
        </div>
      </div>
    </section>
  )
}

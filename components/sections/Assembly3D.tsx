'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import Reveal from '@/components/Reveal'

const LazyRoomViewer = dynamic(() => import('@/components/LazyRoomViewer'), { ssr: false })

const PALETTES = [
  { name: 'Известняк', tone: '#DED7CB' },
  { name: 'Травертин', tone: '#C8B79B' },
  { name: 'Термоясен', tone: '#8C7355' },
  { name: 'Гранит', tone: '#7C7A75' },
  { name: 'Латунь', tone: '#9C8250' },
]

export default function Assembly3D() {
  const ref = useRef<HTMLElement>(null)
  const [active, setActive] = useState(false)
  const [i, setI] = useState(0)

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
    <section ref={ref} className="bg-ink py-20 text-sand sm:py-24 lg:py-28" aria-label="3D-сборка интерьера">
      <div className="shell">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="micro text-sand/40">08 — 3D-сборка</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-display-lg font-light">
                Соберите <em className="italic">интерьер</em> из материалов
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/55">
                Меняйте отделку стен и пола в реальном времени и смотрите, как меняется свет в
                комнате. Это тот же инструмент, которым мы согласовываем отделку с заказчиком.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 flex flex-wrap gap-2" role="radiogroup" aria-label="Выбор материала">
                {PALETTES.map((m, n) => (
                  <li key={m.name}>
                    <button
                      type="button"
                      role="radio"
                      aria-checked={i === n}
                      onClick={() => setI(n)}
                      data-cursor-label={m.name}
                      className={`group/m flex items-center gap-2.5 rounded-soft border px-4 py-2.5 text-[13px] transition-colors ${
                        i === n
                          ? 'border-sand/60 bg-sand/10 text-sand'
                          : 'border-sand/20 text-sand/50 hover:border-sand/40 hover:text-sand/80'
                      }`}
                    >
                      <span
                        className="size-4 rounded-full border border-sand/30"
                        style={{ background: m.tone }}
                      />
                      {m.name}
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={32} className="lg:col-span-8">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-tile bg-[#0F0F0E] sm:aspect-[16/10]">
              {active ? (
                <LazyRoomViewer
                  tone={PALETTES[i].tone}
                  pieces={i}
                  roomName="Сборка отделки"
                  className="size-full"
                />
              ) : (
                <div className="size-full bg-[#0F0F0E]" />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

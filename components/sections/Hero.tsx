'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

const ROTATE = [
  { word: 'свет', angle: -7 },
  { word: 'фактура', angle: 5 },
  { word: 'пропорция', angle: -4 },
  { word: 'ритм', angle: 6 },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % ROTATE.length), 2600)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      ref={ref}
      className="noise relative min-h-[100svh] overflow-hidden bg-sand pt-24 sm:pt-28"
      aria-label="Главный экран"
    >
      <div className="shell">
        <div className="grid items-end gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="order-2 pb-12 lg:order-1 lg:col-span-7 lg:pb-20">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="micro text-ink/45"
            >
              Студия дизайна интерьеров и архитектуры · Москва
            </motion.p>

            <h1 className="mt-7 font-display text-display-xl font-light leading-[0.98]">
              {['Пространства,', 'которые'].map((line, n) => (
                <motion.span
                  key={line}
                  initial={{ opacity: 0, y: 34 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.25 + n * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 34 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.43, ease: [0.22, 1, 0.36, 1] }}
                className="mt-2 flex flex-wrap items-baseline gap-x-4"
              >
                <span className="font-normal italic">живут</span>
                <span className="inline-grid">
                  {ROTATE.map((r, n) => (
                    <motion.span
                      key={r.word}
                      style={{ gridArea: '1 / 1' }}
                      aria-hidden={i !== n}
                      animate={{
                        opacity: i === n ? 1 : 0,
                        rotate: i === n ? r.angle : 0,
                        y: i === n ? 0 : 6,
                      }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="whitespace-nowrap pr-4 font-sans text-[0.22em] font-medium uppercase tracking-[0.16em] text-ink/40"
                    >
                      {r.word}
                    </motion.span>
                  ))}
                  <span className="invisible whitespace-nowrap pr-4 font-sans text-[0.22em] font-medium uppercase tracking-[0.16em]">
                    {ROTATE[0].word}
                  </span>
                </span>
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.62, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-5"
            >
              <a
                href="#contact"
                data-cursor-label="Заявка"
                className="group inline-flex h-14 items-center gap-3 rounded-soft bg-ink px-9 text-sm font-medium text-sand transition-colors duration-500 hover:bg-ink/85"
              >
                Обсудить проект
                <span className="transition-transform duration-500 ease-premium group-hover:translate-x-1">
                  →
                </span>
              </a>
              <p className="max-w-[19rem] text-sm leading-relaxed text-ink/55">
                Полный цикл: от брифа и визуализации до авторского надзора и комплектации.
              </p>
            </motion.div>
          </div>

          <motion.div
            style={{ y, opacity }}
            className="order-1 lg:order-2 lg:col-span-5"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-sand-200 sm:aspect-[3/4] lg:aspect-[4/5]">
              <motion.div
                initial={{ scale: 1.1, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src="/images/hero/main.jpg"
                  alt="Минималистичный интерьер с арочным проёмом и креслом"
                  fill
                  priority
                  quality={88}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
            <p className="micro mt-4 text-ink/40">Квартира на Патриарших · 186 м²</p>
          </motion.div>
        </div>
      </div>

      <div className="shell pointer-events-none pb-8">
        <div className="flex items-center gap-4">
          <motion.span
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex"
          >
            <ArrowDown className="size-4 text-ink/40" strokeWidth={1.5} />
          </motion.span>
          <span className="micro text-ink/35">Листайте вниз</span>
          <span className="h-px flex-1 bg-ink/12" />
          <a
            href="#contact"
            data-cursor-label="Заявка"
            className="pointer-events-auto micro text-ink/40 transition-colors hover:text-ink"
          >
            Обсудить проект
          </a>
        </div>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from '@/components/Reveal'
import { testimonials } from '@/lib/content'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const t = testimonials[i]

  return (
    <section className="bg-sand py-24 sm:py-28 lg:py-32" aria-label="Отзывы">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-tile bg-sand-200">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src="/images/home/testimonial.jpg"
                      alt="Гостиная с мягкой зоной у окна"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col justify-center lg:col-span-7">
            <Reveal>
              <p className="micro text-ink/40">11 — Отзывы</p>
            </Reveal>

            <Reveal delay={0.05}>
              <span aria-hidden className="mt-8 block font-display text-6xl font-light leading-none text-clay">
                «
              </span>
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.figure
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4"
              >
                <blockquote className="max-w-2xl font-display text-display-md font-light leading-[1.18]">
                  {t.text}
                </blockquote>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-sm">{t.name}</span>
                  <span aria-hidden className="size-1 rounded-full bg-clay" />
                  <span className="micro text-ink/40">{t.project}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            <div className="mt-12 flex items-center gap-3">
              {testimonials.map((item, n) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setI(n)}
                  aria-label={`Отзыв ${n + 1}`}
                  aria-current={i === n}
                  className={`h-px transition-all duration-500 ease-premium ${
                    i === n ? 'w-14 bg-ink' : 'w-8 bg-ink/25 hover:bg-ink/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { site } from '@/lib/site'

export default function Services() {
  return (
    <section className="bg-sand-2 py-20 sm:py-24 lg:py-28" aria-label="Услуги">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="micro text-ink/40">06 — Услуги</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-display-lg font-light">
                Полный цикл <em className="italic">работ</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
                Можно заказать отдельный этап или передать нам весь процесс. Во втором случае вы
                общаетесь с одной командой и одним бюджетом.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Image
                  src="/images/studio/materials.jpg"
                  alt="Образцы отделочных материалов на мраморной поверхности"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <ul className="lg:col-span-8">
            {site.services.map((s, i) => (
              <li key={s.id}>
                <Reveal delay={i * 0.04}>
                  <Link
                    href="/services"
                    data-cursor-label="Подробнее"
                    className="group flex items-center gap-6 border-b border-ink/12 py-6 transition-colors duration-500 hover:border-ink/40 lg:gap-10"
                  >
                    <span className="micro w-8 shrink-0 text-ink/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-xl font-light lg:text-2xl">
                        {s.title}
                      </span>
                      <span className="mt-1.5 block text-[13px] text-ink/45 lg:hidden">
                        {s.price} · {s.duration}
                      </span>
                    </span>
                    <span className="hidden shrink-0 text-right lg:block">
                      <span className="block text-[13px] text-ink/60">{s.price}</span>
                      <span className="mt-1 block text-[12px] text-ink/35">{s.duration}</span>
                    </span>
                    <ArrowUpRight
                      className="size-5 shrink-0 text-ink/25 transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink"
                      strokeWidth={1.25}
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

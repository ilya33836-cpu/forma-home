import Img from '@/components/Img'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'

const TEAM = [
  { name: 'Анна Верещагина', role: 'Руководитель студии', note: 'Архитектор, 14 лет практики' },
  { name: 'Пётр Ковалёв', role: 'Главный проектировщик', note: 'Интерьеры и инженерия' },
  { name: 'Мария Сотникова', role: 'Визуализация', note: 'Фотореалистичные сцены' },
]

const SHOTS = [
  { src: '/images/studio/space.jpg', alt: 'Белые стеллажи с рабочими материалами студии' },
  { src: '/images/studio/team.jpg', alt: 'Команда студии работает с чертежами' },
  { src: '/images/studio/review.jpg', alt: 'Согласование чертежей с заказчиком' },
]

export default function Studio() {
  return (
    <section className="bg-sand py-24 sm:py-28 lg:py-32" aria-label="Студия">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="micro text-ink/40">09 — Студия</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-display-lg font-light">
                Небольшая команда с <em className="italic">большим вниманием</em> к деталям
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-ink/55">
                В студии работают девять человек. Мы сознательно не растём: каждый проект ведёт
                архитектор, который лично выезжает на объект и отвечает за результат.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <ul className="mt-10 space-y-px overflow-hidden rounded-tile border border-ink/12">
                {TEAM.map((m) => (
                  <li key={m.name} className="flex items-baseline justify-between gap-6 bg-sand py-4">
                    <div>
                      <p className="text-[15px]">{m.name}</p>
                      <p className="mt-1 text-[12px] text-ink/45">{m.role}</p>
                    </div>
                    <span className="micro shrink-0 text-ink/35">{m.note}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.2}>
              <Link
                href="/about"
                data-cursor-label="Открыть"
                className="group mt-9 inline-flex items-center gap-2 micro text-ink/60 transition-colors hover:text-ink"
              >
                Подробнее о студии
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7 lg:gap-5">
            {SHOTS.map((s, i) => (
              <Reveal
                key={s.src}
                delay={0.05 + i * 0.07}
                className={i === 2 ? 'sm:col-span-2' : ''}
              >
                <figure
                  className={`relative w-full overflow-hidden rounded-tile bg-sand-200 ${
                    i === 2 ? 'aspect-[16/9]' : 'aspect-[4/3] lg:aspect-[4/5]'
                  }`}
                >
                  <Img
                    src={s.src}
                    alt={s.alt}
                    fill
                    sizes={i === 2 ? '(max-width: 640px) calc(100vw - 2.5rem), 40vw' : '(max-width: 640px) calc(100vw - 2.5rem), 30vw'}
                    className="object-cover"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import Img from '@/components/Img'
import Reveal from '@/components/Reveal'
import { process } from '@/lib/content'

const IMAGES = [
  { src: '/images/process/plan.jpg', alt: 'Чертежи и образцы материалов на столе' },
  { src: '/images/process/draft.jpg', alt: 'Рабочие чертежи и эскизы проекта' },
  { src: '/images/process/desk.jpg', alt: 'Карандаш и свёрнутые планы на рабочем столе' },
]

export default function Process() {
  return (
    <section className="bg-sand py-20 sm:py-24 lg:py-28" aria-label="Процесс работы">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="micro text-ink/40">07 — Процесс</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl font-display text-display-lg font-light">
                Как идёт <em className="italic">работа</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-ink/55">
              Каждый этап заканчивается результатом, который можно посмотреть и проверить. Никаких
              «мы подумаем и вернёмся через месяц».
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 sm:mt-20 sm:grid-cols-3 sm:gap-5">
          {IMAGES.map((im, i) => (
            <Reveal key={im.src} delay={i * 0.07}>
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Img
                  src={im.src}
                  alt={im.alt}
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), 32vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          ))}
        </div>

        <ol className="mt-4 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((step, i) => (
            <li key={step.n} className="bg-sand">
              <Reveal delay={(i % 3) * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-5 p-7 lg:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="font-display text-3xl font-light text-ink/25">{step.n}</span>
                    <span className="micro text-ink/35">{step.duration}</span>
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-light">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink/55">{step.text}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { projects } from '@/lib/projects'

export default function ProjectsPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Проекты</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 max-w-4xl font-display text-display-xl font-light leading-[1.02]">
              Пространства, которые <em className="italic">живут</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/55">
              Каждый проект — это сценарии жизни, собранные в архитектуру. Ниже два объекта,
              которые показывают наш подход в полном объёме: от брифа до сдачи.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-24 sm:pb-32 lg:pb-40">
        <div className="shell">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-28">
            {projects.map((p, i) => (
              <Reveal
                key={p.slug}
                delay={0.05 + i * 0.08}
                className={i % 2 === 0 ? 'lg:col-span-7' : 'lg:col-span-5 lg:self-center'}
              >
                <Link href={`/projects/${p.slug}`} data-cursor-label="Смотреть" className="group block">
                  <div
                    className={`relative w-full overflow-hidden rounded-tile bg-sand-200 ${
                      i % 2 === 0 ? 'aspect-[4/3] lg:aspect-[16/10]' : 'aspect-[4/5]'
                    }`}
                  >
                    <Image
                      src={p.cover.src}
                      alt={p.cover.alt}
                      fill
                      priority={i === 0}
                      sizes={i % 2 === 0 ? '(max-width: 1024px) 100vw, 58vw' : '(max-width: 1024px) 100vw, 42vw'}
                      className="object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-7 flex items-start justify-between gap-6">
                    <div>
                      <p className="micro text-ink/40">
                        {p.type} · {p.year}
                      </p>
                      <h2 className="mt-3 font-display text-display-md font-light">{p.title}</h2>
                      <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/55">{p.summary}</p>
                    </div>
                    <ArrowUpRight
                      className="mt-1 size-6 shrink-0 text-ink/30 transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink"
                      strokeWidth={1.25}
                    />
                  </div>

                  <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/12 pt-4">
                    {[
                      ['Локация', p.location],
                      ['Площадь', p.area],
                      ['Срок', p.duration],
                    ].map(([k, v]) => (
                      <div key={k} className="flex gap-2">
                        <dt className="micro text-ink/35">{k}</dt>
                        <dd className="micro text-ink/70">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

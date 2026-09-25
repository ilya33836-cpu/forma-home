import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { projects } from '@/lib/projects'

export default function ProjectsGrid() {
  return (
    <section className="bg-sand py-24 sm:py-28 lg:py-32" aria-label="Проекты">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="micro text-ink/40">03 — Проекты</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl font-display text-display-lg font-light">
                Избранные <em className="italic">проекты</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Link
              href="/projects"
              data-cursor-label="Все"
              className="group inline-flex items-center gap-2 micro text-ink/60 transition-colors hover:text-ink"
            >
              Все проекты
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 space-y-16 sm:mt-20 lg:space-y-28">
          {projects.map((p, i) => {
            const flip = i % 2 === 1
            return (
              <Reveal key={p.slug} delay={0.05 + i * 0.08}>
                <div className="grid items-end gap-x-10 gap-y-8 lg:grid-cols-12">
                  <div className={flip ? 'lg:order-2 lg:col-span-5' : 'lg:col-span-7'}>
                    <Link href={`/projects/${p.slug}`} data-cursor-label="Смотреть" className="group block">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-200 lg:aspect-[16/10]">
                        <Image
                          src={p.cover.src}
                          alt={p.cover.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 58vw"
                          className="object-cover transition-transform duration-[1.4s] ease-premium group-hover:scale-[1.04]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                        <div className="pointer-events-none absolute bottom-5 left-5 flex gap-1.5 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                          {p.palette.map((c) => (
                            <span
                              key={c}
                              className="size-5 rounded-full border border-sand/70"
                              style={{ background: c }}
                            />
                          ))}
                        </div>
                      </div>
                    </Link>
                  </div>

                  <div className={flip ? 'lg:order-1 lg:col-span-7' : 'lg:col-span-5'}>
                    <Link href={`/projects/${p.slug}`} data-cursor-label="Смотреть" className="group block">
                      <div className="flex items-start justify-between gap-6">
                        <div>
                          <p className="micro text-ink/40">
                            {p.type} · {p.year}
                          </p>
                          <h3 className="mt-3 font-display text-display-sm font-light">{p.title}</h3>
                        </div>
                        <ArrowUpRight
                          className="mt-1 size-5 shrink-0 text-ink/35 transition-all duration-500 ease-premium group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-ink"
                          strokeWidth={1.25}
                        />
                      </div>

                      <p className="mt-4 max-w-md text-sm leading-relaxed text-ink/55">{p.subtitle}</p>

                      <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 border-t border-ink/12 pt-4">
                        {[
                          ['Локация', p.location],
                          ['Площадь', p.area],
                          ['Год', p.year],
                        ].map(([k, v]) => (
                          <div key={k} className="flex gap-2">
                            <dt className="micro text-ink/35">{k}</dt>
                            <dd className="micro text-ink/70">{v}</dd>
                          </div>
                        ))}
                      </dl>
                    </Link>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

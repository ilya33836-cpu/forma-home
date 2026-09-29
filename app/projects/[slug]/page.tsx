import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Img from '@/components/Img'
import Link from 'next/link'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import BeforeAfter from '@/components/BeforeAfter'
import LazyRoomViewer from '@/components/LazyRoomViewer'
import { ButtonLink } from '@/components/Button'
import { getProject, projects } from '@/lib/projects'
import { site } from '@/lib/site'

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) return {}
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: {
      title: `${p.title} — ${site.name}`,
      description: p.summary,
      type: 'article',
      images: [{ url: p.cover.src, width: 1200, height: 630, alt: p.cover.alt }],
    },
  }
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params
  const p = getProject(slug)
  if (!p) notFound()

  const next = projects.find((x) => x.slug !== p.slug)!

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: p.title,
    description: p.summary,
    dateCreated: p.year,
    locationCreated: p.location,
    image: p.gallery.map((g) => `${site.url}${g.src}`),
    creator: { '@type': 'Organization', name: site.name, url: site.url },
  }

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <section className="bg-sand pb-14 pt-28 sm:pb-20 sm:pt-36">
        <div className="shell">
          <Link
            href="/projects"
            data-cursor-label="Назад"
            className="group inline-flex items-center gap-2 micro text-ink/45 transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="size-3.5 transition-transform duration-500 ease-premium group-hover:-translate-x-1"
              strokeWidth={1.5}
            />
            Все проекты
          </Link>

          <div className="mt-10 grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="micro text-ink/40">
                  {p.type} · {p.location} · {p.year}
                </p>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-display text-display-xl font-light leading-[1.02]">
                  {p.title}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-xl font-display text-display-sm font-light italic text-ink/60">
                  {p.subtitle}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5 lg:self-end">
              <Reveal delay={0.15}>
                <dl className="grid grid-cols-2 gap-x-8 gap-y-5 border-t border-ink/12 pt-6">
                  {[
                    ['Площадь', p.area],
                    ['Срок проекта', p.results[1]?.value ?? '—'],
                    ['Срок стройки', p.duration],
                    ['Тип', p.type],
                  ].map(([k, v]) => (
                    <div key={k}>
                      <dt className="micro text-ink/35">{k}</dt>
                      <dd className="mt-1.5 text-sm text-ink/80">{v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand pb-20 sm:pb-28">
        <div className="shell">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200 sm:aspect-[3/2]">
            <Img
              src={p.cover.src}
              alt={p.cover.alt}
              fill
              priority
              sizes="calc(100vw - 2.5rem)"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <div className="grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <Reveal>
                <p className="micro text-ink/40">Задача</p>
              </Reveal>
            </div>
            <div className="lg:col-span-9">
              <Reveal delay={0.05}>
                <p className="max-w-3xl font-display text-display-md font-light leading-[1.15]">
                  {p.task}
                </p>
              </Reveal>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
                <Reveal delay={0.08}>
                  <p className="micro text-ink/40">Бриф</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-ink/65">
                    {p.brief.map((b) => (
                      <li key={b} className="flex gap-3">
                        <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-clay" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={0.12}>
                  <p className="micro text-ink/40">Палитра</p>
                  <div className="mt-4 flex gap-3">
                    {p.palette.map((c) => (
                      <div key={c} className="flex-1">
                        <div
                          className="aspect-square w-full rounded-soft border border-ink/10"
                          style={{ background: c }}
                        />
                        <p className="mt-2 micro text-ink/45">{c}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-2 py-20 sm:py-28" aria-label="Галерея">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {p.gallery.map((g, i) => (
              <Reveal
                key={g.src + i}
                delay={(i % 3) * 0.06}
                className={
                  i === 0
                    ? 'sm:col-span-2 lg:col-span-8'
                    : i === 3
                      ? 'lg:col-span-4'
                      : 'lg:col-span-4'
                }
              >
                <figure
                  className={`relative w-full overflow-hidden rounded-tile bg-sand-200 ${
                    i === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                  }`}
                >
                  <Img
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes={i === 0 ? '(max-width: 1024px) calc(100vw - 2.5rem), 66vw' : '(max-width: 1024px) calc(100vw - 2.5rem), 33vw'}
                    className="object-cover"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <p className="micro text-ink/40">До и после</p>
              <h2 className="mt-5 font-display text-display-md font-light">
                Что изменилось <em className="italic">главное</em>
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="micro text-ink/35">Потяните ползунок</p>
            </Reveal>
          </div>
          <Reveal delay={0.08} y={30}>
            <div className="mt-10">
              <BeforeAfter before={p.before} after={p.after} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-20 sm:pb-28">
        <div className="shell">
          <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-7">
              <Reveal>
                <p className="micro text-ink/40">Решение</p>
                <h2 className="mt-5 font-display text-display-md font-light">
                  Как мы это <em className="italic">сделали</em>
                </h2>
              </Reveal>
              <ol className="mt-9 space-y-7">
                {p.solution.map((s, i) => (
                  <Reveal key={s} delay={0.05 + i * 0.05}>
                    <li className="flex gap-6 border-t border-ink/12 pt-6">
                      <span className="micro shrink-0 text-ink/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="max-w-xl text-[15px] leading-relaxed text-ink/65">{s}</p>
                    </li>
                  </Reveal>
                ))}
              </ol>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.1}>
                <div className="overflow-hidden rounded-tile border border-ink/12">
                  <LazyRoomViewer
                    tone={p.room3d.tone}
                    pieces={p.type === 'Дом' ? 2 : 0}
                    roomName={p.room3d.name}
                    poster={p.gallery[2].src}
                    className="aspect-[4/3] w-full"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-4 text-[12px] leading-relaxed text-ink/40">
                  Модель собрана по рабочей документации и используется для согласования отделки
                  и расстановки мебели.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-2 py-20 sm:py-28" aria-label="Материалы">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Материалы</p>
            <h2 className="mt-5 font-display text-display-md font-light">
              Палитра <em className="italic">проекта</em>
            </h2>
          </Reveal>

          <ul className="mt-10 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-5">
            {p.materials.map((m, i) => (
              <li key={m.name} className="bg-sand-2">
                <Reveal delay={i * 0.05} className="h-full">
                  <div className="flex h-full flex-col">
                    <div
                      className="aspect-[4/3] w-full"
                      style={{ background: m.tone }}
                      aria-hidden
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-sm">{m.name}</p>
                      <p className="mt-2 text-[12px] leading-relaxed text-ink/50">{m.note}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28">
        <div className="shell">
          <Reveal>
            <dl className="grid gap-8 border-t border-ink/12 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {p.results.map((r) => (
                <div key={r.label}>
                  <dt className="micro text-ink/35">{r.label}</dt>
                  <dd className="mt-2 font-display text-2xl font-light">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-col items-center rounded-tile bg-ink px-8 py-16 text-center text-sand sm:px-16">
              <p className="micro text-sand/40">Хотите так же?</p>
              <h2 className="mt-5 max-w-2xl font-display text-display-lg font-light">
                Обсудим ваш объект <em className="italic">за чашкой кофе</em>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-sand/60">
                Покажем альбомы похожих проектов, посчитаем стоимость и сроки по вашей площади.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <ButtonLink href="/contact" variant="light" size="lg" icon>
                  Оставить заявку
                </ButtonLink>
                <ButtonLink href={`tel:${site.phoneHref}`} variant="ghost" size="lg" className="text-sand">
                  {site.phone}
                </ButtonLink>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <Link
              href={`/projects/${next.slug}`}
              data-cursor-label="Смотреть"
              className="group mt-16 flex flex-wrap items-end justify-between gap-6 border-t border-ink/12 pt-8"
            >
              <div>
                <p className="micro text-ink/40">Следующий проект</p>
                <p className="mt-3 font-display text-display-md font-light">{next.title}</p>
              </div>
              <ArrowUpRight
                className="size-7 text-ink/30 transition-all duration-500 ease-premium group-hover:translate-x-1.5 group-hover:-translate-y-1.5 group-hover:text-ink"
                strokeWidth={1.25}
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </article>
  )
}

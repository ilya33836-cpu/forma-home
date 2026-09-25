import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import { projects } from '@/lib/projects'

const p = projects[0]

export default function FeaturedCase() {
  return (
    <section className="relative overflow-hidden bg-ink text-sand" aria-label="Презентация проекта">
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-5 py-20 sm:px-8 lg:order-1 lg:py-28 lg:pl-[max(3rem,calc((100vw-1680px)/2+3rem))] lg:pr-16">
          <Reveal>
            <p className="micro text-sand/40">04 — Презентация</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display text-display-lg font-light leading-[1.05]">
              {p.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-sand/60">
              {p.summary}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-y border-sand/12 py-7">
              {[
                ['Площадь', p.area],
                ['Срок проекта', '14 недель'],
                ['Срок стройки', p.duration],
                ['Локация', p.location],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="micro text-sand/35">{k}</p>
                  <p className="mt-1.5 text-sm text-sand/85">{v}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-9 max-w-md font-display text-xl font-light italic leading-snug text-sand/80">
              «Мы боялись, что в старом доме потеряется ощущение масштаба. В итоге получили
              ансамбль, в котором всё подчинено свету».
            </p>
            <p className="mt-4 micro text-sand/40">Анна и Кирилл В. — заказчики</p>
          </Reveal>

          <Reveal delay={0.25}>
            <Link
              href={`/projects/${p.slug}`}
              data-cursor-label="Открыть"
              className="group mt-11 inline-flex h-14 items-center gap-3 rounded-soft border border-sand/30 px-9 text-sm font-medium text-sand transition-colors duration-500 hover:border-sand hover:bg-sand hover:text-ink"
            >
              Смотреть проект целиком
              <ArrowUpRight
                className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal y={0} className="h-full">
            <div className="relative h-[62vh] w-full bg-ink lg:h-full lg:min-h-[42rem]">
              <Image
                src={p.gallery[4].src}
                alt={p.gallery[4].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

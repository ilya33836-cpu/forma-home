import type { Metadata } from 'next'
import Img from '@/components/Img'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import Reveal from '@/components/Reveal'
import Marquee from '@/components/Marquee'
import Counter from '@/components/Counter'
import { ButtonLink } from '@/components/Button'
import { principles, stats } from '@/lib/content'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Студия',
  description:
    'FORMA HOME — студия дизайна интерьеров и архитектуры. Девять человек, 128 завершённых объектов и авторский надзор на каждом этапе.',
  alternates: { canonical: '/about' },
}

const TEAM = [
  { name: 'Анна Верещагина', role: 'Руководитель студии', bio: 'Архитектор, 14 лет практики. Ведёт ключевые проекты, отвечает за концепцию.' },
  { name: 'Пётр Ковалёв', role: 'Главный проектировщик', bio: 'Планировки, инженерия, узлы. Отвечает за то, чтобы документация строилась без доработок.' },
  { name: 'Мария Сотникова', role: 'Визуализация', bio: 'Собирает фотореалистичные сцены и 3D-модели, которые согласовываются с заказчиком.' },
  { name: 'Илья Батурин', role: 'Авторский надзор', bio: 'Выезжает на объект, контролирует реализацию и подбор материалов на месте.' },
]

const VALUES = [
  { n: '01', t: 'Точность', d: 'Рабочая документация доводится до уровня, при котором подрядчик не принимает решений за наш счёт.' },
  { n: '02', t: 'Уважение к времени', d: 'Мы называем сроки до подписания договора и держим их. Задержки обсуждаем заранее, а не постфактум.' },
  { n: '03', t: 'Прозрачный бюджет', d: 'Каждый этап имеет понятную стоимость. Изменения фиксируются допсоглашением, а не «по ходу».' },
  { n: '04', t: 'Тишина в проекте', d: 'Мы не перегружаем пространство деталями. Практичность и красота — не противоположности.' },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Студия</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 max-w-4xl font-display text-display-xl font-light leading-[1.02]">
              Девять человек, которые <em className="italic">доходят до конца</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-[15px] leading-relaxed text-ink/55">
              FORMA HOME основана в 2014 году. Мы сознательно не масштабировались: каждый проект
              ведёт архитектор, который лично выезжает на объект и отвечает за результат от
              брифа до сдачи.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-20 sm:pb-28">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-12 sm:gap-5">
            <Reveal className="sm:col-span-7">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Img
                  src="/images/studio/space.jpg"
                  alt="Рабочее место архитектора"
                  fill
                  priority
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), 58vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
            <Reveal delay={0.06} className="sm:col-span-5">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200 sm:h-full sm:aspect-auto">
                <Img
                  src="/images/studio/team.jpg"
                  alt="Команда студии за обсуждением"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), 42vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="border-y border-ink/10 bg-sand-2 py-6">
        <Marquee
          items={['Архитектура', 'Интерьер', 'Свет', 'Материал', 'Точность', 'Воздух']}
          duration={40}
        />
      </div>

      <section className="bg-sand py-20 sm:py-28" aria-label="Цифры">
        <div className="shell">
          <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="border-t border-ink/15 pt-5">
                  <dd className="font-display text-display-md font-light leading-none">
                    <Counter value={s.value} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-4 text-sm text-ink/55">{s.label}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-sand-2 py-20 sm:py-28" aria-label="Принципы">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Принципы</p>
            <h2 className="mt-5 font-display text-display-md font-light">
              На чём мы <em className="italic">держимся</em>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:grid-cols-2">
            {principles.map((p, i) => (
              <li key={p.n} className="bg-sand-2">
                <Reveal delay={(i % 2) * 0.05} className="h-full">
                  <div className="flex h-full gap-6 p-7">
                    <span className="micro shrink-0 text-ink/30">{p.n}</span>
                    <div>
                      <h3 className="font-display text-xl font-light">{p.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-ink/55">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28" aria-label="Команда">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Команда</p>
            <h2 className="mt-5 font-display text-display-md font-light">
              Люди, с которыми вы <em className="italic">работаете</em>
            </h2>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:grid-cols-2">
            {TEAM.map((m, i) => (
              <li key={m.name} className="bg-sand">
                <Reveal delay={(i % 2) * 0.05} className="h-full">
                  <div className="flex h-full flex-col justify-between gap-6 p-7">
                    <div>
                      <p className="micro text-ink/40">{m.role}</p>
                      <h3 className="mt-3 font-display text-xl font-light">{m.name}</h3>
                    </div>
                    <p className="max-w-sm text-[13px] leading-relaxed text-ink/55">{m.bio}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ink py-20 text-sand sm:py-28" aria-label="Ценности">
        <div className="shell">
          <Reveal>
            <p className="micro text-sand/40">Ценности</p>
          </Reveal>
          <ul className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.n} delay={i * 0.05}>
                <li className="border-t border-sand/15 pt-5">
                  <span className="micro text-sand/30">{v.n}</span>
                  <h3 className="mt-4 font-display text-xl font-light">{v.t}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-sand/55">{v.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.1}>
            <div className="mt-16 flex flex-wrap items-center justify-between gap-8 border-t border-sand/12 pt-10">
              <h2 className="max-w-xl font-display text-display-md font-light">
                Хотите посмотреть проекты <em className="italic">близкие к вашему</em>?
              </h2>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/projects" variant="light" size="lg" icon>
                  Смотреть проекты
                </ButtonLink>
                <Link
                  href="/contact"
                  data-cursor-label="Написать"
                  className="group inline-flex h-14 items-center gap-2 rounded-soft px-6 text-sm text-sand/70 transition-colors hover:text-sand"
                >
                  Написать нам
                  <ArrowUpRight
                    className="size-4 transition-transform duration-500 ease-premium group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </div>
          </Reveal>
          <p className="mt-12 micro text-sand/30">
            {site.name} · {site.hours}
          </p>
        </div>
      </section>
    </>
  )
}

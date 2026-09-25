import type { Metadata } from 'next'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { ButtonLink } from '@/components/Button'
import { site } from '@/lib/site'
import { faq, process } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Услуги',
  description:
    'Дизайн-проект, архитектурный проект, 3D-визуализация, авторский надзор, отделка под ключ и комплектация. FORMA HOME — полный цикл работ над интерьером.',
  alternates: { canonical: '/services' },
}

const DETAIL: Record<string, { text: string; includes: string[] }> = {
  design: {
    text: 'Рабочая документация, по которой подрядчик ведёт объект без вопросов. Планировочные решения, пол, потолок, освещение, узлы, спецификации.',
    includes: ['Планировочные решения', 'Пол, потолок, стены', 'Схемы освещения', 'Узлы и ведомости', 'Альбом 3D-сцен'],
  },
  architecture: {
    text: 'Архитектурная часть для нового дома или перепланировки: конструктив, фасад, инженерные выводы и согласование.',
    includes: ['Конструктивная схема', 'Фасад и посадка', 'Инженерные решения', 'Планировочный альбом', 'Согласование'],
  },
  visualization: {
    text: 'Фотореалистичные сцены в 2K с учётом реального света и фактуры материалов. Помогают увидеть результат до начала стройки.',
    includes: ['Общие планы', 'Ключевые ракурсы', 'Вечерний сценарий', 'Разрешение 2K', 'Правки в 2 раунда'],
  },
  author: {
    text: 'Архитектор студии выезжает на объект, контролирует соответствие проекту и помогает подрядчику на сложных узлах.',
    includes: ['Регулярные выезды', 'Контроль узлов', 'Подбор материалов', 'Согласование замен', 'Отчёт по этапам'],
  },
  turnkey: {
    text: 'Берём на себя весь технический и отделочный цикл: демонтаж, инженерия, черновая и чистовая отделка, сдача объекта.',
    includes: ['Смета и график', 'Инженерные системы', 'Черновая отделка', 'Чистовая отделка', 'Сдача объекта'],
  },
  styling: {
    text: 'Закупаем и расставляем свет, текстиль, посуду и декор. Финальный слой, который превращает ремонт в жилое пространство.',
    includes: ['Свет и техническое', 'Текстиль и ковры', 'Посуда и декор', 'Расстановка', 'Фотоотчёт'],
  },
}

export default function ServicesPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Услуги</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 max-w-4xl font-display text-display-xl font-light leading-[1.02]">
              Можно заказать этап. <em className="italic">Или весь процесс</em>
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/55">
              Мы не продаём квадратные метры. Мы продаём проект, который можно построить, и дом,
              в котором хочется жить. Ниже — что входит в каждый этап.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-20 sm:pb-28">
        <div className="shell">
          <ul className="grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 lg:grid-cols-2">
            {site.services.map((s, i) => {
              const d = DETAIL[s.id]
              return (
                <li key={s.id} className="bg-sand">
                  <Reveal delay={(i % 2) * 0.06} className="h-full">
                    <div className="flex h-full flex-col p-7 sm:p-9">
                      <div className="flex items-baseline justify-between gap-6">
                        <span className="micro text-ink/30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="micro text-ink/40">{s.duration}</span>
                      </div>
                      <h2 className="mt-5 font-display text-display-sm font-light">{s.title}</h2>
                      <p className="mt-4 text-sm leading-relaxed text-ink/55">{d.text}</p>
                      <ul className="mt-7 space-y-2 border-t border-ink/12 pt-5">
                        {d.includes.map((inc) => (
                          <li key={inc} className="flex gap-3 text-[13px] text-ink/60">
                            <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-clay" />
                            {inc}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                        <span className="font-display text-xl font-light">{s.price}</span>
                        <ButtonLink href="/contact" variant="outline" size="sm" cursor="Заявка">
                          Обсудить
                        </ButtonLink>
                      </div>
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="bg-sand-2 py-20 sm:py-28" aria-label="Процесс">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Процесс</p>
            <h2 className="mt-5 font-display text-display-md font-light">
              Шесть этапов <em className="italic">работы</em>
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-3">
            {process.map((s, i) => (
              <li key={s.n} className="bg-sand-2">
                <Reveal delay={(i % 3) * 0.05} className="h-full">
                  <div className="flex h-full flex-col gap-5 p-7">
                    <div className="flex items-baseline justify-between">
                      <span className="font-display text-2xl font-light text-ink/25">{s.n}</span>
                      <span className="micro text-ink/35">{s.duration}</span>
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-light">{s.title}</h3>
                      <p className="mt-2.5 text-[13px] leading-relaxed text-ink/55">{s.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-20 sm:py-28" aria-label="Вопросы">
        <div className="shell grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="micro text-ink/40">Вопросы</p>
              <h2 className="mt-5 font-display text-display-md font-light">
                Частые <em className="italic">вопросы</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Image
                  src="/images/studio/materials.jpg"
                  alt="Образцы материалов"
                  fill
                  sizes="(max-width: 1024px) 100vw, 30vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-ink/12">
              {faq.map((f, i) => (
                <Reveal key={f.q} delay={i * 0.04}>
                  <div className="border-b border-ink/12 py-6">
                    <dt className="font-display text-lg font-light sm:text-xl">{f.q}</dt>
                    <dd className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/55">{f.a}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 bg-sand-2 py-20 sm:py-28">
        <div className="shell grid gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-display-md font-light">
                Посчитаем <em className="italic">стоимость</em>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/55">
                Оставьте площадь и локацию — пришлём предварительный расчёт и график в течение
                рабочего дня.
              </p>
              <a
                href={`tel:${site.phoneHref}`}
                className="link-underline mt-7 inline-block text-lg"
              >
                {site.phone}
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.08} y={24} className="lg:col-span-8">
            <div className="rounded-tile border border-ink/12 bg-sand p-7 sm:p-10">
              <ContactForm compact />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

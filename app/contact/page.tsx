import type { Metadata } from 'next'
import Image from 'next/image'
import Reveal from '@/components/Reveal'
import ContactForm from '@/components/ContactForm'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Контакты',
  description: `Свяжитесь с FORMA HOME: ${site.phone}, ${site.email}. Студия в Москве, проектируем интерьеры и дома в Москве, Санкт-Петербурге и загородной локации.`,
  alternates: { canonical: '/contact' },
}

const ROUTES = [
  { title: 'Метро', items: ['Баррикадная — 6 минут пешком', 'Пушкинская — 9 минут пешком'] },
  { title: 'На машине', items: ['Собственная парковка для гостей', 'Въезд с внутреннего двора'] },
  { title: 'Встречи', items: ['По предварительной записи', 'Можем выехать на объект'] },
]

export default function ContactPage() {
  return (
    <>
      <section className="bg-sand pb-16 pt-32 sm:pb-20 sm:pt-40">
        <div className="shell">
          <Reveal>
            <p className="micro text-ink/40">Контакты</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-7 max-w-4xl font-display text-display-xl font-light leading-[1.02]">
              Поговорим о <em className="italic">вашем</em> проекте
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink/55">
              Позвоните, напишите или приезжайте в студию по предварительной записи. Покажем
              альбомы и обсудим задачу за чашкой кофе.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand pb-20 sm:pb-28">
        <div className="shell">
          <div className="grid gap-4 sm:grid-cols-12 sm:gap-5">
            <Reveal className="sm:col-span-7">
              <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Image
                  src="/images/studio/review.jpg"
                  alt="Согласование проекта в студии"
                  fill
                  priority
                  sizes="(max-width: 640px) 100vw, 58vw"
                  className="object-cover"
                />
              </figure>
            </Reveal>
            <Reveal delay={0.06} className="sm:col-span-5">
              <ul className="grid h-full gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12">
                {ROUTES.map((r) => (
                  <li key={r.title} className="flex-1 bg-sand p-6">
                    <p className="micro text-ink/40">{r.title}</p>
                    <ul className="mt-3 space-y-1.5">
                      {r.items.map((i) => (
                        <li key={i} className="text-[13px] text-ink/60">
                          {i}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="form" className="scroll-mt-20 bg-sand-2 py-20 sm:py-28">
        <div className="shell grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-4">
            <Reveal>
              <h2 className="font-display text-display-md font-light">
                Оставить <em className="italic">заявку</em>
              </h2>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink/55">
                Отвечаем в течение рабочего дня. Если вопрос срочный — лучше позвонить.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <ul className="mt-10 space-y-6 border-t border-ink/12 pt-8">
                <li>
                  <p className="micro text-ink/35">Телефон</p>
                  <a
                    href={`tel:${site.phoneHref}`}
                    className="link-underline mt-1.5 inline-block text-lg"
                  >
                    {site.phone}
                  </a>
                </li>
                <li>
                  <p className="micro text-ink/35">Email</p>
                  <a href={`mailto:${site.email}`} className="link-underline mt-1.5 inline-block text-lg">
                    {site.email}
                  </a>
                </li>
                <li>
                  <p className="micro text-ink/35">Адрес</p>
                  <address className="mt-1.5 not-italic text-[15px] text-ink/70">
                    {site.address.addressLocality}, {site.address.streetAddress}
                    <br />
                    {site.address.postalCode}
                  </address>
                </li>
                <li>
                  <p className="micro text-ink/35">Часы работы</p>
                  <p className="mt-1.5 text-[15px] text-ink/70">{site.hours}</p>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor-label="Открыть"
                    className="link-underline micro text-ink/50 transition-colors hover:text-ink"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08} y={24} className="lg:col-span-8">
            <div className="rounded-tile border border-ink/12 bg-sand p-7 sm:p-10 lg:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

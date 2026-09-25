import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { site, nav } from '@/lib/site'

const year = new Date().getFullYear()

const projectLinks = [
  { label: 'Квартира на Патриарших', href: '/projects/kvartira-patriarshie' },
  { label: 'Загородный дом', href: '/projects/zagorodny-dom' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-sand">
      <div className="shell py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-baseline gap-2.5">
              <span className="text-lg font-semibold tracking-[0.22em]">FORMA</span>
              <span className="text-lg font-light tracking-[0.22em] text-sand/55">HOME</span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-sand/60">
              Студия дизайна интерьеров и архитектуры полного цикла. Проектируем частные
              резиденции и квартиры, в которых свет, фактура и пропорция работают как одна
              композиция.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  data-cursor-label="Открыть"
                  className="link-underline micro text-sand/55 transition-colors hover:text-sand"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="micro text-sand/40">Навигация</p>
            <ul className="mt-6 space-y-3">
              {[...nav, ...projectLinks].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="link-underline text-sm text-sand/70 transition-colors hover:text-sand"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="micro text-sand/40">Контакты</p>
            <ul className="mt-6 space-y-3 text-sm text-sand/70">
              <li>
                <a
                  href={`tel:${site.phoneHref}`}
                  className="link-underline transition-colors hover:text-sand"
                >
                  {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline transition-colors hover:text-sand"
                >
                  {site.email}
                </a>
              </li>
              <li className="leading-relaxed">
                {site.address.addressLocality}, {site.address.streetAddress}
              </li>
              <li className="text-sand/50">{site.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-sand/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="micro text-sand/35">
            © {year} {site.name}. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="micro text-sand/35 transition-colors hover:text-sand">
              Политика конфиденциальности
            </Link>
            <a
              href="#content"
              data-cursor-label="Наверх"
              className="group inline-flex items-center gap-2 micro text-sand/55 transition-colors hover:text-sand"
            >
              Наверх
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 ease-premium group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

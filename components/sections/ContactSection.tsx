import Image from 'next/image'
import ContactForm from '@/components/ContactForm'
import Reveal from '@/components/Reveal'
import { site } from '@/lib/site'

export default function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 bg-sand-2 py-20 sm:py-24 lg:py-28" aria-label="Форма заявки">
      <div className="shell">
        <div className="grid gap-y-12 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="micro text-ink/40">13 — Заявка</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 font-display text-display-lg font-light">
                Расскажите о <em className="italic">проекте</em>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink/55">
                Достаточно нескольких строк. Если удобнее — позвоните или напишите напрямую.
              </p>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-tile bg-sand-200">
                <Image
                  src="/images/home/contact-texture.jpg"
                  alt="Образцы материалов на светлой поверхности"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-3 text-sm">
                <li>
                  <a href={`tel:${site.phoneHref}`} className="link-underline text-ink/75 hover:text-ink">
                    {site.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="link-underline text-ink/75 hover:text-ink"
                  >
                    {site.email}
                  </a>
                </li>
                <li className="text-ink/45">
                  {site.address.addressLocality}, {site.address.streetAddress} · {site.hours}
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.1} y={24} className="lg:col-span-7">
            <div className="rounded-tile border border-ink/12 bg-sand p-7 sm:p-10 lg:p-12">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

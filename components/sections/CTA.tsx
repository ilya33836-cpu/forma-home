import { site } from '@/lib/site'
import { ButtonLink } from '@/components/Button'
import Reveal from '@/components/Reveal'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-sand py-20 sm:py-24 lg:py-32" aria-label="Призыв к действию">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 size-[30rem] rounded-full bg-clay/25 blur-[100px]"
      />
      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="micro text-ink/40">12 — Следующий шаг</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-7 font-display text-display-xl font-light leading-[1.02]">
              Начнём с <em className="italic">разговора</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-8 max-w-xl text-[15px] leading-relaxed text-ink/55">
              Расскажите о задаче — площадь, локация, сроки и бюджет. В течение рабочего дня
              вернёмся с тремя вопросами и предложением формата работы.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-11 flex flex-wrap items-center justify-center gap-x-4 gap-y-3">
              <ButtonLink href="#contact" size="lg" icon>
                Оставить заявку
              </ButtonLink>
              <ButtonLink href={`tel:${site.phoneHref}`} variant="outline" size="lg">
                {site.phone}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

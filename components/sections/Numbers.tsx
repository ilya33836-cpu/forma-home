import Counter from '@/components/Counter'
import Reveal from '@/components/Reveal'
import { stats } from '@/lib/content'

export default function Numbers() {
  return (
    <section className="bg-sand-2 py-16 sm:py-20 lg:py-24" aria-label="Студия в цифрах">
      <div className="shell">
        <Reveal>
          <p className="micro text-ink/40">10 — Цифры</p>
        </Reveal>
        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07}>
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
  )
}

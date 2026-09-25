import Reveal from '@/components/Reveal'
import { principles } from '@/lib/content'

const STEPS = [
  { n: '01', t: 'Идея', d: 'Сценарии жизни и настроение' },
  { n: '02', t: 'План', d: 'Геометрия, свет, движение' },
  { n: '03', t: 'Объём', d: '3D и фотореалистичные сцены' },
  { n: '04', t: 'Документ', d: 'Чертежи, узлы, спецификации' },
  { n: '05', t: 'Объект', d: 'Авторский надзор и комплектация' },
]

export default function IdeaToSpace() {
  return (
    <section className="relative overflow-hidden bg-sand-2 py-20 sm:py-24 lg:py-28" aria-label="От идеи до пространства">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Reveal>
              <p className="micro text-ink/40">02 — Метод</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-6 max-w-2xl font-display text-display-lg font-light">
                От идеи до пространства — <em className="italic">пять шагов</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-sm leading-relaxed text-ink/55">
              Проект не собирается по вдохновению. Он выводится из задачи: сначала сценарии,
              потом геометрия, и только затем — материал и свет.
            </p>
          </Reveal>
        </div>

        <ol className="mt-14 grid gap-px overflow-hidden rounded-tile border border-ink/12 bg-ink/12 sm:mt-20 sm:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.n} className="bg-sand-2">
              <Reveal delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col gap-10 p-6 lg:p-7">
                  <span className="micro text-ink/35">{s.n}</span>
                  <div>
                    <p className="font-display text-2xl font-light">{s.t}</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink/50">{s.d}</p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={0.05 + i * 0.06}>
              <div className="flex gap-6 border-t border-ink/12 pt-6">
                <span className="micro shrink-0 text-ink/30">{p.n}</span>
                <div>
                  <h3 className="font-display text-xl font-light">{p.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/55">{p.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { ButtonLink } from '@/components/Button'
import { site } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-sand py-32">
      <div className="shell text-center">
        <p className="micro text-ink/40">404</p>
        <h1 className="mx-auto mt-7 max-w-2xl font-display text-display-lg font-light">
          Страница не найдена
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink/55">
          Возможно, ссылка устарела. Посмотрите проекты или вернитесь на главную.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" size="lg" icon>
            На главную
          </ButtonLink>
          <ButtonLink href="/projects" variant="outline" size="lg">
            Проекты
          </ButtonLink>
        </div>
        <p className="mt-12 micro text-ink/35">
          {site.name} · {site.phone}
        </p>
      </div>
    </section>
  )
}

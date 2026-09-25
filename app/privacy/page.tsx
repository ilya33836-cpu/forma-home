import type { Metadata } from 'next'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Политика обработки персональных данных FORMA HOME.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <section className="bg-sand pb-24 pt-32 sm:pt-40">
      <div className="shell">
        <div className="mx-auto max-w-3xl">
          <p className="micro text-ink/40">Документ</p>
          <h1 className="mt-6 font-display text-display-lg font-light">
            Политика обработки <em className="italic">персональных данных</em>
          </h1>
          <p className="mt-4 text-sm text-ink/45">Редакция от 1 января 2025 года</p>

          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink/65">
            <section>
              <h2 className="font-display text-xl font-light text-ink">1. Общие положения</h2>
              <p className="mt-3">
                Настоящая политика описывает, как {site.name} (далее — Студия) обрабатывает
                персональные данные пользователей сайта {site.url}. Отправляя форму на сайте, вы
                соглашаетесь с условиями ниже.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-light text-ink">2. Какие данные собираются</h2>
              <p className="mt-3">
                Через формы на сайте мы получаем имя, телефон, адрес электронной почты, тип объекта,
                ориентировочный бюджет и текст обращения. Дополнительно автоматически могут
                собираться обезличенные данные о посещении: источник перехода, страницы и
                устройство.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-light text-ink">3. Цели обработки</h2>
              <ul className="mt-3 space-y-2">
                {[
                  'связь с вами по заявке и консультация по проекту',
                  'подготовка коммерческого предложения и расчёта',
                  'выполнение договора на проектные работы',
                  'улучшение работы сайта и качества услуг',
                ].map((i) => (
                  <li key={i} className="flex gap-3">
                    <span aria-hidden className="mt-2.5 size-1 shrink-0 rounded-full bg-clay" />
                    {i}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-display text-xl font-light text-ink">4. Согласие и отзыв</h2>
              <p className="mt-3">
                Отправляя форму, вы даёте согласие на обработку указанных данных. Согласие может
                быть отозвано в любой момент письмом на {site.email} или по телефону{' '}
                {site.phone}. Мы удаляем данные в течение 10 рабочих дней с момента обращения.
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-light text-ink">5. Хранение и защита</h2>
              <p className="mt-3">
                Данные хранятся не дольше, чем этого требуют цели обработки, и не передаются третьим
                лицам, за исключением сервисов, необходимых для работы: почтового провайдера и
                системы аналитики. Мы используем шифрование канала передачи (HTTPS).
              </p>
            </section>

            <section>
              <h2 className="font-display text-xl font-light text-ink">6. Контакты</h2>
              <p className="mt-3">
                Вопросы по обработке данных: {site.email}, {site.phone}. Адрес:{' '}
                {site.address.addressLocality}, {site.address.streetAddress}.
              </p>
            </section>
          </div>
        </div>
      </div>
    </section>
  )
}

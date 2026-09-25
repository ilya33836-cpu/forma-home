# FORMA HOME

Сайт студии дизайна интерьеров и архитектуры. Next.js App Router, TypeScript, Tailwind CSS,
процедурная 3D-сцена на React Three Fiber.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
```

## Проверки

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production-сборка
npm start           # запуск собранной версии
```

## Структура

```
app/
  layout.tsx            шрифты, метаданные, JSON-LD, каркас
  page.tsx              главная: 14 секций
  projects/[slug]/      страница проекта: галерея, до/после, 3D, материалы
  services|about|contact|privacy
  api/contact/          приём заявки, валидация, отправка через Resend
  opengraph-image.tsx   OG-изображение 1200×630
  robots.ts, sitemap.ts
components/
  sections/             секции главной
  RoomViewer.tsx        процедурная 3D-сцена
  LazyRoomViewer.tsx    ленивая загрузка 3D по IntersectionObserver
  BeforeAfter.tsx       сравнение до/после
  ContactForm.tsx       форма заявки
  Header, Footer, Cursor, SmoothScroll, Reveal, Counter, Marquee
lib/
  site.ts               реквизиты, навигация, услуги
  projects.ts           данные двух проектов
  content.ts            процесс, отзывы, цифры, FAQ, принципы
public/images/          локальные изображения (35 файлов)
scripts/                загрузка и отбор изображений, контактные листы
```

## Изображения

Фотографии лежат в `public/images` и оптимизируются `next/image` (AVIF/WebP).
Скрипты в `scripts/` отвечают за загрузку кандидатов с Pexels и сборку контактных листов
для визуального отбора; их результат (`scripts/out`) не коммитится.

```bash
node scripts/pexels-final.mjs        # загрузить кандидатов и собрать листы
node scripts/sheet-final.mjs         # контактный лист текущего public/images
node scripts/finalize-images.mjs    # перенести отобранные файлы в public/images
```

## 3D

Сцена процедурная: комната собирается из примитивов, без внешних `.glb`. Она грузится
отдельным чанком только когда секция приближается к зоне видимости, поэтому первый экран
не зависит от WebGL. Если сцена не инициализировалась, показывается статический постер.

## Почта

Скопируйте `.env.example` в `.env.local` и задайте `RESEND_API_KEY`,
`CONTACT_EMAIL_TO`, `CONTACT_EMAIL_FROM`. Без них `/api/contact` валидирует заявку
и логирует её, но письмо не отправляет.

## Деплой на Vercel

Репозиторий привязан к проекту Vercel через `.vercel/repo.json`, поэтому каждый push в `main`
собирает прод, а push в другую ветку — preview.

```bash
npm i -g vercel
vercel login
vercel link --repo     # привязка к репозиторию
vercel deploy -y       # разовый деплой
```

Переменные окружения задаются в Vercel Dashboard → Settings → Environment Variables:

| Переменная | Нужна для |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | канонический домен в метаданных, sitemap и robots |
| `RESEND_API_KEY` | отправка заявок с формы |
| `CONTACT_EMAIL_TO` | адрес получателя заявок |
| `CONTACT_EMAIL_FROM` | адрес отправителя (домен должен быть подтверждён в Resend) |

Если `NEXT_PUBLIC_SITE_URL` не задан, на Vercel подставляется
`VERCEL_PROJECT_PRODUCTION_URL`, а вне Vercel — `https://forma-home.ru`.
Значение читается на этапе сборки, поэтому после добавления переменной нужен редеплой.

В `next.config.ts` выставлены заголовки безопасности: HSTS, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy` и `Permissions-Policy`.

Сборка: 15 статических страниц, First Load JS главной — 167 kB. 3D-сцена вынесена в отдельный
чанк и грузится только при приближении секции, поэтому на первый экран не влияет.


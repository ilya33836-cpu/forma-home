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

## Почта и форма заявки

Система поддерживает два режима, переключаемых одной переменной.

**Серверный режим (Vercel).** Работает `POST /api/contact`: валидация имени, телефона и
email, отправка письма через Resend. Нужны `RESEND_API_KEY`, `CONTACT_EMAIL_TO`,
`CONTACT_EMAIL_FROM`. Без них заявка только логируется в консоль.

**Статический режим (GitHub Pages).** Сервера нет, поэтому форма отправляет заявку
напрямую в Web3forms. Нужен ключ `NEXT_PUBLIC_WEB3FORMS_KEY` — получить на
https://web3forms.com. Без ключа форма показывает просьбу написать на почту.

Ключ Web3forms для Pages хранится в настройках репозитория:
`Settings → Secrets and variables → Actions → New repository variable → WEB3FORMS_KEY`.

## Деплой

Проект обслуживает два хостинга из одного репозитория. Режим выбирается переменной
`STATIC_BUILD` в `next.config.ts`:

| | Vercel | GitHub Pages |
| --- | --- | --- |
| `STATIC_BUILD` | не задана | `1` |
| Рендер | серверный | статический экспорт в `out/` |
| `basePath` | пусто | `/forma-home` |
| Оптимизация картинок | да (AVIF/WebP) | нет, отдаются исходники |
| `/api/contact` | работает | не экспортируется |
| Заголовки безопасности | применяются | игнорируются платформой |
| Форма | Resend | Web3forms |

```bash
npm run build              # серверная сборка, как на Vercel
STATIC_BUILD=1 npm run build   # статический экспорт в out/
```

### GitHub Pages

Деплой запускает `.github/workflows/deploy-pages.yml`: он собирает статику, прогоняет
`typecheck` и выкладывает артефакт через `actions/deploy-pages`. Каждый push в `main`
автоматически обновляет сайт. В `Settings → Pages → Build and deployment` источник
должен быть `GitHub Actions`.

Адрес: `https://ilya33836-cpu.github.io/forma-home/`.

Pages доступен только для публичных репозиториев на бесплатном тарифе, поэтому
`forma-home` должен быть публичным.

### Vercel

```bash
npm i -g vercel
vercel login
vercel link --repo
vercel deploy --prod
```

Переменные окружения задаются в Vercel Dashboard → Settings → Environment Variables.

Если `NEXT_PUBLIC_SITE_URL` не задан, на Vercel подставляется
`VERCEL_PROJECT_PRODUCTION_URL`, а на GitHub Pages — `https://ilya33836-cpu.github.io`.
Значение читается на этапе сборки, поэтому после добавления переменной нужен редеплой.

Сборка: 15 статических страниц, First Load JS главной — 167 kB. 3D-сцена вынесена в отдельный
чанк и грузится только при приближении секции, поэтому на первый экран не влияет.

Проверить доступность сайта без VPN:

```bash
node scripts\host-check.mjs forma-home-gamma.vercel.app
```

Скрипт отличает блокировку по IP от блокировки по имени — см. раздел о доступности
из России.



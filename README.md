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
  Img.tsx               next/image с размытой подложкой
  RoomViewer.tsx        процедурная 3D-сцена
  LazyRoomViewer.tsx    ленивая загрузка 3D + постер на слабых устройствах
  BeforeAfter.tsx       сравнение до/после
  ContactForm.tsx       форма заявки
  Header, Footer, Cursor, SmoothScroll, Reveal, Counter, Marquee
lib/
  site.ts               реквизиты, навигация, услуги
  projects.ts           данные двух проектов
  content.ts            процесс, отзывы, цифры, FAQ, принципы
  image.ts              выбор готового варианта, LQIP, basePath
  image-manifest.ts     ← генерируется scripts/build-images.mjs
  use-webgl.ts          проверка, тянет ли устройство 3D
public/images/          исходники (35 файлов) + opt/ с вариантами
scripts/                загрузка и отбор изображений, сборка вариантов
```

## Мобильные решения

Эффекты, которые держат GPU, включаются только там, где они реально нужны. Проверка
одна и та же: `(hover: hover) and (pointer: fine)` и `prefers-reduced-motion`.

| Что | На десктопе | На тач-устройстве |
| --- | --- | --- |
| 3D-сцена | грузится у секции | постер + кнопка «Показать» |
| Параллакс картинок | да | нет, картинка стоит на месте |
| Появление блоков (`Reveal`) | анимация | сразу, без сдвига |
| Плавный скролл (Lenis) | да | системная инерция |
| Бегущая строка | крутится в кадре | статична |
| `backdrop-filter` в шапке | есть | только плотный фон |

Шапка слушает скролл через `requestAnimationFrame` и перерисовывается только при смене
состояния — иначе React ререндерит её на каждом событии скролла, и это попадает в тот
же кадр, что и сам скролл.

`content-visibility: auto` на секциях пробовали и убрали: с ним секции до `#contact`
получают высоту по оценке браузера, и кнопки «Оставить заявку» перестают доскроллить
до формы.

## Изображения

Оптимизатора `next/image` на GitHub Pages нет, а на Vercel он тратит CPU на каждый новый
размер. Поэтому варианты считаются заранее: `scripts/build-images.mjs` (sharp) превращает
каждый исходник в набор WebP нужной ширины в `public/images/opt` и кладёт в
`lib/image-manifest.ts` список готовых ширин плюс крошечную размытую подложку (LQIP).

`lib/image-loader.ts` отдаёт эти файлы вместо исходников, а `components/Img.tsx`
подставляет подложку автоматически. Ширины в `WIDTHS` скрипта должны совпадать с
`deviceSizes`/`imageSizes` в `next.config.ts` — иначе `srcset` будет ссылаться на
несуществующие файлы.

```bash
npm run images          # пересобрать варианты
npm run images:fetch    # скачать кандидатов с Pexels
```

Скрипт сам запускается в `predev` и `prebuild`, так что в CI ничего настраивать не нужно.
Готовые файлы пропускаются по времени модификации — повторный запуск почти мгновенный.
Папка `public/images/opt` в git не попадает, а манифест коммитится: без него `typecheck`
в CI проходит раньше `build` и не найдёт модуль.

Итог по весу: исходники — 13.4 MB, вариант 1080 px — 2.4 MB, 828 px — 1.5 MB,
400 px — 0.4 MB. Главная на телефоне тянет около 1 MB вместо 5.6 MB.

## 3D

Сцена процедурная: комната собирается из примитивов, без внешних `.glb` и без HDRI
из CDN — свет собран из обычных источников. `three.js` лежит в отдельном чанке и
не попадает в первый экран.

Сцену стоит показывать не всем. `lib/use-webgl.ts` проверяет `pointer: coarse`,
`hardwareConcurrency` и `deviceMemory`; при отрицательном вердикте на месте сцены
остаётся постер с кнопкой «Показать», а `sessionStorage` запоминает решение, чтобы
не проверять GPU при каждом скролле. За пределами экрана сцена ставится на паузу
(`frameloop="never"`), DPR ограничен 1.5.

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
| Оптимизация картинок | готовые WebP-варианты | те же готовые варианты |
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

Сборка: 14 статических страниц, First Load JS главной — 172 kB. 3D-сцена вынесена в
отдельный чанк и на телефоне не грузится вовсе, поэтому на первый экран не влияет.

Проверить доступность сайта без VPN:

```bash
node scripts\host-check.mjs forma-home-gamma.vercel.app
```

Скрипт отличает блокировку по IP от блокировки по имени — см. раздел о доступности
из России.



export const site = {
  name: 'FORMA HOME',
  tagline: 'Студия дизайна интерьеров',
  url: 'https://forma-home.ru',
  description:
    'FORMA HOME — студия дизайна интерьеров и архитектуры полного цикла. Проектируем частные резиденции и квартиры, в которых архитектура, свет и фактура работают как единая композиция.',
  keywords: [
    'дизайн интерьера',
    'студия дизайна интерьеров',
    'архитектурное бюро',
    'проектирование интерьеров',
    'частный дом под ключ',
    '3D визуализация',
    'Москва',
  ],
  phone: '+7 (495) 000-00-00',
  phoneHref: '+74950000000',
  email: 'hello@forma-home.ru',
  address: {
    streetAddress: 'Большой Каретный переулок, 12',
    addressLocality: 'Москва',
    postalCode: '123112',
    addressCountry: 'RU',
  },
  priceRange: '₽₽₽',
  socials: [
    { label: 'Telegram', href: 'https://t.me/forma_home' },
    { label: 'VK', href: 'https://vk.com/forma_home' },
    { label: 'Pinterest', href: 'https://pinterest.com/forma_home' },
  ],
  hours: 'Пн–Пт, 10:00–19:00',
  services: [
    { id: 'design', title: 'Дизайн-проект', price: 'от 3 500 ₽/м²', duration: 'от 6 недель' },
    { id: 'architecture', title: 'Архитектурный проект', price: 'от 5 500 ₽/м²', duration: 'от 10 недель' },
    { id: 'visualization', title: '3D-визуализация', price: 'от 12 000 ₽/сцена', duration: 'от 14 дней' },
    { id: 'author', title: 'Авторский надзор', price: 'от 45 000 ₽/мес', duration: 'весь строй' },
    { id: 'turnkey', title: 'Отделка под ключ', price: 'от 16 000 ₽/м²', duration: 'от 4 месяцев' },
    { id: 'styling', title: 'Комплектация и стилистика', price: 'от 7% бюджета', duration: 'от 21 дня' },
  ],
} as const

export const nav = [
  { label: 'Проекты', href: '/projects' },
  { label: 'Услуги', href: '/services' },
  { label: 'Студия', href: '/about' },
  { label: 'Контакты', href: '/contact' },
] as const

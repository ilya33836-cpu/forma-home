export type ImageAsset = {
  src: string
  alt: string
  width: number
  height: number
}

export type Project = {
  slug: string
  title: string
  subtitle: string
  location: string
  year: string
  type: 'Квартира' | 'Дом'
  area: string
  duration: string
  cover: ImageAsset
  palette: string[]
  summary: string
  brief: string[]
  task: string
  solution: string[]
  results: { label: string; value: string }[]
  gallery: ImageAsset[]
  before: ImageAsset
  after: ImageAsset
  materials: { name: string; note: string; tone: string }[]
  room3d: { name: string; tone: string }
}

const img = (src: string, alt: string, width = 1600, height = 1067): ImageAsset => ({
  src,
  alt,
  width,
  height,
})

export const projects: Project[] = [
  {
    slug: 'kvartira-patriarshie',
    title: 'Квартира на Патриарших',
    subtitle: 'Свет, тишина и дерево в историческом доме',
    location: 'Москва, Патриаршие пруды',
    year: '2024',
    type: 'Квартира',
    area: '186 м²',
    duration: '7 месяцев',
    cover: img('/images/projects/apartment/cover.jpg', 'Гостиная квартиры на Патриарших прудах'),
    palette: ['#E9E5DD', '#B5ADA0', '#6F6357', '#2E2A26'],
    summary:
      'Квартира в доходном доме 1913 года, где требовалось сохранить ощущение парадного ансамбля и при этом собрать современный сценарий жизни для семьи с двумя детьми.',
    brief: [
      'Семья из четырёх человек',
      'Двое детей от 6 и 11 лет',
      'Гостевой сценарий 6–8 человек',
      'Рабочее место на дому',
    ],
    task: 'Переработать планировку старинной квартиры так, чтобы объединить три комнаты в единое пространство, не потеряв ансамбль лепнины и высокие потолки.',
    solution: [
      'Снос несущей перегородки с установкой металлической балки — на полу появился единый контур гостиной-столовой.',
      'Тёплый и холодный свет разведены по сценариям: линейный свет по периметру потолка и мягкие локальные источники у дивана.',
      'Палитра построена на известняковом штукатурном покрытии, натуральном дубе и матовом латунном металле.',
      'Кухня вынесена в отдельный объём, чтобы сохранить ощущение ансамбля в общем пространстве.',
    ],
    results: [
      { label: 'Площадь', value: '186 м²' },
      { label: 'Срок проекта', value: '14 недель' },
      { label: 'Срок стройки', value: '7 месяцев' },
      { label: 'Стоимость работ', value: 'открыто по запросу' },
    ],
    gallery: [
      img('/images/projects/apartment/cover.jpg', 'Гостиная: белый диван, дуб и сухоцветы'),
      img('/images/projects/apartment/gallery-1.jpg', 'Столовая с белым столом и дубовыми стульями'),
      img('/images/projects/apartment/gallery-2.jpg', 'Гостиная с серым диваном и светом из окна'),
      img('/images/projects/apartment/gallery-3.jpg', 'Кухонный блок с дубовым островом'),
      img('/images/projects/apartment/gallery-4.jpg', 'Спальня с деревянной панелью и льняным бельём'),
      img('/images/projects/apartment/gallery-5.jpg', 'Санузел с мраморной стеной и латунью'),
    ],
    before: img('/images/before/before-1.jpg', 'Квартира до ремонта', 1400, 933),
    after: img('/images/projects/apartment/gallery-2.jpg', 'Гостиная после ремонта', 1600, 1067),
    materials: [
      { name: 'Известняковая штукатурка', note: 'Матовая, теплый оттенок, скрытая фактура', tone: '#DED7CB' },
      { name: 'Натуральный дуб', note: 'Массив, брашировка, лёгкий масляный финиш', tone: '#A98761' },
      { name: 'Патинированная латунь', note: 'Сантехника, ручки, светильники', tone: '#9C8250' },
      { name: 'Лён', note: 'Шторы, текстиль, обивка', tone: '#C8BFB0' },
      { name: 'Травертин', note: 'Кухня, санузел, порталы', tone: '#C8B79B' },
    ],
    room3d: { name: 'Гостиная-столовая', tone: '#DED7CB' },
  },
  {
    slug: 'zagorodny-dom',
    title: 'Загородный дом',
    subtitle: 'Дом, в котором живёт свет',
    location: 'Новая Рига',
    year: '2023',
    type: 'Дом',
    area: '412 м²',
    duration: '14 месяцев',
    cover: img('/images/projects/house/cover.jpg', 'Фасад загородного дома с панорамным остеклением'),
    palette: ['#F4F1EB', '#D8D2C6', '#8A8175', '#1B1A18'],
    summary:
      'Резиденция на три спальни, спроектированная как продолжение ландшафта: каменный цоколь, дерево, панорамные окна в пол и терраса, встроенная в ландшафт.',
    brief: [
      'Семья с двумя детьми',
      'Постоянное проживание',
      'Гостевой дом на участке',
      'Терраса и выход к воде',
    ],
    task: 'Спроектировать дом и внутренний двор так, чтобы сценарий жизни вёл от террасы через гостиную к водоёму, а объём здания казался частью рельефа.',
    solution: [
      'Главный объём заглублён в участок — с дороги видна только терраса и кровля.',
      'Панорамное остекление в пол с тонкими профилями, скрытые отбойники в уровне пола.',
      'Натуральный камень в общественной зоне, дерево — в приватной.',
      'Кухня и гостиная объединены в единый контур, обе выходят на террасу.',
    ],
    results: [
      { label: 'Площадь дома', value: '412 м²' },
      { label: 'Участок', value: '24 сотки' },
      { label: 'Срок проекта', value: '22 недели' },
      { label: 'Срок стройки', value: '14 месяцев' },
    ],
    gallery: [
      img('/images/projects/house/cover.jpg', 'Фасад дома вечером'),
      img('/images/projects/house/gallery-1.jpg', 'Гостиная с выходом на террасу'),
      img('/images/projects/house/gallery-2.jpg', 'Кухня-гостиная'),
      img('/images/projects/house/gallery-3.jpg', 'Спальня с видом на участок'),
      img('/images/projects/house/gallery-4.jpg', 'Ванная из травертина'),
      img('/images/projects/house/gallery-5.jpg', 'Терраса'),
    ],
    before: img('/images/before/before-0.jpg', 'Участок до начала строительства', 1400, 933),
    after: img('/images/projects/house/gallery-1.jpg', 'Гостиная после строительства', 1600, 1067),
    materials: [
      { name: 'Серый гранит', note: 'Цоколь, терраса, порталы', tone: '#7C7A75' },
      { name: 'Термоясен', note: 'Фасад, потолки, лестница', tone: '#8C7355' },
      { name: 'Травертин', note: 'Ванная, зона бассейна', tone: '#C8B79B' },
      { name: 'Чёрный металл', note: 'Ограждения, профили, свет', tone: '#26251F' },
      { name: 'Известняк', note: 'Общее пространство, лестничный марш', tone: '#DED7CB' },
    ],
    room3d: { name: 'Гостиная-кухня', tone: '#C8B79B' },
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)

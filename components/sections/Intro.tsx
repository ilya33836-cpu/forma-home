import Image from 'next/image'
import Reveal from '@/components/Reveal'
import ParallaxImage from '@/components/ParallaxImage'

export default function Intro() {
  return (
    <section className="relative overflow-hidden bg-sand py-20 sm:py-24 lg:py-28" aria-label="О студии">
      <div className="shell">
        <div className="grid gap-y-14 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <Reveal>
              <p className="micro text-ink/40">01 — О студии</p>
            </Reveal>
          </div>

          <div className="lg:col-span-9">
            <Reveal delay={0.05}>
              <p className="font-display text-display-md font-light leading-[1.12]">
                Мы проектируем не набор предметов, а <em className="italic">ритм жизни</em> внутри
                пространства. Сначала свет и сценарии, потом архитектура, и только потом — отделка.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {[
                {
                  n: '11',
                  t: 'лет практики',
                  d: 'С 2014 года работаем с частными резиденциями и квартирами в Москве и Подмосковье.',
                },
                {
                  n: '128',
                  t: 'завершённых объектов',
                  d: 'От квартиры 60 м² до загородной резиденции на 600 м² с участком и гостевым домом.',
                },
                {
                  n: '100%',
                  t: 'проектной документации',
                  d: 'Каждый узел, каждая спецификация и ведомость отделки — альбом передаётся подрядчику без доработок.',
                },
              ].map((item, i) => (
                <Reveal key={item.n} delay={0.08 + i * 0.07}>
                  <div className="border-t border-ink/12 pt-5">
                    <p className="font-display text-3xl font-light">{item.n}</p>
                    <p className="micro mt-2 text-ink/60">{item.t}</p>
                    <p className="mt-3 text-sm leading-relaxed text-ink/55">{item.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-12 sm:gap-5 lg:mt-24">
          <ParallaxImage
            src="/images/home/intro.jpg"
            alt="Светлая штукатурка стены и сухая ветка в вазе"
            className="aspect-[4/3] sm:col-span-5 sm:aspect-[3/4]"
            sizes="(max-width: 640px) 100vw, 42vw"
          />
          <div className="sm:col-span-7 sm:grid sm:grid-cols-7 sm:gap-5">
            <ParallaxImage
              src="/images/home/concept.jpg"
              alt="Изогнутая бетонная плоскость с теневым светом"
              className="aspect-[4/3] sm:col-span-4 sm:aspect-auto sm:h-full sm:min-h-[16rem]"
              sizes="(max-width: 640px) 100vw, 30vw"
              parallax={8}
            />
            <div className="flex flex-col justify-end sm:col-span-3 sm:pl-3">
              <Reveal>
                <p className="micro text-ink/40">Наш принцип</p>
                <p className="mt-4 text-sm leading-relaxed text-ink/60">
                  Никаких случайных предметов и «как заказали в каталоге». Каждый элемент оправдан
                  функцией или пропорцией.
                </p>
                <figure className="mt-8">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand-200">
                    <Image
                      src="/images/home/light.jpg"
                      alt="Мягкий дневной свет сквозь льняные шторы"
                      fill
                      sizes="(max-width: 640px) 100vw, 20vw"
                      className="object-cover"
                    />
                  </div>
                </figure>              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

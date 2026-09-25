import Hero from '@/components/sections/Hero'
import Intro from '@/components/sections/Intro'
import IdeaToSpace from '@/components/sections/IdeaToSpace'
import ProjectsGrid from '@/components/sections/ProjectsGrid'
import FeaturedCase from '@/components/sections/FeaturedCase'
import Viewer3D from '@/components/sections/Viewer3D'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import Assembly3D from '@/components/sections/Assembly3D'
import Studio from '@/components/sections/Studio'
import Numbers from '@/components/sections/Numbers'
import Testimonials from '@/components/sections/Testimonials'
import CTA from '@/components/sections/CTA'
import ContactSection from '@/components/sections/ContactSection'
import Marquee from '@/components/Marquee'

const STRIP = [
  'Свет',
  'Фактура',
  'Пропорция',
  'Тишина',
  'Материал',
  'Ритм',
  'Воздух',
  'Точность',
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="border-y border-ink/10 bg-sand-2 py-6">
        <Marquee items={STRIP} duration={44} />
      </div>
      <Intro />
      <IdeaToSpace />
      <ProjectsGrid />
      <FeaturedCase />
      <Viewer3D />
      <Services />
      <Process />
      <Assembly3D />
      <Studio />
      <Numbers />
      <Testimonials />
      <CTA />
      <ContactSection />
    </>
  )
}

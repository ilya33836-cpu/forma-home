'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'

type NavItem = { label: string; href: string }

type Props = {
  nav: readonly NavItem[]
  phone: string
}

export default function Header({ nav, phone }: Props) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let last = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > last && y > 240)
      last = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-soft focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-sand"
      >
        Перейти к содержимому
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ease-premium ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${scrolled ? 'bg-sand/85 backdrop-blur-xl' : 'bg-transparent'}`}
      >
        <div
          className={`shell flex items-center justify-between transition-all duration-700 ease-premium ${
            scrolled ? 'h-16' : 'h-20 sm:h-24'
          }`}
        >
          <Link
            href="/"
            data-cursor-label="На главную"
            className="flex items-baseline gap-2.5 font-sans"
            aria-label="FORMA HOME — на главную"
          >
            <span className="text-[15px] font-semibold tracking-[0.22em] sm:text-base">FORMA</span>
            <span className="text-[15px] font-light tracking-[0.22em] text-ink/55 sm:text-base">
              HOME
            </span>
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Основная навигация">
            {nav.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor-label="Открыть"
                  aria-current={active ? 'page' : undefined}
                  className={`link-underline micro transition-colors duration-300 ${
                    active ? 'text-ink' : 'text-ink/60 hover:text-ink'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${phone.replace(/[^\d+]/g, '')}`}
              data-cursor-label="Позвонить"
              className="micro hidden text-ink/60 transition-colors hover:text-ink sm:block"
            >
              {phone}
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={open}
              className="flex size-10 items-center justify-center rounded-soft border border-ink/20 transition-colors hover:border-ink lg:hidden"
            >
              <Menu className="size-[18px]" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div
          className={`hairline origin-left transition-transform duration-700 ease-premium ${
            scrolled ? 'scale-x-100' : 'scale-x-0'
          }`}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col bg-ink text-sand lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="shell flex h-20 shrink-0 items-center justify-between">
              <span className="text-[15px] font-semibold tracking-[0.22em]">FORMA HOME</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Закрыть меню"
                className="flex size-10 items-center justify-center rounded-soft border border-sand/25"
              >
                <X className="size-[18px]" strokeWidth={1.5} />
              </button>
            </div>

            <nav className="shell flex flex-1 flex-col justify-center gap-1" aria-label="Мобильная навигация">
              {nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 + i * 0.07, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={item.href}
                    className="block border-b border-sand/12 py-5 font-display text-display-sm"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="shell shrink-0 space-y-4 pb-10">
              <a
                href={`tel:${phone.replace(/[^\d+]/g, '')}`}
                className="flex items-center gap-3 text-lg tracking-wide"
              >
                <Phone className="size-4" strokeWidth={1.5} />
                {phone}
              </a>
              <p className="micro text-sand/45">Москва · Новая Рига</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

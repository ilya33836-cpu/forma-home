'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { Button } from './Button'

const BUDGETS = ['до 3 млн ₽', '3–6 млн ₽', '6–12 млн ₽', '12 млн ₽ и выше']
const TYPES = ['Квартира', 'Загородный дом', 'Апартаменты', 'Коммерческое помещение']

type Status = 'idle' | 'sending' | 'ok' | 'error'

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [type, setType] = useState(TYPES[0])
  const [budget, setBudget] = useState(BUDGETS[1])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    setError('')

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

    if (!accessKey) {
      setStatus('error')
      setError(
        'Форма временно недоступна. Напишите нам на почту — ответим в течение рабочего дня.',
      )
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Заявка с сайта — ${data.name}`,
          from_name: data.name as string,
          reply_to: data.email as string,
          ...data,
          type,
          budget,
          message: data.message || 'Без комментария',
        }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.success) throw new Error('submit failed')
      setStatus('ok')
      form.reset()
    } catch {
      setStatus('error')
      setError('Не удалось отправить заявку. Напишите нам на почту — ответим в течение дня.')
    }
  }

  const field =
    'w-full border-b border-ink/20 bg-transparent py-3.5 text-[15px] outline-none transition-colors placeholder:text-ink/35 focus:border-ink'

  return (
    <form onSubmit={onSubmit} className="w-full" noValidate>
      <div className={`grid gap-x-10 ${compact ? 'gap-y-6' : 'gap-y-8'}`}>
        <div className="grid gap-x-10 sm:grid-cols-2">
          <label className="block">
            <span className="micro text-ink/45">Имя</span>
            <input name="name" required className={field} placeholder="Как к вам обращаться" />
          </label>
          <label className="block">
            <span className="micro text-ink/45">Телефон</span>
            <input
              name="phone"
              type="tel"
              required
              className={field}
              placeholder="+7 (___) ___-__-__"
            />
          </label>
        </div>

        <label className="block">
          <span className="micro text-ink/45">Email</span>
          <input name="email" type="email" required className={field} placeholder="you@example.com" />
        </label>

        <label className="block">
          <span className="micro text-ink/45">О проекте</span>
          <textarea
            name="message"
            rows={compact ? 2 : 3}
            className={`${field} resize-none`}
            placeholder="Площадь, локация, сроки, пожелания"
          />
        </label>

        <fieldset>
          <legend className="micro text-ink/45">Тип объекта</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                aria-pressed={type === t}
                className={`rounded-soft border px-4 py-2 text-[13px] transition-colors ${
                  type === t
                    ? 'border-ink bg-ink text-sand'
                    : 'border-ink/20 text-ink/65 hover:border-ink/50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="micro text-ink/45">Бюджет на отделку</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {BUDGETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setBudget(b)}
                aria-pressed={budget === b}
                className={`rounded-soft border px-4 py-2 text-[13px] transition-colors ${
                  budget === b
                    ? 'border-ink bg-ink text-sand'
                    : 'border-ink/20 text-ink/65 hover:border-ink/50'
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-6 pt-2">
          <Button type="submit" size="lg" icon disabled={status === 'sending'}>
            {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
          </Button>
          <p className="max-w-xs text-[12px] leading-relaxed text-ink/45">
            Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === 'ok' && (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-2.5 text-sm text-ink"
              role="status"
            >
              <Check className="size-4" strokeWidth={1.5} />
              Заявка отправлена. Свяжемся в течение рабочего дня.
            </motion.p>
          )}
          {status === 'error' && (
            <motion.p
              key="err"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-ink/70"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}

export function FormArrow() {
  return <ArrowRight className="size-4" strokeWidth={1.5} />
}

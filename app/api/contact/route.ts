import { NextResponse, type NextRequest } from 'next/server'

const PHONE = /^[+()\d\s-]{10,22}$/
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Некорректный запрос' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  const email = String(body.email ?? '').trim()

  if (name.length < 2 || name.length > 80) {
    return NextResponse.json({ error: 'Укажите имя' }, { status: 422 })
  }
  if (!PHONE.test(phone)) {
    return NextResponse.json({ error: 'Укажите корректный телефон' }, { status: 422 })
  }
  if (!EMAIL.test(email)) {
    return NextResponse.json({ error: 'Укажите корректный email' }, { status: 422 })
  }

  const message = String(body.message ?? '').slice(0, 4000)
  const type = String(body.type ?? '').slice(0, 80)
  const budget = String(body.budget ?? '').slice(0, 80)

  const to = process.env.CONTACT_EMAIL_TO
  const from = process.env.CONTACT_EMAIL_FROM

  if (to && from) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY не задан')
      return NextResponse.json({ error: 'Почта не настроена' }, { status: 502 })
    }
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from,
        to: [to],
        replyTo: email,
        subject: `Заявка с сайта — ${name}`,
        text: [
          `Имя: ${name}`,
          `Телефон: ${phone}`,
          `Email: ${email}`,
          `Тип объекта: ${type}`,
          `Бюджет: ${budget}`,
          '',
          message,
        ].join('\n'),
      })
    } catch (err) {
      console.error('Не удалось отправить письмо:', err)
      return NextResponse.json({ error: 'Письмо не отправлено' }, { status: 502 })
    }
  } else {
    console.log('Заявка с сайта (почта не настроена):', { name, phone, email, type, budget, message })
  }

  return NextResponse.json({ ok: true })
}

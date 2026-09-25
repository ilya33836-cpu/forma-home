import { ImageResponse } from 'next/og'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/jpeg'
export const alt = 'FORMA HOME — студия дизайна интерьеров'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F1EB',
          padding: 72,
          color: '#171715',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 8 }}>FORMA</span>
          <span style={{ fontSize: 34, fontWeight: 300, letterSpacing: 8, opacity: 0.55 }}>HOME</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontSize: 88, lineHeight: 1.02, fontWeight: 300, maxWidth: 900 }}>
            Пространства, которые живут
          </div>
          <div style={{ fontSize: 26, opacity: 0.6, letterSpacing: 2, textTransform: 'uppercase' }}>
            Студия дизайна интерьеров и архитектуры · Москва
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 10 }}>
            {['#E9E5DD', '#B5ADA0', '#77736C', '#171715'].map((c) => (
              <div key={c} style={{ width: 54, height: 54, background: c, borderRadius: 4 }} />
            ))}
          </div>
          <div style={{ fontSize: 24, opacity: 0.5 }}>forma-home.ru</div>
        </div>
      </div>
    ),
    size,
  )
}

'use client'

type Props = {
  items: string[]
  duration?: number
  className?: string
}

export default function Marquee({ items, duration = 38, className = '' }: Props) {
  const row = [...items, ...items]
  return (
    <div
      className={`marquee relative flex overflow-hidden ${className}`}
      style={{ ['--marquee-duration' as string]: `${duration}s` }}
    >
      <div className="marquee-track flex w-max shrink-0 items-center">
        {row.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 font-display text-display-sm italic text-ink/85 sm:px-10">
              {item}
            </span>
            <span aria-hidden className="size-1 shrink-0 rounded-full bg-clay" />
          </span>
        ))}
      </div>
    </div>
  )
}

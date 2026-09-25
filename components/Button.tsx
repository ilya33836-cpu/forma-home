'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'

type Variant = 'solid' | 'outline' | 'ghost' | 'light'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group/btn relative inline-flex select-none items-center justify-center gap-2.5 rounded-soft font-sans font-medium tracking-[0.02em] transition-colors duration-500 ease-premium disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  solid: 'bg-ink text-sand hover:bg-ink/85',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink/[0.04]',
  ghost: 'text-ink hover:bg-ink/[0.05]',
  light: 'border border-sand/35 text-sand hover:border-sand hover:bg-sand hover:text-ink',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-[13px]',
  md: 'h-12 px-7 text-[13px]',
  lg: 'h-14 px-9 text-sm',
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: boolean
  cursor?: string
}

function Inner({ children, icon }: { children: ReactNode; icon: boolean }) {
  return (
    <>
      <span>{children}</span>
      {icon ? (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-500 ease-premium group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  )
}

type ButtonProps = CommonProps & Omit<ComponentProps<'button'>, keyof CommonProps>

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  className = '',
  icon = false,
  cursor,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      {...(cursor ? { 'data-cursor-label': cursor } : {})}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      <Inner icon={icon}>
        {children}
      </Inner>
    </button>
  )
}

type LinkProps = CommonProps &
  Omit<ComponentProps<typeof Link>, keyof CommonProps> & { href: string }

export function ButtonLink({
  children,
  href,
  variant = 'solid',
  size = 'md',
  className = '',
  icon = false,
  cursor = 'Открыть',
  ...rest
}: LinkProps) {
  const external = href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  const inner = <Inner icon={icon}>{children}</Inner>

  if (external) {
    return (
      <a
        href={href}
        data-cursor-label={cursor}
        {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
        className={cls}
      >
        {inner}
      </a>
    )
  }

  return (
    <Link href={href} data-cursor-label={cursor} className={cls} {...rest}>
      {inner}
    </Link>
  )
}

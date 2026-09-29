'use client'

import { useEffect, useState } from 'react'

// Решает, тянет ли устройство WebGL-сцену. Один раз на загрузку, кеш в
// sessionStorage: проверка дешёвая, но лишний перебор GPU на слабом телефоне
// заметен (сцена с тенями умеет греть процессор).
//
// Что именно смотрим:
//   • нет WebGL / контекст не поднялся — рендерить нечем;
//   • coarse pointer (телефон/планшет) — сцена уводит жестами, а не помогает;
//   • мало ядер или RAM — на сцене будет 20–30 fps и просадка всего скролла.
export function useWebGLAllowed() {
  const [state, setState] = useState<'pending' | 'allowed' | 'denied'>('pending')

  useEffect(() => {
    const KEY = 'forma:webgl'
    const cached = () => {
      try {
        return sessionStorage.getItem(KEY)
      } catch {
        return null
      }
    }
    const store = (v: '1' | '0') => {
      try {
        sessionStorage.setItem(KEY, v)
      } catch {
        /* приватный режим — просто не кешируем */
      }
    }

    const saved = cached()
    if (saved === '1') {
      setState('allowed')
      return
    }
    if (saved === '0') {
      setState('denied')
      return
    }

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const weakCpu = (navigator.hardwareConcurrency ?? 8) < 4
    const lowMem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory
      ? (navigator as Navigator & { deviceMemory?: number }).deviceMemory! < 4
      : false

    if (coarse || weakCpu || lowMem) {
      store('0')
      setState('denied')
      return
    }

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
      if (!gl) {
        store('0')
        setState('denied')
        return
      }
      const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context')
      lose?.loseContext()
    } catch {
      store('0')
      setState('denied')
      return
    }

    store('1')
    setState('allowed')
  }, [])

  return state
}

import type { Locale } from '../data/types'

export const LOCALES: Locale[] = ['en', 'uk']

export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'EN',
  uk: 'UA',
}

export function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en'
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const l of langs) {
    const code = l.toLowerCase()
    if (code.startsWith('uk') || code.startsWith('ru')) return 'uk'
    if (code.startsWith('en')) return 'en'
  }
  return 'en'
}

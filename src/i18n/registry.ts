import type { Locale } from '../data/types'

export type Messages = Record<string, string>

const dictionaries: Record<Locale, Messages> = { en: {}, uk: {} }

/** Data modules register their own copy so exercise text lives next to the exercise. */
export function registerMessages(locale: Locale, messages: Messages): void {
  Object.assign(dictionaries[locale], messages)
}

export function translate(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const raw = dictionaries[locale][key] ?? dictionaries.en[key] ?? key
  if (!vars) return raw
  return raw.replace(/\{(\w+)\}/g, (m, name: string) => (name in vars ? String(vars[name]) : m))
}

/** Missing keys fall through to the key itself; surface them in dev instead of shipping blanks. */
export function missingKeys(locale: Locale): string[] {
  return Object.keys(dictionaries.en).filter((k) => !(k in dictionaries[locale]))
}

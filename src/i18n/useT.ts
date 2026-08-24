import { useCallback } from 'react'
import { useSettings } from '../store/useAppStore'
import { translate } from './registry'

export function useLocale() {
  return useSettings((s) => s.locale)
}

export function useT() {
  const locale = useLocale()
  return useCallback(
    (key: string, vars?: Record<string, string | number>) => translate(locale, key, vars),
    [locale],
  )
}

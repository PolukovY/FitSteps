import type { Locale } from '../data/types'

export interface VoiceLine {
  /** Already-translated text; a recorded-asset provider maps it back by key. */
  text: string
  key: string
}

/**
 * Voice output is behind an interface so the Web Speech implementation can be
 * swapped for pre-recorded assets later without touching the workout engine.
 */
export interface VoiceProvider {
  readonly available: boolean
  speak(line: VoiceLine, locale: Locale): void
  cancel(): void
}

const LOCALE_TAGS: Record<Locale, string[]> = {
  en: ['en-GB', 'en-US', 'en'],
  uk: ['uk-UA', 'uk'],
}

class SpeechSynthesisProvider implements VoiceProvider {
  private voices: SpeechSynthesisVoice[] = []

  constructor() {
    if (!this.available) return
    const load = () => {
      this.voices = window.speechSynthesis.getVoices()
    }
    load()
    window.speechSynthesis.addEventListener('voiceschanged', load)
  }

  get available(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window
  }

  private pickVoice(locale: Locale): SpeechSynthesisVoice | undefined {
    for (const tag of LOCALE_TAGS[locale]) {
      const match = this.voices.find((v) => v.lang.toLowerCase().startsWith(tag.toLowerCase()))
      if (match) return match
    }
    return undefined
  }

  speak(line: VoiceLine, locale: Locale): void {
    if (!this.available || !line.text) return
    const utterance = new SpeechSynthesisUtterance(line.text)
    const voice = this.pickVoice(locale)
    if (voice) utterance.voice = voice
    utterance.lang = voice?.lang ?? LOCALE_TAGS[locale][0]
    utterance.rate = 1.05
    utterance.pitch = 1
    // Coaching cues are worthless late: a new line always replaces the old one.
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utterance)
  }

  cancel(): void {
    if (this.available) window.speechSynthesis.cancel()
  }
}

let provider: VoiceProvider = new SpeechSynthesisProvider()

export function getVoiceProvider(): VoiceProvider {
  return provider
}

/** Entry point for a future pre-recorded voice pack. */
export function setVoiceProvider(next: VoiceProvider): void {
  provider = next
}

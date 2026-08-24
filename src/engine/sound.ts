/**
 * Tones are synthesised rather than shipped as files: nothing to download,
 * nothing to cache, and the workout stays fully functional offline.
 */
let context: AudioContext | null = null

function ctx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!Ctor) return null
  if (!context) context = new Ctor()
  if (context.state === 'suspended') void context.resume()
  return context
}

function tone(frequency: number, duration: number, gainValue = 0.08, when = 0): void {
  const audio = ctx()
  if (!audio) return
  const osc = audio.createOscillator()
  const gain = audio.createGain()
  const start = audio.currentTime + when
  osc.type = 'sine'
  osc.frequency.value = frequency
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(gainValue, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration)
  osc.connect(gain).connect(audio.destination)
  osc.start(start)
  osc.stop(start + duration + 0.02)
}

export const sounds = {
  /** Browsers only allow audio after a gesture; call this from the start button. */
  unlock: () => void ctx(),
  countdownTick: () => tone(660, 0.12),
  countdownGo: () => tone(990, 0.28, 0.1),
  exerciseDone: () => {
    tone(760, 0.14)
    tone(1010, 0.2, 0.08, 0.12)
  },
  restStart: () => tone(430, 0.22, 0.06),
  workoutComplete: () => {
    tone(660, 0.16)
    tone(880, 0.16, 0.08, 0.16)
    tone(1180, 0.34, 0.09, 0.32)
  },
}

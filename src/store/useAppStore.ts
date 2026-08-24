import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Locale, Muscle } from '../data/types'
import { detectLocale } from '../i18n/locales'

export interface Settings {
  locale: Locale
  voiceCoach: boolean
  sound: boolean
  vibration: boolean
  countdown: boolean
  setLocale: (l: Locale) => void
  toggle: (key: 'voiceCoach' | 'sound' | 'vibration' | 'countdown') => void
}

export const useSettings = create<Settings>()(
  persist(
    (set) => ({
      locale: detectLocale(),
      voiceCoach: true,
      sound: true,
      vibration: true,
      countdown: true,
      setLocale: (locale) => set({ locale }),
      toggle: (key) => set((s) => ({ [key]: !s[key] }) as Partial<Settings>),
    }),
    { name: 'fitsteps.settings.v1' },
  ),
)

export interface HistoryEntry {
  id: string
  workoutId: string
  programId?: string
  /** Local calendar day, YYYY-MM-DD — streaks are a calendar concept, not a UTC one. */
  date: string
  finishedAt: number
  durationSeconds: number
  exerciseCount: number
  kcal: number
  /** Seconds of work attributed to each muscle, primary weighted double. */
  muscleLoad: Partial<Record<Muscle, number>>
  /** 1–5 perceived intensity, absent when the user skipped the question. */
  rating?: number
}

export interface ActiveProgram {
  programId: string
  startedAt: number
  /** 1-based day the user is on next. */
  currentDay: number
  completedDays: number[]
}

interface ProgressState {
  history: HistoryEntry[]
  activeProgram: ActiveProgram | null
  addWorkout: (entry: HistoryEntry) => void
  rateWorkout: (id: string, rating: number) => void
  startProgram: (programId: string) => void
  leaveProgram: () => void
  advanceProgram: (day: number) => void
  resetAll: () => void
}

export const useProgress = create<ProgressState>()(
  persist(
    (set) => ({
      history: [],
      activeProgram: null,
      addWorkout: (entry) => set((s) => ({ history: [entry, ...s.history].slice(0, 500) })),
      rateWorkout: (id, rating) =>
        set((s) => ({ history: s.history.map((h) => (h.id === id ? { ...h, rating } : h)) })),
      startProgram: (programId) =>
        set({ activeProgram: { programId, startedAt: Date.now(), currentDay: 1, completedDays: [] } }),
      leaveProgram: () => set({ activeProgram: null }),
      advanceProgram: (day) =>
        set((s) =>
          s.activeProgram
            ? {
                activeProgram: {
                  ...s.activeProgram,
                  completedDays: s.activeProgram.completedDays.includes(day)
                    ? s.activeProgram.completedDays
                    : [...s.activeProgram.completedDays, day],
                  currentDay: Math.max(s.activeProgram.currentDay, day + 1),
                },
              }
            : {},
        ),
      resetAll: () => set({ history: [], activeProgram: null }),
    }),
    { name: 'fitsteps.progress.v1' },
  ),
)

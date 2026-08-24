import { create } from 'zustand'
import type { RuntimeStep } from '../engine/session'
import type { HistoryEntry } from './useAppStore'

interface PendingSession {
  workoutId: string
  steps: RuntimeStep[]
  programId?: string
  programDay?: number
}

interface SessionState {
  pending: PendingSession | null
  /** The finished workout the completion screen renders. */
  result: (HistoryEntry & { programDay?: number }) | null
  start: (session: PendingSession) => void
  finish: (result: HistoryEntry & { programDay?: number }) => void
  clear: () => void
}

/**
 * Deliberately not persisted: a half-configured workout should not survive a
 * reload, and the finished one is already in history by the time it lands here.
 */
export const useSession = create<SessionState>((set) => ({
  pending: null,
  result: null,
  start: (pending) => set({ pending, result: null }),
  finish: (result) => set({ result, pending: null }),
  clear: () => set({ pending: null, result: null }),
}))

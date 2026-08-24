import { findProgram, programDay } from '../data/programs'
import { findWorkout } from '../data/workouts'
import type { Program, ProgramDay, Workout } from '../data/types'
import { useProgress } from '../store/useAppStore'

export type TodayPlan =
  | { kind: 'none' }
  | { kind: 'rest'; program: Program; day: number }
  | { kind: 'done'; program: Program }
  | { kind: 'workout'; program: Program; day: number; workout: Workout; entry: ProgramDay }

/** What the Home screen should offer right now, derived from the active program. */
export function useTodayPlan(): TodayPlan {
  const active = useProgress((s) => s.activeProgram)
  if (!active) return { kind: 'none' }

  const program = findProgram(active.programId)
  if (!program) return { kind: 'none' }
  if (active.currentDay > program.durationDays) return { kind: 'done', program }

  const entry = programDay(program, active.currentDay)
  if (!entry || entry.rest || !entry.workoutId) {
    return { kind: 'rest', program, day: active.currentDay }
  }

  const workout = findWorkout(entry.workoutId)
  if (!workout) return { kind: 'rest', program, day: active.currentDay }

  return { kind: 'workout', program, day: active.currentDay, workout, entry }
}

export function programProgress(program: Program, completedDays: number[]) {
  const trainingDays = program.days.filter((d) => !d.rest)
  const done = trainingDays.filter((d) => completedDays.includes(d.day)).length
  return {
    done,
    total: trainingDays.length,
    percent: trainingDays.length ? Math.round((done / trainingDays.length) * 100) : 0,
  }
}

export function weekOf(day: number): number {
  return Math.floor((day - 1) / 7) + 1
}

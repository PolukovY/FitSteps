import type { Exercise } from '../types'
import { legs } from './legs'
import { upper } from './upper'
import { core } from './core'
import { cardio } from './cardio'
import { mobility } from './mobility'
import { stretching } from './stretching'

export const EXERCISES: Exercise[] = [...legs, ...upper, ...core, ...cardio, ...mobility, ...stretching]

const byId = new Map(EXERCISES.map((e) => [e.id, e]))

export function getExercise(id: string): Exercise {
  const found = byId.get(id)
  if (!found) throw new Error(`Unknown exercise: ${id}`)
  return found
}

export function findExercise(id: string): Exercise | undefined {
  return byId.get(id)
}

/** Alternatives offered mid-workout: explicit swaps plus the easier/harder pair. */
export function alternativesFor(exercise: Exercise): Exercise[] {
  const ids = [
    exercise.easierAlternativeId,
    exercise.harderAlternativeId,
    ...(exercise.alternativeIds ?? []),
  ].filter((id): id is string => Boolean(id))
  const unique = [...new Set(ids)].filter((id) => id !== exercise.id)
  return unique.map((id) => byId.get(id)).filter((e): e is Exercise => Boolean(e))
}

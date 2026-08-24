import { getExercise } from '../data/exercises'
import type { Exercise, Muscle, ProgramDay, Workout, WorkoutBlock, WorkoutStep } from '../data/types'

export interface RuntimeStep {
  exerciseId: string
  block: WorkoutBlock
  reps?: number
  durationSeconds?: number
  restSeconds: number
  /** 2 for per-side exercises: the same work is performed twice. */
  sides: number
}

export function isTimed(step: RuntimeStep): boolean {
  return step.durationSeconds != null
}

function toRuntime(step: WorkoutStep): RuntimeStep {
  const exercise = getExercise(step.exerciseId)
  const timed = exercise.type === 'timer' || exercise.type === 'hold' || step.durationSeconds != null
  return {
    exerciseId: step.exerciseId,
    block: step.block,
    reps: timed ? undefined : (step.reps ?? exercise.defaultReps ?? 10),
    durationSeconds: timed ? (step.durationSeconds ?? exercise.defaultDurationSeconds ?? 30) : undefined,
    restSeconds: step.restSeconds,
    sides: exercise.type === 'per_side' ? 2 : 1,
  }
}

export interface BuildOptions {
  includeWarmup?: boolean
  includeCooldown?: boolean
  overrides?: ProgramDay['overrides']
}

/** Program progression is applied here, so no screen ever has to know about it. */
export function buildSteps(workout: Workout, options: BuildOptions = {}): RuntimeStep[] {
  const { includeWarmup = true, includeCooldown = true, overrides } = options
  return workout.steps
    .filter((s) => (s.block === 'warmup' ? includeWarmup : s.block === 'cooldown' ? includeCooldown : true))
    .map((s) => {
      const o = overrides?.[s.exerciseId]
      return toRuntime(o ? { ...s, ...o } : s)
    })
}

/** Swaps one step's exercise, carrying over sensible defaults for the new movement. */
export function replaceStep(steps: RuntimeStep[], index: number, exerciseId: string): RuntimeStep[] {
  const current = steps[index]
  const next = getExercise(exerciseId)
  const timed = next.type === 'timer' || next.type === 'hold'
  return steps.map((s, i) =>
    i === index
      ? {
          ...s,
          exerciseId,
          sides: next.type === 'per_side' ? 2 : 1,
          reps: timed ? undefined : (current.reps ?? next.defaultReps ?? 10),
          durationSeconds: timed ? (current.durationSeconds ?? next.defaultDurationSeconds ?? 30) : undefined,
        }
      : s,
  )
}

export function stepSeconds(step: RuntimeStep): number {
  if (step.durationSeconds) return step.durationSeconds * step.sides
  return (step.reps ?? 10) * 3 * step.sides
}

export function totalSeconds(steps: RuntimeStep[]): number {
  return steps.reduce((t, s) => t + stepSeconds(s) + s.restSeconds, 0)
}

/**
 * Muscle load in seconds of work, primary muscles weighted double. Feeds the
 * muscle-balance chart without needing any extra bookkeeping per exercise.
 */
export function muscleLoadOf(steps: RuntimeStep[]): Partial<Record<Muscle, number>> {
  const load: Partial<Record<Muscle, number>> = {}
  for (const step of steps) {
    const exercise = getExercise(step.exerciseId)
    const seconds = stepSeconds(step)
    for (const m of exercise.primaryMuscles) load[m] = (load[m] ?? 0) + seconds
    for (const m of exercise.secondaryMuscles) load[m] = (load[m] ?? 0) + seconds * 0.5
  }
  return load
}

export function musclesOf(steps: RuntimeStep[]): { primary: Muscle[]; secondary: Muscle[] } {
  const primary = new Set<Muscle>()
  const secondary = new Set<Muscle>()
  for (const step of steps) {
    const exercise = getExercise(step.exerciseId)
    exercise.primaryMuscles.forEach((m) => primary.add(m))
    exercise.secondaryMuscles.forEach((m) => secondary.add(m))
  }
  for (const m of primary) secondary.delete(m)
  return { primary: [...primary], secondary: [...secondary] }
}

export function exerciseOf(step: RuntimeStep): Exercise {
  return getExercise(step.exerciseId)
}

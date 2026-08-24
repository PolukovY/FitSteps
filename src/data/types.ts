export type Locale = 'en' | 'uk'

export type BodyPart =
  | 'full_body' | 'chest' | 'back' | 'arms' | 'shoulders'
  | 'core' | 'legs' | 'glutes'

export type Muscle =
  | 'chest' | 'lats' | 'traps' | 'lower_back' | 'front_delts' | 'side_delts'
  | 'rear_delts' | 'biceps' | 'triceps' | 'forearms' | 'abs' | 'obliques'
  | 'quadriceps' | 'hamstrings' | 'glutes' | 'calves' | 'hip_flexors'
  | 'adductors' | 'abductors' | 'neck' | 'cardio'

export type ExerciseCategory = 'strength' | 'cardio' | 'mobility' | 'stretching'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'

/**
 * `distance` is unused in the MVP but part of the model so a future
 * "Walk 1 km" step needs no engine change.
 */
export type ExerciseType = 'repetitions' | 'timer' | 'hold' | 'per_side' | 'distance'

export interface Exercise {
  id: string

  nameKey: string
  descriptionKey: string

  category: ExerciseCategory
  bodyParts: BodyPart[]

  primaryMuscles: Muscle[]
  secondaryMuscles: Muscle[]

  difficulty: Difficulty
  type: ExerciseType

  defaultReps?: number
  defaultDurationSeconds?: number
  defaultDistanceMeters?: number

  /** "3-1-1" — seconds down, pause, up. */
  tempo?: string

  /** Id of the animation rig that demonstrates the movement. */
  animationAsset: string

  instructionsKey: string
  startingPositionKey: string
  breathingKey?: string
  commonMistakesKey?: string
  safetyTipsKey?: string
  rangeOfMotionKey?: string

  coachingCueKeys: string[]

  easierAlternativeId?: string
  harderAlternativeId?: string
  /** Swaps offered mid-workout for space/noise/discomfort reasons. */
  alternativeIds?: string[]

  equipment: 'none'
}

export type WorkoutCategory =
  | 'full_body' | 'abs_core' | 'chest' | 'arms' | 'back' | 'shoulders'
  | 'legs' | 'glutes' | 'cardio' | 'mobility' | 'stretching' | 'warm_up'

export type WorkoutBlock = 'warmup' | 'main' | 'cooldown'

export interface WorkoutStep {
  exerciseId: string
  block: WorkoutBlock
  reps?: number
  durationSeconds?: number
  /** Rest that follows this step, in seconds. */
  restSeconds: number
}

export interface Workout {
  id: string
  nameKey: string
  descriptionKey: string
  category: WorkoutCategory
  difficulty: Difficulty
  steps: WorkoutStep[]
  /** Rough MET-based estimate, recomputed from the real duration on finish. */
  estimatedKcal: number
}

export interface ProgramDay {
  /** 1-based day index inside the program. */
  day: number
  workoutId?: string
  /** A rest day carries no workout. */
  rest?: boolean
  /** Per-day overrides that express progression without touching UI logic. */
  overrides?: Record<string, { reps?: number; durationSeconds?: number; restSeconds?: number }>
}

export interface Program {
  id: string
  nameKey: string
  goalKey: string
  descriptionKey: string
  difficulty: Difficulty
  durationDays: number
  daysPerWeek: number
  accent: 'lime' | 'cool' | 'hot' | 'violet'
  days: ProgramDay[]
}

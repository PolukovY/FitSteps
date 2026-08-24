import { registerMessages } from '../i18n/registry'
import { getExercise } from './exercises'
import type { Difficulty, Workout, WorkoutBlock, WorkoutCategory, WorkoutStep } from './types'

interface StepInput {
  reps?: number
  seconds?: number
  rest?: number
}

function step(block: WorkoutBlock, defaultRest: number) {
  return (exerciseId: string, input: StepInput = {}): WorkoutStep => {
    const exercise = getExercise(exerciseId)
    const timed = exercise.type === 'timer' || exercise.type === 'hold'
    return {
      exerciseId,
      block,
      reps: timed ? undefined : (input.reps ?? exercise.defaultReps ?? 10),
      durationSeconds: timed
        ? (input.seconds ?? exercise.defaultDurationSeconds ?? 30)
        : input.seconds,
      restSeconds: input.rest ?? defaultRest,
    }
  }
}

const REST_BY_DIFFICULTY: Record<Difficulty, number> = {
  beginner: 40,
  intermediate: 30,
  advanced: 20,
}

/**
 * Rough MET model: a step's work time counts at the category's intensity,
 * rest at 1.5. Recomputed against real elapsed time when a workout finishes,
 * so the number on the intro screen is only ever an estimate.
 */
const MET: Record<WorkoutCategory, number> = {
  full_body: 6, abs_core: 5, chest: 5.5, arms: 5, back: 5, shoulders: 5,
  legs: 6, glutes: 5.5, cardio: 8, mobility: 3, stretching: 2.5, warm_up: 4,
}

/** Seconds a rep-based step is assumed to take, for duration estimates. */
const SECONDS_PER_REP = 3

export function stepWorkSeconds(s: WorkoutStep): number {
  if (s.durationSeconds) {
    const exercise = getExercise(s.exerciseId)
    return exercise.type === 'per_side' ? s.durationSeconds * 2 : s.durationSeconds
  }
  const exercise = getExercise(s.exerciseId)
  const reps = s.reps ?? 10
  return reps * SECONDS_PER_REP * (exercise.type === 'per_side' ? 2 : 1)
}

export function workoutSeconds(steps: WorkoutStep[]): number {
  return steps.reduce((total, s) => total + stepWorkSeconds(s) + s.restSeconds, 0)
}

export function estimateKcal(steps: WorkoutStep[], category: WorkoutCategory): number {
  const work = steps.reduce((t, s) => t + stepWorkSeconds(s), 0)
  const rest = steps.reduce((t, s) => t + s.restSeconds, 0)
  // 70 kg reference body mass; kcal/min = MET * 3.5 * kg / 200.
  const perMin = (met: number) => (met * 3.5 * 70) / 200
  return Math.round((work / 60) * perMin(MET[category]) + (rest / 60) * perMin(1.5))
}

interface WorkoutInput {
  id: string
  category: WorkoutCategory
  difficulty: Difficulty
  en: { name: string; description: string }
  uk: { name: string; description: string }
  build: (helpers: {
    warm: ReturnType<typeof step>
    main: ReturnType<typeof step>
    cool: ReturnType<typeof step>
  }) => WorkoutStep[]
}

function defineWorkout(input: WorkoutInput): Workout {
  const rest = REST_BY_DIFFICULTY[input.difficulty]
  const steps = input.build({
    warm: step('warmup', 15),
    main: step('main', rest),
    cool: step('cooldown', 5),
  })
  registerMessages('en', {
    [`wk.${input.id}.name`]: input.en.name,
    [`wk.${input.id}.description`]: input.en.description,
  })
  registerMessages('uk', {
    [`wk.${input.id}.name`]: input.uk.name,
    [`wk.${input.id}.description`]: input.uk.description,
  })
  return {
    id: input.id,
    nameKey: `wk.${input.id}.name`,
    descriptionKey: `wk.${input.id}.description`,
    category: input.category,
    difficulty: input.difficulty,
    steps,
    estimatedKcal: estimateKcal(steps, input.category),
  }
}

export const WORKOUTS: Workout[] = [
  defineWorkout({
    id: 'full-body-a', category: 'full_body', difficulty: 'beginner',
    en: { name: 'Full Body A', description: 'Squat, press and brace — the three patterns every session should touch.' },
    uk: { name: 'Все тіло A', description: 'Присід, жим і утримання — три патерни, які має зачіпати кожне тренування.' },
    build: ({ warm, main, cool }) => [
      warm('march-in-place', { seconds: 30 }),
      warm('arm-circle', { seconds: 30 }),
      warm('hip-rotation', { seconds: 30 }),
      main('squat', { reps: 12 }),
      main('knee-push-up', { reps: 8 }),
      main('glute-bridge', { reps: 14 }),
      main('reverse-lunge', { reps: 8 }),
      main('plank', { seconds: 30 }),
      main('superman', { reps: 10 }),
      cool('hamstring-stretch', { seconds: 25 }),
      cool('child-pose', { seconds: 30 }),
    ],
  }),

  defineWorkout({
    id: 'full-body-b', category: 'full_body', difficulty: 'intermediate',
    en: { name: 'Full Body B', description: 'Higher volume and a cardio finisher — the step up from Full Body A.' },
    uk: { name: 'Все тіло B', description: 'Більший обсяг і кардіо-фінішер — наступний крок після «Все тіло A».' },
    build: ({ warm, main, cool }) => [
      warm('jumping-jack', { seconds: 40 }),
      warm('torso-twist', { seconds: 30 }),
      warm('leg-swing', { seconds: 20 }),
      main('squat', { reps: 15 }),
      main('push-up', { reps: 10 }),
      main('split-squat', { reps: 10 }),
      main('bird-dog', { reps: 10 }),
      main('mountain-climber', { seconds: 30 }),
      main('side-plank', { seconds: 25 }),
      main('calf-raise', { reps: 20 }),
      cool('quad-stretch', { seconds: 25 }),
      cool('chest-stretch', { seconds: 25 }),
      cool('child-pose', { seconds: 30 }),
    ],
  }),

  defineWorkout({
    id: 'home-strength', category: 'full_body', difficulty: 'advanced',
    en: { name: 'Home Strength', description: 'Hard bodyweight patterns with short rests — no equipment, no excuses.' },
    uk: { name: 'Домашня сила', description: 'Складні рухи з власною вагою й короткий відпочинок — без інвентарю, без відмовок.' },
    build: ({ warm, main, cool }) => [
      warm('jumping-jack', { seconds: 40 }),
      warm('inchworm', { reps: 6 }),
      main('jump-squat', { reps: 12 }),
      main('diamond-push-up', { reps: 8 }),
      main('split-squat', { reps: 12 }),
      main('pike-push-up', { reps: 8 }),
      main('plank-up-down', { reps: 12 }),
      main('hollow-hold', { seconds: 30 }),
      main('burpee', { reps: 10 }),
      cool('figure-four-stretch', { seconds: 30 }),
      cool('cobra-stretch', { seconds: 25 }),
    ],
  }),

  defineWorkout({
    id: 'abs-core-a', category: 'abs_core', difficulty: 'beginner',
    en: { name: 'Core Basics', description: 'The four core patterns: brace, flex, rotate and extend.' },
    uk: { name: 'Основи корпусу', description: 'Чотири патерни корпусу: утримання, згинання, ротація і розгинання.' },
    build: ({ warm, main, cool }) => [
      warm('cat-cow', { seconds: 40 }),
      main('dead-bug', { reps: 12 }),
      main('crunch', { reps: 15 }),
      main('heel-touch', { reps: 16 }),
      main('knee-plank', { seconds: 30 }),
      main('superman', { reps: 12 }),
      cool('cobra-stretch', { seconds: 25 }),
      cool('child-pose', { seconds: 30 }),
    ],
  }),

  defineWorkout({
    id: 'abs-core-b', category: 'abs_core', difficulty: 'intermediate',
    en: { name: 'Strong Core', description: 'Anti-rotation, flexion and lower-ab work in one tight circuit.' },
    uk: { name: 'Сильний корпус', description: 'Антиротація, згинання і робота низу преса в одному щільному колі.' },
    build: ({ warm, main, cool }) => [
      warm('cat-cow', { seconds: 30 }),
      warm('torso-twist', { seconds: 30 }),
      main('plank', { seconds: 40 }),
      main('bicycle-crunch', { reps: 20 }),
      main('leg-raise', { reps: 12 }),
      main('russian-twist', { reps: 20 }),
      main('side-plank', { seconds: 25 }),
      main('flutter-kick', { seconds: 30 }),
      cool('cobra-stretch', { seconds: 25 }),
      cool('seated-twist-stretch', { seconds: 25 }),
    ],
  }),

  defineWorkout({
    id: 'legs-glutes', category: 'legs', difficulty: 'intermediate',
    en: { name: 'Legs & Glutes', description: 'Squat and hinge patterns plus direct glute work.' },
    uk: { name: 'Ноги та сідниці', description: 'Присідання, нахили і пряма робота на сідниці.' },
    build: ({ warm, main, cool }) => [
      warm('march-in-place', { seconds: 30 }),
      warm('leg-swing', { seconds: 20 }),
      warm('hip-rotation', { seconds: 30 }),
      main('squat', { reps: 15 }),
      main('reverse-lunge', { reps: 10 }),
      main('glute-bridge', { reps: 16 }),
      main('good-morning', { reps: 12 }),
      main('curtsy-lunge', { reps: 10 }),
      main('fire-hydrant', { reps: 12 }),
      main('wall-sit', { seconds: 40 }),
      main('calf-raise', { reps: 20 }),
      cool('quad-stretch', { seconds: 25 }),
      cool('hamstring-stretch', { seconds: 25 }),
      cool('figure-four-stretch', { seconds: 30 }),
    ],
  }),

  defineWorkout({
    id: 'upper-body', category: 'chest', difficulty: 'intermediate',
    en: { name: 'Upper Body', description: 'Push, press and pull-free back work for chest, shoulders and arms.' },
    uk: { name: 'Верх тіла', description: 'Жими і робота на спину без турніка — груди, плечі й руки.' },
    build: ({ warm, main, cool }) => [
      warm('arm-circle', { seconds: 30 }),
      warm('wall-angel', { reps: 10 }),
      main('push-up', { reps: 10 }),
      main('pike-push-up', { reps: 8 }),
      main('triceps-dip', { reps: 12 }),
      main('reverse-snow-angel', { reps: 12 }),
      main('shoulder-tap', { reps: 20 }),
      main('diamond-push-up', { reps: 8 }),
      cool('chest-stretch', { seconds: 25 }),
      cool('child-pose', { seconds: 30 }),
    ],
  }),

  defineWorkout({
    id: 'cardio-blast', category: 'cardio', difficulty: 'intermediate',
    en: { name: 'Cardio Blast', description: 'Short intervals that get the heart rate up without leaving the room.' },
    uk: { name: 'Кардіо-заряд', description: 'Короткі інтервали, що піднімають пульс, не виходячи з кімнати.' },
    build: ({ warm, main, cool }) => [
      warm('march-in-place', { seconds: 30 }),
      warm('butt-kick', { seconds: 30 }),
      main('jumping-jack', { seconds: 40, rest: 20 }),
      main('high-knees', { seconds: 30, rest: 20 }),
      main('mountain-climber', { seconds: 30, rest: 20 }),
      main('skater-hop', { seconds: 30, rest: 20 }),
      main('squat-thrust', { reps: 12, rest: 25 }),
      main('jumping-jack', { seconds: 40, rest: 20 }),
      main('burpee', { reps: 8, rest: 30 }),
      cool('hamstring-stretch', { seconds: 25 }),
      cool('calf-stretch', { seconds: 25 }),
    ],
  }),

  defineWorkout({
    id: 'express-5', category: 'full_body', difficulty: 'beginner',
    en: { name: '5 Minute Express', description: 'Five minutes, four exercises, no warm-up needed — for the days you almost skipped.' },
    uk: { name: '5-хвилинний експрес', description: 'Пʼять хвилин, чотири вправи, без розминки — для днів, коли ви майже пропустили.' },
    build: ({ main }) => [
      main('march-in-place', { seconds: 30, rest: 10 }),
      main('squat', { reps: 12, rest: 20 }),
      main('knee-push-up', { reps: 10, rest: 20 }),
      main('glute-bridge', { reps: 14, rest: 20 }),
      main('plank', { seconds: 30, rest: 0 }),
    ],
  }),

  defineWorkout({
    id: 'seven-minute', category: 'full_body', difficulty: 'intermediate',
    en: { name: '7 Minute Daily', description: 'A short daily circuit that touches every major pattern.' },
    uk: { name: '7 хвилин щодня', description: 'Коротке щоденне коло, що зачіпає всі основні патерни.' },
    build: ({ main }) => [
      main('jumping-jack', { seconds: 30, rest: 10 }),
      main('wall-sit', { seconds: 30, rest: 10 }),
      main('knee-push-up', { reps: 10, rest: 10 }),
      main('crunch', { reps: 15, rest: 10 }),
      main('squat', { reps: 12, rest: 10 }),
      main('triceps-dip', { reps: 10, rest: 10 }),
      main('plank', { seconds: 30, rest: 10 }),
      main('high-knees', { seconds: 30, rest: 10 }),
      main('reverse-lunge', { reps: 8, rest: 10 }),
      main('side-plank', { seconds: 20, rest: 0 }),
    ],
  }),

  defineWorkout({
    id: 'stretch-flow', category: 'stretching', difficulty: 'beginner',
    en: { name: 'Stretch Flow', description: 'Eight minutes of full-body lengthening — good after training or before bed.' },
    uk: { name: 'Розтяжка', description: 'Вісім хвилин розтягування всього тіла — після тренування або перед сном.' },
    build: ({ main }) => [
      main('cat-cow', { seconds: 40, rest: 5 }),
      main('child-pose', { seconds: 30, rest: 5 }),
      main('hamstring-stretch', { seconds: 25, rest: 5 }),
      main('quad-stretch', { seconds: 25, rest: 5 }),
      main('figure-four-stretch', { seconds: 30, rest: 5 }),
      main('chest-stretch', { seconds: 25, rest: 5 }),
      main('calf-stretch', { seconds: 25, rest: 5 }),
      main('seated-twist-stretch', { seconds: 25, rest: 5 }),
      main('cobra-stretch', { seconds: 25, rest: 0 }),
    ],
  }),

  defineWorkout({
    id: 'mobility-flow', category: 'mobility', difficulty: 'beginner',
    en: { name: 'Mobility Flow', description: 'Joint-by-joint movement to undo a day spent sitting.' },
    uk: { name: 'Мобільність', description: 'Рух суглоб за суглобом, щоб відновитись після дня за столом.' },
    build: ({ main }) => [
      main('neck-roll', { seconds: 20, rest: 5 }),
      main('arm-circle', { seconds: 30, rest: 5 }),
      main('wall-angel', { reps: 10, rest: 5 }),
      main('cat-cow', { seconds: 40, rest: 5 }),
      main('torso-twist', { seconds: 30, rest: 5 }),
      main('hip-rotation', { seconds: 30, rest: 5 }),
      main('leg-swing', { seconds: 20, rest: 5 }),
      main('inchworm', { reps: 6, rest: 0 }),
    ],
  }),

  defineWorkout({
    id: 'warmup-quick', category: 'warm_up', difficulty: 'beginner',
    en: { name: 'Quick Warm-up', description: 'Three minutes to raise your temperature before anything harder.' },
    uk: { name: 'Швидка розминка', description: 'Три хвилини, щоб розігрітись перед складнішим навантаженням.' },
    build: ({ main }) => [
      main('march-in-place', { seconds: 30, rest: 5 }),
      main('arm-circle', { seconds: 30, rest: 5 }),
      main('torso-twist', { seconds: 30, rest: 5 }),
      main('hip-rotation', { seconds: 30, rest: 5 }),
      main('step-jack', { seconds: 40, rest: 0 }),
    ],
  }),

  defineWorkout({
    id: 'beginner-intro', category: 'full_body', difficulty: 'beginner',
    en: { name: 'First Steps', description: 'The gentlest possible start: low reps, long rests, nothing on the floor that is hard to get up from.' },
    uk: { name: 'Перші кроки', description: 'Найлегший можливий старт: мало повторень, довгий відпочинок, нічого складного на підлозі.' },
    build: ({ warm, main, cool }) => [
      warm('march-in-place', { seconds: 30 }),
      warm('arm-circle', { seconds: 30 }),
      main('chair-squat', { reps: 8 }),
      main('wall-push-up', { reps: 10 }),
      main('glute-bridge', { reps: 10 }),
      main('knee-plank', { seconds: 20 }),
      main('calf-raise', { reps: 15 }),
      cool('child-pose', { seconds: 30 }),
      cool('hamstring-stretch', { seconds: 25 }),
    ],
  }),
]

const byId = new Map(WORKOUTS.map((w) => [w.id, w]))

export function getWorkout(id: string): Workout {
  const found = byId.get(id)
  if (!found) throw new Error(`Unknown workout: ${id}`)
  return found
}

export function findWorkout(id: string): Workout | undefined {
  return byId.get(id)
}

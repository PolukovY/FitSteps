import { registerMessages } from '../i18n/registry'
import type { Program, ProgramDay } from './types'

type Overrides = ProgramDay['overrides']

interface ProgramInput {
  id: string
  difficulty: Program['difficulty']
  durationDays: number
  daysPerWeek: number
  accent: Program['accent']
  en: { name: string; goal: string; description: string }
  uk: { name: string; goal: string; description: string }
  days: ProgramDay[]
}

function defineProgram(input: ProgramInput): Program {
  registerMessages('en', {
    [`pg.${input.id}.name`]: input.en.name,
    [`pg.${input.id}.goal`]: input.en.goal,
    [`pg.${input.id}.description`]: input.en.description,
  })
  registerMessages('uk', {
    [`pg.${input.id}.name`]: input.uk.name,
    [`pg.${input.id}.goal`]: input.uk.goal,
    [`pg.${input.id}.description`]: input.uk.description,
  })
  return {
    id: input.id,
    nameKey: `pg.${input.id}.name`,
    goalKey: `pg.${input.id}.goal`,
    descriptionKey: `pg.${input.id}.description`,
    difficulty: input.difficulty,
    durationDays: input.durationDays,
    daysPerWeek: input.daysPerWeek,
    accent: input.accent,
    days: input.days,
  }
}

const rest = (day: number): ProgramDay => ({ day, rest: true })
const train = (day: number, workoutId: string, overrides?: Overrides): ProgramDay => ({
  day, workoutId, overrides,
})

/**
 * Progression lives in this table, not in UI logic: week N of a program
 * simply carries a different set of per-exercise overrides.
 */
const FULL_BODY_PROGRESSION: Overrides[] = [
  { squat: { reps: 10 }, 'knee-push-up': { reps: 6 }, plank: { durationSeconds: 20 }, 'reverse-lunge': { reps: 6 }, 'glute-bridge': { reps: 12 } },
  { squat: { reps: 12 }, 'knee-push-up': { reps: 8 }, plank: { durationSeconds: 30 }, 'reverse-lunge': { reps: 8 }, 'glute-bridge': { reps: 14 } },
  { squat: { reps: 15 }, 'knee-push-up': { reps: 10 }, plank: { durationSeconds: 40 }, 'reverse-lunge': { reps: 10 }, 'glute-bridge': { reps: 16 }, superman: { reps: 12 } },
  { squat: { reps: 18, restSeconds: 30 }, 'knee-push-up': { reps: 12 }, plank: { durationSeconds: 50 }, 'reverse-lunge': { reps: 12 }, 'glute-bridge': { reps: 18 }, superman: { reps: 14 } },
]

const CORE_PROGRESSION: Overrides[] = [
  { plank: { durationSeconds: 25 }, 'bicycle-crunch': { reps: 14 }, 'leg-raise': { reps: 8 }, 'russian-twist': { reps: 14 }, 'side-plank': { durationSeconds: 15 }, 'flutter-kick': { durationSeconds: 20 } },
  { plank: { durationSeconds: 35 }, 'bicycle-crunch': { reps: 18 }, 'leg-raise': { reps: 10 }, 'russian-twist': { reps: 18 }, 'side-plank': { durationSeconds: 20 }, 'flutter-kick': { durationSeconds: 25 } },
  { plank: { durationSeconds: 45, restSeconds: 25 }, 'bicycle-crunch': { reps: 22 }, 'leg-raise': { reps: 14 }, 'russian-twist': { reps: 24 }, 'side-plank': { durationSeconds: 30 }, 'flutter-kick': { durationSeconds: 35 } },
]

const STRENGTH_PROGRESSION: Overrides[] = [
  { 'jump-squat': { reps: 8 }, 'diamond-push-up': { reps: 5 }, 'split-squat': { reps: 8 }, 'pike-push-up': { reps: 5 }, burpee: { reps: 6 }, 'hollow-hold': { durationSeconds: 20 } },
  { 'jump-squat': { reps: 10 }, 'diamond-push-up': { reps: 7 }, 'split-squat': { reps: 10 }, 'pike-push-up': { reps: 7 }, burpee: { reps: 8 }, 'hollow-hold': { durationSeconds: 25 } },
  { 'jump-squat': { reps: 12 }, 'diamond-push-up': { reps: 9 }, 'split-squat': { reps: 12 }, 'pike-push-up': { reps: 9 }, burpee: { reps: 10 }, 'hollow-hold': { durationSeconds: 30 } },
  { 'jump-squat': { reps: 15, restSeconds: 15 }, 'diamond-push-up': { reps: 11 }, 'split-squat': { reps: 14 }, 'pike-push-up': { reps: 11 }, burpee: { reps: 12 }, 'hollow-hold': { durationSeconds: 40 } },
]

/** Week index (0-based) for a 1-based program day. */
const week = (day: number) => Math.floor((day - 1) / 7)

function beginnerStartDays(): ProgramDay[] {
  const plan = ['beginner-intro', 'stretch-flow', 'beginner-intro', null, 'full-body-a', 'mobility-flow', null]
  return Array.from({ length: 14 }, (_, i) => {
    const day = i + 1
    const id = plan[i % 7]
    if (!id) return rest(day)
    const w = week(day)
    return train(day, id, id === 'full-body-a' || id === 'beginner-intro' ? FULL_BODY_PROGRESSION[w] : undefined)
  })
}

function fullBodyStarterDays(): ProgramDay[] {
  // Monday / Wednesday / Friday, alternating the two full-body sessions.
  const trainingDays = [1, 3, 5]
  return Array.from({ length: 28 }, (_, i) => {
    const day = i + 1
    const inWeek = ((day - 1) % 7) + 1
    if (!trainingDays.includes(inWeek)) return rest(day)
    const w = week(day)
    const id = inWeek === 3 && w >= 1 ? 'full-body-b' : 'full-body-a'
    return train(day, id, FULL_BODY_PROGRESSION[w])
  })
}

function strongCoreDays(): ProgramDay[] {
  return Array.from({ length: 21 }, (_, i) => {
    const day = i + 1
    const inWeek = ((day - 1) % 7) + 1
    const w = week(day)
    if (inWeek === 7) return rest(day)
    if (inWeek === 4) return train(day, 'mobility-flow')
    const id = inWeek % 2 === 1 ? 'abs-core-b' : 'abs-core-a'
    return train(day, id, CORE_PROGRESSION[Math.min(w, CORE_PROGRESSION.length - 1)])
  })
}

function homeStrengthDays(): ProgramDay[] {
  const trainingDays = [1, 3, 5, 6]
  return Array.from({ length: 28 }, (_, i) => {
    const day = i + 1
    const inWeek = ((day - 1) % 7) + 1
    if (!trainingDays.includes(inWeek)) return rest(day)
    const w = week(day)
    const id = inWeek === 3 ? 'upper-body' : inWeek === 5 ? 'legs-glutes' : inWeek === 6 ? 'cardio-blast' : 'home-strength'
    return train(day, id, id === 'home-strength' ? STRENGTH_PROGRESSION[w] : undefined)
  })
}

function sevenMinuteDays(): ProgramDay[] {
  return Array.from({ length: 28 }, (_, i) => train(i + 1, 'seven-minute'))
}

export const PROGRAMS: Program[] = [
  defineProgram({
    id: 'beginner-start', difficulty: 'beginner', durationDays: 14, daysPerWeek: 5, accent: 'lime',
    en: {
      name: 'Beginner Start',
      goal: 'Build a regular exercise habit',
      description: 'Two weeks of short, forgiving sessions. The point is showing up, not the numbers.',
    },
    uk: {
      name: 'Старт для початківців',
      goal: 'Сформувати звичку тренуватись',
      description: 'Два тижні коротких і щадних занять. Мета — регулярність, а не цифри.',
    },
    days: beginnerStartDays(),
  }),

  defineProgram({
    id: 'full-body-starter', difficulty: 'intermediate', durationDays: 28, daysPerWeek: 3, accent: 'lime',
    en: {
      name: 'Full Body Starter',
      goal: 'Three full-body sessions a week',
      description: 'Four weeks, three sessions a week, the same movements getting steadily harder.',
    },
    uk: {
      name: 'Все тіло: старт',
      goal: 'Три тренування на все тіло щотижня',
      description: 'Чотири тижні по три тренування: ті самі рухи, які поступово ускладнюються.',
    },
    days: fullBodyStarterDays(),
  }),

  defineProgram({
    id: 'strong-core', difficulty: 'intermediate', durationDays: 21, daysPerWeek: 6, accent: 'cool',
    en: {
      name: 'Strong Core',
      goal: 'Abs, core and lower back',
      description: 'Three weeks of daily core work with one mobility day and one full rest day each week.',
    },
    uk: {
      name: 'Сильний корпус',
      goal: 'Прес, корпус і поперек',
      description: 'Три тижні щоденної роботи над корпусом: один день мобільності та один вихідний на тиждень.',
    },
    days: strongCoreDays(),
  }),

  defineProgram({
    id: 'home-strength', difficulty: 'advanced', durationDays: 28, daysPerWeek: 4, accent: 'hot',
    en: {
      name: 'Home Strength',
      goal: 'Build strength with no equipment',
      description: 'Four weeks, four sessions a week, split between hard full-body days, upper, legs and cardio.',
    },
    uk: {
      name: 'Домашня сила',
      goal: 'Розвинути силу без інвентарю',
      description: 'Чотири тижні по чотири тренування: важкі дні на все тіло, верх, ноги і кардіо.',
    },
    days: homeStrengthDays(),
  }),

  defineProgram({
    id: 'seven-minute-daily', difficulty: 'beginner', durationDays: 28, daysPerWeek: 7, accent: 'violet',
    en: {
      name: '7 Minute Daily',
      goal: 'One short session, every day',
      description: 'The same seven-minute circuit every day for four weeks. Consistency over intensity.',
    },
    uk: {
      name: '7 хвилин щодня',
      goal: 'Одне коротке тренування щодня',
      description: 'Те саме семихвилинне коло щодня протягом чотирьох тижнів. Регулярність важливіша за інтенсивність.',
    },
    days: sevenMinuteDays(),
  }),
]

const byId = new Map(PROGRAMS.map((p) => [p.id, p]))

export function getProgram(id: string): Program {
  const found = byId.get(id)
  if (!found) throw new Error(`Unknown program: ${id}`)
  return found
}

export function findProgram(id: string): Program | undefined {
  return byId.get(id)
}

export function programDay(program: Program, day: number): ProgramDay | undefined {
  return program.days.find((d) => d.day === day)
}

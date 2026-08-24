/**
 * Data and engine integrity check. Runs the real modules, so a missing
 * translation, a workout pointing at a deleted exercise or an animation
 * without a rig fails here rather than in front of someone mid-squat.
 */
import '../src/i18n/bootstrap'
import { EXERCISES, alternativesFor, findExercise } from '../src/data/exercises'
import { PROGRAMS } from '../src/data/programs'
import { WORKOUTS, findWorkout } from '../src/data/workouts'
import { RIGS } from '../src/components/figure/rigs'
import { buildSteps, muscleLoadOf, musclesOf, replaceStep, totalSeconds } from '../src/engine/session'
import { samplePose, buildSkeleton } from '../src/components/figure/kinematics'
import { missingKeys, translate } from '../src/i18n/registry'
import { currentStreak, longestStreak } from '../src/lib/streak'
import { addDays, dayKey } from '../src/lib/dates'
import type { Locale } from '../src/data/types'

const failures: string[] = []
const check = (condition: boolean, message: string) => {
  if (!condition) failures.push(message)
}

const LOCALES: Locale[] = ['en', 'uk']

// Every English key must exist in Ukrainian; a fallback to English in a
// Ukrainian UI is a bug, not a graceful degradation.
for (const key of missingKeys('uk')) {
  failures.push(`missing Ukrainian translation for "${key}"`)
}

// Every exercise resolves its own copy in both languages.
for (const exercise of EXERCISES) {
  const keys = [
    exercise.nameKey, exercise.descriptionKey, exercise.instructionsKey, exercise.startingPositionKey,
    exercise.breathingKey, exercise.commonMistakesKey, exercise.safetyTipsKey, exercise.rangeOfMotionKey,
    ...exercise.coachingCueKeys,
  ].filter((k): k is string => Boolean(k))

  for (const locale of LOCALES) {
    for (const key of keys) {
      const text = translate(locale, key)
      check(text !== key, `${exercise.id}: missing ${locale} copy for ${key}`)
    }
  }

  check(exercise.coachingCueKeys.length > 0, `${exercise.id}: no coaching cues`)
  check(Boolean(RIGS[exercise.animationAsset]), `${exercise.id}: no rig "${exercise.animationAsset}"`)
  check(exercise.primaryMuscles.length > 0, `${exercise.id}: no primary muscles`)

  for (const id of [exercise.easierAlternativeId, exercise.harderAlternativeId, ...(exercise.alternativeIds ?? [])]) {
    if (id) check(Boolean(findExercise(id)), `${exercise.id}: alternative "${id}" does not exist`)
  }

  const timed = exercise.type === 'timer' || exercise.type === 'hold'
  check(
    timed ? exercise.defaultDurationSeconds != null : exercise.defaultReps != null || exercise.defaultDurationSeconds != null,
    `${exercise.id}: missing a default target for type ${exercise.type}`,
  )
}

check(EXERCISES.length >= 50, `library has ${EXERCISES.length} exercises, spec asks for at least 50`)

// Every rig produces finite geometry across its whole cycle.
for (const [id, rig] of Object.entries(RIGS)) {
  for (let i = 0; i <= 20; i += 1) {
    const skeleton = buildSkeleton(samplePose(rig, i / 20), rig.view)
    const points = [
      skeleton.hip, skeleton.shoulder, skeleton.headCenter,
      skeleton.nearArm.c, skeleton.farArm.c, skeleton.nearLeg.c, skeleton.farLeg.c,
    ]
    for (const [x, y] of points) {
      check(Number.isFinite(x) && Number.isFinite(y), `rig ${id}: non-finite point at t=${i / 20}`)
      check(x > -80 && x < 280 && y > -80 && y < 340, `rig ${id}: point (${x.toFixed(0)}, ${y.toFixed(0)}) far outside frame`)
    }
  }
}

// Workouts reference real exercises, have sane durations and translate.
for (const workout of WORKOUTS) {
  for (const locale of LOCALES) {
    check(translate(locale, workout.nameKey) !== workout.nameKey, `${workout.id}: missing ${locale} name`)
    check(translate(locale, workout.descriptionKey) !== workout.descriptionKey, `${workout.id}: missing ${locale} description`)
  }
  check(workout.steps.length > 0, `${workout.id}: no steps`)
  for (const step of workout.steps) {
    check(Boolean(findExercise(step.exerciseId)), `${workout.id}: unknown exercise "${step.exerciseId}"`)
  }
  const minutes = totalSeconds(buildSteps(workout)) / 60
  check(minutes >= 3 && minutes <= 45, `${workout.id}: implausible duration ${minutes.toFixed(1)} min`)
  check(workout.estimatedKcal > 0, `${workout.id}: no calorie estimate`)
}

// Programs cover every day exactly once and only point at real workouts.
for (const program of PROGRAMS) {
  for (const locale of LOCALES) {
    check(translate(locale, program.nameKey) !== program.nameKey, `${program.id}: missing ${locale} name`)
    check(translate(locale, program.goalKey) !== program.goalKey, `${program.id}: missing ${locale} goal`)
  }
  check(program.days.length === program.durationDays, `${program.id}: ${program.days.length} days for a ${program.durationDays}-day program`)
  const seen = new Set<number>()
  for (const day of program.days) {
    check(!seen.has(day.day), `${program.id}: duplicate day ${day.day}`)
    seen.add(day.day)
    if (day.workoutId) {
      check(Boolean(findWorkout(day.workoutId)), `${program.id} day ${day.day}: unknown workout "${day.workoutId}"`)
    } else {
      check(day.rest === true, `${program.id} day ${day.day}: neither a workout nor a rest day`)
    }
    for (const id of Object.keys(day.overrides ?? {})) {
      check(Boolean(findExercise(id)), `${program.id} day ${day.day}: override for unknown exercise "${id}"`)
    }
  }
  const trainingDays = program.days.filter((d) => !d.rest).length
  check(trainingDays > 0, `${program.id}: no training days`)
}

// Progression must actually progress: later weeks are not easier.
const fullBody = PROGRAMS.find((p) => p.id === 'full-body-starter')!
const squatReps = [1, 2, 3, 4].map((week) => {
  const day = fullBody.days.find((d) => d.workoutId && Math.floor((d.day - 1) / 7) === week - 1)
  return day?.overrides?.squat?.reps ?? 0
})
check(
  squatReps.every((reps, i) => i === 0 || reps > squatReps[i - 1]),
  `full-body-starter: squat reps do not increase week over week (${squatReps.join(', ')})`,
)

// Engine behaviour.
const sample = WORKOUTS.find((w) => w.id === 'full-body-a')!
const withExtras = buildSteps(sample)
const mainOnly = buildSteps(sample, { includeWarmup: false, includeCooldown: false })
check(mainOnly.length < withExtras.length, 'buildSteps: warm-up/cool-down toggles have no effect')
check(mainOnly.every((s) => s.block === 'main'), 'buildSteps: filtered steps still contain warm-up or cool-down')

const overridden = buildSteps(sample, { overrides: { squat: { reps: 42 } } })
check(overridden.find((s) => s.exerciseId === 'squat')?.reps === 42, 'buildSteps: overrides not applied')

const perSide = buildSteps(sample).find((s) => s.exerciseId === 'reverse-lunge')
check(perSide?.sides === 2, 'buildSteps: per-side exercise not marked with two sides')

const swapped = replaceStep(withExtras, 3, 'wall-push-up')
check(swapped[3].exerciseId === 'wall-push-up', 'replaceStep: exercise not swapped')
check(swapped.length === withExtras.length, 'replaceStep: step count changed')
check(swapped[0].exerciseId === withExtras[0].exerciseId, 'replaceStep: mutated a different step')

const load = muscleLoadOf(withExtras)
check(Object.keys(load).length > 4, 'muscleLoadOf: implausibly few muscles loaded')
check(Object.values(load).every((v) => (v ?? 0) > 0), 'muscleLoadOf: non-positive load recorded')

const muscles = musclesOf(withExtras)
check(muscles.primary.length > 0, 'musclesOf: no primary muscles')
check(
  muscles.primary.every((m) => !muscles.secondary.includes(m)),
  'musclesOf: a muscle is both primary and secondary',
)

check(alternativesFor(findExercise('push-up')!).length >= 2, 'alternativesFor: push-up should offer swaps')

// Streaks are calendar arithmetic; check the boundaries that actually bite.
const today = dayKey()
check(currentStreak([]) === 0, 'currentStreak: empty history is not zero')
check(currentStreak([today]) === 1, 'currentStreak: today alone is not 1')
check(currentStreak([addDays(today, -1), addDays(today, -2)]) === 2, 'currentStreak: yesterday-anchored run miscounted')
check(currentStreak([addDays(today, -2)]) === 0, 'currentStreak: a lapsed run still counts')
check(currentStreak([today, today]) === 1, 'currentStreak: duplicate days double-counted')
check(
  longestStreak([addDays(today, -9), addDays(today, -8), addDays(today, -7), addDays(today, -3)]) === 3,
  'longestStreak: historic run miscounted',
)

if (failures.length) {
  console.error(`\n${failures.length} problem(s):\n`)
  for (const failure of failures) console.error(`  ✗ ${failure}`)
  process.exit(1)
}

console.log(
  `ok — ${EXERCISES.length} exercises, ${Object.keys(RIGS).length} rigs, ${WORKOUTS.length} workouts, ${PROGRAMS.length} programs, both locales complete`,
)

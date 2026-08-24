import { registerMessages } from '../i18n/registry'
import type { Exercise, Locale } from './types'

export interface ExerciseCopy {
  name: string
  description: string
  startingPosition: string
  instructions: string
  breathing?: string
  rangeOfMotion?: string
  /** Rendered as a list; stored as one key so the model keeps its `...Key` shape. */
  commonMistakes?: string[]
  safetyTips?: string
  cues: string[]
}

type ExerciseSpec = Omit<
  Exercise,
  | 'nameKey' | 'descriptionKey' | 'instructionsKey' | 'startingPositionKey'
  | 'breathingKey' | 'commonMistakesKey' | 'safetyTipsKey' | 'rangeOfMotionKey'
  | 'coachingCueKeys' | 'equipment'
>

/**
 * Keeps the spec's key-based model while letting each exercise's copy live
 * next to its definition — the alternative is 50 exercises smeared across
 * two giant translation files that drift apart.
 */
export function defineExercise(
  spec: ExerciseSpec,
  copy: Record<Locale, ExerciseCopy>,
): Exercise {
  const p = `ex.${spec.id}`
  const cueCount = copy.en.cues.length

  for (const locale of ['en', 'uk'] as Locale[]) {
    const c = copy[locale]
    const messages: Record<string, string> = {
      [`${p}.name`]: c.name,
      [`${p}.description`]: c.description,
      [`${p}.startingPosition`]: c.startingPosition,
      [`${p}.instructions`]: c.instructions,
    }
    if (c.breathing) messages[`${p}.breathing`] = c.breathing
    if (c.rangeOfMotion) messages[`${p}.rangeOfMotion`] = c.rangeOfMotion
    if (c.commonMistakes?.length) messages[`${p}.commonMistakes`] = c.commonMistakes.join('\n')
    if (c.safetyTips) messages[`${p}.safetyTips`] = c.safetyTips
    c.cues.forEach((cue, i) => {
      messages[`${p}.cue.${i}`] = cue
    })
    registerMessages(locale, messages)
  }

  return {
    ...spec,
    nameKey: `${p}.name`,
    descriptionKey: `${p}.description`,
    startingPositionKey: `${p}.startingPosition`,
    instructionsKey: `${p}.instructions`,
    breathingKey: copy.en.breathing ? `${p}.breathing` : undefined,
    rangeOfMotionKey: copy.en.rangeOfMotion ? `${p}.rangeOfMotion` : undefined,
    commonMistakesKey: copy.en.commonMistakes?.length ? `${p}.commonMistakes` : undefined,
    safetyTipsKey: copy.en.safetyTips ? `${p}.safetyTips` : undefined,
    coachingCueKeys: Array.from({ length: cueCount }, (_, i) => `${p}.cue.${i}`),
    equipment: 'none',
  }
}

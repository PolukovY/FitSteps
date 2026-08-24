import { useCallback, useRef } from 'react'
import { getExercise } from '../data/exercises'
import { translate } from '../i18n/registry'
import { useSettings } from '../store/useAppStore'
import { haptics } from './haptics'
import { getVoiceProvider } from './voice'
import { sounds } from './sound'
import type { RuntimeStep } from './session'
import type { SessionEvent } from './useWorkoutSession'

/**
 * Turns engine events into voice, sound and vibration. Kept separate from the
 * engine so the workout logic stays testable and silent by default.
 */
export function useCoach(steps: RuntimeStep[]) {
  const { locale, voiceCoach, sound, vibration } = useSettings()
  const settings = useRef({ locale, voiceCoach, sound, vibration })
  settings.current = { locale, voiceCoach, sound, vibration }

  const speakText = useCallback((key: string, text: string) => {
    const s = settings.current
    if (!s.voiceCoach) return
    getVoiceProvider().speak({ key, text }, s.locale)
  }, [])

  const say = useCallback(
    (key: string, vars?: Record<string, string | number>) => {
      speakText(key, translate(settings.current.locale, key, vars))
    },
    [speakText],
  )

  const announce = useCallback(
    (step: RuntimeStep) => {
      const exercise = getExercise(step.exerciseId)
      const s = settings.current
      const name = translate(s.locale, exercise.nameKey)
      const target = step.durationSeconds
        ? translate(s.locale, 'voice.seconds', { count: Math.round(step.durationSeconds) })
        : translate(s.locale, step.sides > 1 ? 'voice.eachSide' : 'voice.reps', { count: step.reps ?? 0 })
      // One utterance, not two: a second speak() cancels the first mid-word.
      speakText('voice.announce', `${translate(s.locale, 'voice.nextExercise', { name })} ${target}`)
    },
    [speakText],
  )

  return useCallback(
    (event: SessionEvent) => {
      const s = settings.current
      switch (event.type) {
        case 'countdown-start':
          announce(steps[event.index])
          break
        case 'tick-countdown':
          if (s.sound) sounds.countdownTick()
          if (s.vibration) haptics.tick()
          break
        case 'exercise-start':
          if (s.sound) sounds.countdownGo()
          if (s.vibration) haptics.go()
          if (event.side && event.side > 1) say('voice.go')
          break
        case 'exercise-halfway':
          say('voice.halfway')
          break
        case 'exercise-final-five':
          say('voice.fiveSeconds')
          break
        case 'exercise-done':
          if (s.sound) sounds.exerciseDone()
          if (s.vibration) haptics.done()
          break
        case 'switch-side':
          say('voice.eachSide', { count: steps[event.index]?.reps ?? 0 })
          break
        case 'rest-start': {
          if (s.sound) sounds.restStart()
          if (s.vibration) haptics.rest()
          const next = steps[event.index + 1]
          if (next) {
            const name = translate(s.locale, getExercise(next.exerciseId).nameKey)
            speakText(
              'voice.restThenNext',
              `${translate(s.locale, 'voice.rest')} ${translate(s.locale, 'voice.nextExercise', { name })}`,
            )
          }
          break
        }
        case 'workout-complete':
          if (s.sound) sounds.workoutComplete()
          if (s.vibration) haptics.complete()
          say('voice.workoutComplete')
          break
        default:
          break
      }
    },
    [announce, say, speakText, steps],
  )
}

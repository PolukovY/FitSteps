import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { isTimed, replaceStep, type RuntimeStep } from './session'

export type Phase = 'countdown' | 'exercise' | 'switch' | 'rest' | 'finished'

export interface SessionEvent {
  type:
    | 'countdown-start'
    | 'exercise-start'
    | 'exercise-halfway'
    | 'exercise-final-five'
    | 'exercise-done'
    | 'switch-side'
    | 'rest-start'
    | 'rest-final-five'
    | 'tick-countdown'
    | 'workout-complete'
  index: number
  side?: number
  value?: number
}

interface Options {
  steps: RuntimeStep[]
  /** 3-2-1 before each exercise; off makes transitions immediate. */
  countdown?: boolean
  onEvent?: (event: SessionEvent) => void
}

const COUNTDOWN_SECONDS = 3
const SWITCH_SECONDS = 5

/**
 * The workout state machine. Everything time-based is derived from a single
 * deadline timestamp rather than a decrementing counter, so a backgrounded
 * tab, a locked screen or a throttled timer cannot drift the workout.
 */
export function useWorkoutSession({ steps: initialSteps, countdown = true, onEvent }: Options) {
  const [steps, setSteps] = useState(initialSteps)
  const [index, setIndex] = useState(0)
  const [side, setSide] = useState(1)
  const [phase, setPhase] = useState<Phase>(countdown ? 'countdown' : 'exercise')
  const [repsDone, setRepsDone] = useState(0)
  const [paused, setPaused] = useState(false)
  const [remaining, setRemaining] = useState(countdown ? COUNTDOWN_SECONDS : 0)

  const deadline = useRef<number | null>(null)
  const pausedRemaining = useRef<number | null>(null)
  const startedAt = useRef(Date.now())
  const fired = useRef<Set<string>>(new Set())
  const emit = useRef(onEvent)
  emit.current = onEvent

  const step = steps[index]
  const total = steps.length

  const fire = useCallback((event: SessionEvent) => {
    emit.current?.(event)
  }, [])

  const startPhase = useCallback(
    (next: Phase, seconds: number | null, opts: { index?: number; side?: number } = {}) => {
      const i = opts.index ?? index
      fired.current = new Set()
      setPhase(next)
      if (opts.index != null) setIndex(opts.index)
      if (opts.side != null) setSide(opts.side)
      if (seconds == null) {
        deadline.current = null
        setRemaining(0)
      } else {
        deadline.current = Date.now() + seconds * 1000
        setRemaining(seconds)
      }
      if (next === 'countdown') fire({ type: 'countdown-start', index: i })
      if (next === 'exercise') fire({ type: 'exercise-start', index: i, side: opts.side ?? side })
      if (next === 'switch') fire({ type: 'switch-side', index: i })
      if (next === 'rest') fire({ type: 'rest-start', index: i })
      if (next === 'finished') fire({ type: 'workout-complete', index: i })
    },
    [fire, index, side],
  )

  const beginStep = useCallback(
    (nextIndex: number) => {
      setRepsDone(0)
      if (nextIndex >= steps.length) {
        startPhase('finished', null, { index: steps.length - 1 })
        return
      }
      const next = steps[nextIndex]
      if (countdown) {
        startPhase('countdown', COUNTDOWN_SECONDS, { index: nextIndex, side: 1 })
      } else {
        startPhase('exercise', isTimed(next) ? next.durationSeconds! : null, { index: nextIndex, side: 1 })
      }
    },
    [countdown, startPhase, steps],
  )

  /** Finishing the work portion: either switch sides, rest, or move on. */
  const completeWork = useCallback(() => {
    if (!step) return
    fire({ type: 'exercise-done', index })
    if (side < step.sides) {
      startPhase('switch', SWITCH_SECONDS)
      return
    }
    const isLast = index >= steps.length - 1
    if (isLast) {
      startPhase('finished', null)
      return
    }
    if (step.restSeconds > 0) {
      startPhase('rest', step.restSeconds)
    } else {
      beginStep(index + 1)
    }
  }, [beginStep, fire, index, side, startPhase, step, steps.length])

  // The initial phase is armed here rather than in useState: the ticking loop
  // works off `deadline`, and a phase whose deadline was never set would sit
  // frozen forever on the first exercise.
  useEffect(() => {
    if (deadline.current != null || phase === 'finished') return
    const first = steps[0]
    if (!first) return
    startPhase(
      countdown ? 'countdown' : 'exercise',
      countdown ? COUNTDOWN_SECONDS : (isTimed(first) ? first.durationSeconds! : null),
      { index: 0, side: 1 },
    )
    // Mount only: later phases arm themselves through startPhase.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Single ticking loop. Phase transitions are decided from the deadline, so
  // the UI can re-render at any rate without affecting workout timing.
  useEffect(() => {
    if (paused) return
    const id = window.setInterval(() => {
      if (deadline.current == null) return
      const left = Math.max(0, (deadline.current - Date.now()) / 1000)
      setRemaining(left)

      const mark = (key: string) => {
        if (fired.current.has(key)) return false
        fired.current.add(key)
        return true
      }

      if (phase === 'countdown') {
        const whole = Math.ceil(left)
        if (whole > 0 && mark(`cd-${whole}`)) fire({ type: 'tick-countdown', index, value: whole })
        if (left <= 0) {
          const current = steps[index]
          startPhase('exercise', isTimed(current) ? current.durationSeconds! : null)
        }
        return
      }

      if (phase === 'exercise' && deadline.current) {
        const duration = steps[index]?.durationSeconds ?? 0
        if (duration >= 20 && left <= duration / 2 && mark('half')) {
          fire({ type: 'exercise-halfway', index })
        }
        if (left <= 5 && left > 0 && mark('five')) fire({ type: 'exercise-final-five', index })
        if (left <= 0) completeWork()
        return
      }

      if (phase === 'switch' && left <= 0) {
        const current = steps[index]
        startPhase('exercise', isTimed(current) ? current.durationSeconds! : null, { side: side + 1 })
        return
      }

      if (phase === 'rest') {
        if (left <= 5 && left > 0 && mark('rest-five')) fire({ type: 'rest-final-five', index })
        if (left <= 0) beginStep(index + 1)
      }
    }, 100)
    return () => window.clearInterval(id)
  }, [beginStep, completeWork, fire, index, paused, phase, side, startPhase, steps])

  const togglePause = useCallback(() => {
    setPaused((was) => {
      if (was) {
        if (pausedRemaining.current != null) {
          deadline.current = Date.now() + pausedRemaining.current
          pausedRemaining.current = null
        }
        return false
      }
      if (deadline.current != null) pausedRemaining.current = deadline.current - Date.now()
      return true
    })
  }, [])

  const addRep = useCallback(() => {
    if (!step || isTimed(step)) return
    setRepsDone((done) => {
      const target = step.reps ?? 0
      if (done + 1 >= target) {
        // Defer so the counter paints its final value before the transition.
        window.setTimeout(completeWork, 0)
        return target
      }
      return done + 1
    })
  }, [completeWork, step])

  const actions = useMemo(
    () => ({
      /** The Done button: rep exercises complete immediately, timers finish early. */
      complete: completeWork,
      addRep,
      next: () => beginStep(Math.min(index + 1, steps.length)),
      previous: () => beginStep(Math.max(0, index - 1)),
      skipRest: () => beginStep(index + 1),
      addRest: (seconds: number) => {
        if (deadline.current == null) return
        deadline.current += seconds * 1000
        setRemaining((deadline.current - Date.now()) / 1000)
      },
      togglePause,
      replace: (exerciseId: string) => {
        setSteps((current) => {
          const updated = replaceStep(current, index, exerciseId)
          const next = updated[index]
          setRepsDone(0)
          setSide(1)
          startPhase(countdown ? 'countdown' : 'exercise', countdown ? COUNTDOWN_SECONDS : (next.durationSeconds ?? null))
          return updated
        })
      },
    }),
    [addRep, beginStep, completeWork, countdown, index, startPhase, steps.length, togglePause],
  )

  const elapsedSeconds = useCallback(() => Math.round((Date.now() - startedAt.current) / 1000), [])

  return {
    steps,
    step,
    index,
    total,
    side,
    phase,
    remaining,
    repsDone,
    paused,
    actions,
    elapsedSeconds,
    startedAt: startedAt.current,
  }
}

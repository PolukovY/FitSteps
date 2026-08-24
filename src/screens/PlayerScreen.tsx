import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { MuscleMap } from '../components/MuscleMap'
import {
  CheckIcon, ChevronLeft, ChevronRight, CloseIcon, PauseIcon, PlayIcon, PlusIcon,
  SkipIcon, SoundOffIcon, SoundOnIcon, SparkIcon, SwapIcon,
} from '../components/icons'
import { Pill, Sheet } from '../components/ui'
import { alternativesFor, getExercise } from '../data/exercises'
import { estimateKcal, getWorkout } from '../data/workouts'
import { isTimed, muscleLoadOf } from '../engine/session'
import { useCoach } from '../engine/useCoach'
import { useWorkoutSession } from '../engine/useWorkoutSession'
import { useT } from '../i18n'
import { dayKey, formatClock } from '../lib/dates'
import { useProgress, useSettings } from '../store/useAppStore'
import { useSession } from '../store/useSessionStore'
import './player.css'

const CUE_INTERVAL_MS = 6000

export function PlayerScreen() {
  const t = useT()
  const navigate = useNavigate()
  const pending = useSession((s) => s.pending)
  const finish = useSession((s) => s.finish)
  const addWorkout = useProgress((s) => s.addWorkout)
  const advanceProgram = useProgress((s) => s.advanceProgram)
  const { countdown, sound, toggle } = useSettings()

  const steps = pending?.steps ?? []
  const coach = useCoach(steps)
  const session = useWorkoutSession({ steps, countdown, onEvent: coach })
  const [showQuit, setShowQuit] = useState(false)
  const [showReplace, setShowReplace] = useState(false)
  const [cueIndex, setCueIndex] = useState(0)

  const step = session.step
  const exercise = step ? getExercise(step.exerciseId) : undefined

  // Cues rotate so the screen carries one short instruction, never a paragraph.
  useEffect(() => {
    setCueIndex(0)
    if (!exercise || exercise.coachingCueKeys.length < 2) return
    const id = window.setInterval(
      () => setCueIndex((i) => (i + 1) % exercise.coachingCueKeys.length),
      CUE_INTERVAL_MS,
    )
    return () => window.clearInterval(id)
  }, [exercise])

  const remainingSeconds = useMemo(() => {
    let total = 0
    session.steps.forEach((s, i) => {
      if (i < session.index) return
      total += (s.durationSeconds ? s.durationSeconds * s.sides : (s.reps ?? 10) * 3 * s.sides) + s.restSeconds
    })
    return total
  }, [session.index, session.steps])

  useEffect(() => {
    if (session.phase !== 'finished' || !pending) return
    const durationSeconds = session.elapsedSeconds()
    const workout = getWorkout(pending.workoutId)
    const entry = {
      id: `${pending.workoutId}-${Date.now()}`,
      workoutId: pending.workoutId,
      programId: pending.programId,
      date: dayKey(),
      finishedAt: Date.now(),
      durationSeconds,
      exerciseCount: session.steps.length,
      kcal: estimateKcal(
        session.steps.map((s) => ({
          exerciseId: s.exerciseId,
          block: s.block,
          reps: s.reps,
          durationSeconds: s.durationSeconds,
          restSeconds: s.restSeconds,
        })),
        workout.category,
      ),
      muscleLoad: muscleLoadOf(session.steps),
    }
    addWorkout(entry)
    if (pending.programId && pending.programDay) advanceProgram(pending.programDay)
    finish({ ...entry, programDay: pending.programDay })
    navigate('/complete', { replace: true })
  }, [addWorkout, advanceProgram, finish, navigate, pending, session])

  if (!pending || !step || !exercise) {
    navigate('/', { replace: true })
    return null
  }

  const timed = isTimed(step)
  const isRest = session.phase === 'rest'
  const isCountdown = session.phase === 'countdown'
  const isSwitch = session.phase === 'switch'
  const nextStep = session.steps[session.index + 1]
  const nextExercise = nextStep ? getExercise(nextStep.exerciseId) : undefined
  const alternatives = alternativesFor(exercise)

  if (isRest && nextExercise && nextStep) {
    return (
      <RestView
        seconds={session.remaining}
        totalSeconds={step.restSeconds}
        index={session.index + 1}
        total={session.total}
        remainingClock={formatClock(remainingSeconds)}
        nextName={t(nextExercise.nameKey)}
        nextTarget={
          nextStep.durationSeconds
            ? `${nextStep.durationSeconds} ${t('time.sec')}`
            : `${nextStep.reps} ${t('player.reps')}`
        }
        nextMuscles={nextExercise.primaryMuscles.map((m) => t(`muscle.${m}`)).join(' · ')}
        nextRig={nextExercise.animationAsset}
        onAdd={() => session.actions.addRest(10)}
        onSkip={session.actions.skipRest}
      />
    )
  }

  return (
    <div className="player">
      <header className="player-head col">
        <div className="player-progress">
          {session.steps.map((s, i) => (
            <span
              key={`${s.exerciseId}-${i}`}
              className={`player-seg${i < session.index ? ' done' : ''}${i === session.index ? ' current' : ''}`}
            />
          ))}
        </div>
        <div className="row between">
          <div className="row" style={{ gap: 10 }}>
            <button className="icon-btn" onClick={() => setShowQuit(true)} aria-label={t('player.quit')}>
              <CloseIcon />
            </button>
            <span className="player-counter">
              {t('player.exerciseOf', { current: session.index + 1, total: session.total })}
            </span>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="icon-btn" onClick={() => toggle('sound')} aria-label={t('settings.sound')}>
              {sound ? <SoundOnIcon /> : <SoundOffIcon />}
            </button>
            <button className="icon-btn" onClick={session.actions.togglePause} aria-label={t('player.pause')}>
              {session.paused ? <PlayIcon size={16} /> : <PauseIcon size={16} />}
            </button>
          </div>
        </div>
      </header>

      <div className="player-stage">
        <span className="player-block">{t(`player.block${step.block === 'warmup' ? 'Warmup' : step.block === 'cooldown' ? 'Cooldown' : 'Main'}`)}</span>
        {exercise.tempo && <span className="player-tempo">{t('player.tempo')} {exercise.tempo.replace(/-/g, '·')}</span>}
        <ExerciseFigure
          rig={exercise.animationAsset}
          size={268}
          playing={!session.paused && !isCountdown}
          speed={isCountdown ? 0.6 : 1}
        />
        {isCountdown && (
          <div className="player-countdown">
            <span className="d player-countdown-num" key={Math.ceil(session.remaining)}>
              {Math.ceil(session.remaining) || t('player.go')}
            </span>
            <span className="player-countdown-label">{t('player.getReady')}</span>
          </div>
        )}
        {isSwitch && (
          <div className="player-countdown">
            <span className="d player-switch">{t('player.eachSide')}</span>
            <span className="player-countdown-label">{Math.ceil(session.remaining)}</span>
          </div>
        )}
        {session.paused && !isCountdown && (
          <div className="player-paused"><span className="d">{t('player.pause')}</span></div>
        )}
      </div>

      <div className="row between player-title-row">
        <div className="col" style={{ gap: 3 }}>
          <h1 className="d player-name">{t(exercise.nameKey)}</h1>
          {step.sides > 1 && (
            <span className="muted">{t('player.eachSide')} · {session.side}/{step.sides}</span>
          )}
        </div>
        <div className="player-target col">
          {timed ? (
            <span className="d player-target-value">
              {/* During the countdown `remaining` belongs to the countdown, not the exercise. */}
              {formatClock(isCountdown || isSwitch ? (step.durationSeconds ?? 0) : session.remaining)}
            </span>
          ) : (
            <span className="d player-target-value">
              {session.repsDone}
              <span className="player-target-sub">/{step.reps}</span>
            </span>
          )}
          <span className="label">{timed ? t('time.sec') : t('player.reps')}</span>
        </div>
      </div>

      <button className="player-cue row" onClick={() => setCueIndex((i) => i + 1)}>
        <SparkIcon />
        <span>{t(exercise.coachingCueKeys[cueIndex % exercise.coachingCueKeys.length])}</span>
      </button>

      <div className="card player-muscles row">
        <div className="row" style={{ gap: 8 }}>
          <MuscleMap side="front" primary={exercise.primaryMuscles} secondary={exercise.secondaryMuscles} width={58} />
          <MuscleMap side="back" primary={exercise.primaryMuscles} secondary={exercise.secondaryMuscles} width={58} />
        </div>
        <div className="col grow" style={{ gap: 10 }}>
          <div className="col" style={{ gap: 5 }}>
            <span className="label" style={{ color: 'var(--accent)' }}>{t('detail.primary')}</span>
            <div className="player-tags">
              {exercise.primaryMuscles.map((m) => (
                <span key={m} className="pill pill-accent">{t(`muscle.${m}`)}</span>
              ))}
            </div>
          </div>
          {exercise.secondaryMuscles.length > 0 && (
            <div className="col" style={{ gap: 5 }}>
              <span className="label">{t('detail.secondary')}</span>
              <div className="player-tags">
                {exercise.secondaryMuscles.slice(0, 3).map((m) => (
                  <span key={m} className="pill pill-outline">{t(`muscle.${m}`)}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="player-controls col">
        <div className="row" style={{ gap: 12 }}>
          <button
            className="player-side-btn"
            onClick={session.actions.previous}
            disabled={session.index === 0}
            aria-label={t('player.previous')}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="btn btn-primary grow"
            onClick={timed ? session.actions.complete : session.actions.addRep}
          >
            {timed ? <><CheckIcon /> {t('player.done')}</> : <>{t('player.done')} {session.repsDone + 1}/{step.reps}</>}
          </button>
          <button className="player-side-btn" onClick={session.actions.next} aria-label={t('player.next')}>
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="row player-links">
          {exercise.easierAlternativeId && (
            <button onClick={() => session.actions.replace(exercise.easierAlternativeId!)}>
              {t('player.tooDifficult')} <b>{t('player.easierVersion')}</b>
            </button>
          )}
          <span className="player-dot" />
          <button className="row" style={{ gap: 6 }} onClick={() => setShowReplace(true)}>
            <SwapIcon /> {t('player.replace')}
          </button>
        </div>
      </div>

      {showReplace && (
        <Sheet onClose={() => setShowReplace(false)}>
          <div className="col" style={{ gap: 4, marginBottom: 14 }}>
            <span className="d player-sheet-title">{t('player.replaceTitle')}</span>
            <span className="muted">{t('player.replaceReason')}</span>
          </div>
          <div className="col" style={{ gap: 8 }}>
            {alternatives.map((alt) => (
              <button
                key={alt.id}
                className="card row player-alt"
                onClick={() => {
                  session.actions.replace(alt.id)
                  setShowReplace(false)
                }}
              >
                <div className="player-alt-thumb">
                  <ExerciseFigure rig={alt.animationAsset} size={54} speed={0.7} />
                </div>
                <div className="col grow" style={{ gap: 3 }}>
                  <span className="player-alt-name">{t(alt.nameKey)}</span>
                  <span className="muted">{t(`difficulty.${alt.difficulty}`)}</span>
                </div>
                <ChevronRight />
              </button>
            ))}
          </div>
        </Sheet>
      )}

      {showQuit && (
        <Sheet onClose={() => setShowQuit(false)}>
          <span className="d player-sheet-title">{t('player.quitConfirm')}</span>
          <div className="col" style={{ gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary btn-block" onClick={() => setShowQuit(false)}>
              {t('player.quitKeep')}
            </button>
            <button
              className="btn btn-ghost btn-block"
              onClick={() => {
                useSession.getState().clear()
                navigate('/', { replace: true })
              }}
            >
              {t('player.quitEnd')}
            </button>
          </div>
        </Sheet>
      )}
    </div>
  )
}

function RestView({
  seconds, totalSeconds, index, total, remainingClock, nextName, nextTarget, nextMuscles, nextRig, onAdd, onSkip,
}: {
  seconds: number
  totalSeconds: number
  index: number
  total: number
  remainingClock: string
  nextName: string
  nextTarget: string
  nextMuscles: string
  nextRig: string
  onAdd: () => void
  onSkip: () => void
}) {
  const t = useT()
  const circumference = 2 * Math.PI * 104
  const progress = totalSeconds > 0 ? Math.max(0, Math.min(1, seconds / totalSeconds)) : 0
  const getReady = seconds <= 5

  return (
    <div className="player rest fade-in">
      <div className="row between rest-head">
        <span className="player-counter">{t('player.exerciseOf', { current: index + 1, total })}</span>
        <span className="muted">{t('player.timeLeft', { time: remainingClock })}</span>
      </div>

      <div className="rest-stage col">
        <span className="d rest-label">{t('player.rest')}</span>
        <div className="rest-dial">
          <svg width="232" height="232" viewBox="0 0 232 232" fill="none">
            <circle cx="116" cy="116" r="104" stroke="#1B2129" strokeWidth="10" />
            <circle
              cx="116" cy="116" r="104"
              stroke={getReady ? 'var(--accent)' : 'var(--rest)'}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              transform="rotate(-90 116 116)"
              style={{ transition: 'stroke-dashoffset 0.2s linear, stroke 0.3s ease' }}
            />
          </svg>
          <div className="rest-dial-inner col">
            <span className="d rest-time">{formatClock(seconds)}</span>
            <span className={`rest-ready${getReady ? ' on' : ''}`}>{t('player.getReady')}</span>
          </div>
        </div>
        <div className="row rest-actions">
          <button className="btn btn-ghost rest-action" onClick={onAdd}>
            <PlusIcon /> {t('player.addTen')}
          </button>
          <button className="btn btn-surface rest-action rest-skip" onClick={onSkip}>
            <SkipIcon /> {t('player.skipRest')}
          </button>
        </div>
      </div>

      <div className="card rest-next row">
        <div className="rest-next-thumb">
          <ExerciseFigure rig={nextRig} size={96} speed={0.8} />
        </div>
        <div className="col grow" style={{ gap: 6 }}>
          <span className="label">{t('player.nextUp')}</span>
          <span className="d rest-next-name">{nextName}</span>
          <span className="muted">{nextTarget} · {nextMuscles}</span>
          <div style={{ marginTop: 2 }}><Pill variant="soft">{t('player.preview')}</Pill></div>
        </div>
      </div>
    </div>
  )
}

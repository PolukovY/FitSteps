import { useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { MuscleMap } from '../components/MuscleMap'
import { ChevronLeft, PlayIcon } from '../components/icons'
import { Pill, Switch } from '../components/ui'
import { getExercise } from '../data/exercises'
import { findProgram, programDay } from '../data/programs'
import { estimateKcal, findWorkout } from '../data/workouts'
import { buildSteps, musclesOf, totalSeconds } from '../engine/session'
import { sounds } from '../engine/sound'
import { useT } from '../i18n'
import { useProgress } from '../store/useAppStore'
import { useSession } from '../store/useSessionStore'
import './intro.css'

export function WorkoutIntroScreen() {
  const { workoutId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const t = useT()
  const active = useProgress((s) => s.activeProgram)
  const start = useSession((s) => s.start)

  const [warmup, setWarmup] = useState(true)
  const [cooldown, setCooldown] = useState(true)

  const workout = workoutId ? findWorkout(workoutId) : undefined

  // A program day carries progression overrides; a quick-start workout does not.
  const programContext = useMemo(() => {
    const fromProgram = params.get('program') ?? active?.programId
    const day = Number(params.get('day') ?? active?.currentDay ?? 0)
    if (!fromProgram || !day) return undefined
    const program = findProgram(fromProgram)
    const entry = program ? programDay(program, day) : undefined
    if (!program || !entry || entry.workoutId !== workoutId) return undefined
    return { program, day, overrides: entry.overrides }
  }, [active, params, workoutId])

  const steps = useMemo(
    () =>
      workout
        ? buildSteps(workout, {
            includeWarmup: warmup,
            includeCooldown: cooldown,
            overrides: programContext?.overrides,
          })
        : [],
    [cooldown, programContext, warmup, workout],
  )

  if (!workout) {
    navigate('/', { replace: true })
    return null
  }

  const minutes = Math.round(totalSeconds(steps) / 60)
  const kcal = estimateKcal(
    steps.map((s) => ({
      exerciseId: s.exerciseId,
      block: s.block,
      reps: s.reps,
      durationSeconds: s.durationSeconds,
      restSeconds: s.restSeconds,
    })),
    workout.category,
  )
  const muscles = musclesOf(steps.filter((s) => s.block === 'main'))
  const heroRig = steps.find((s) => s.block === 'main')?.exerciseId ?? steps[0]?.exerciseId

  const begin = () => {
    // Browsers gate audio behind a gesture — this is the only reliable moment.
    sounds.unlock()
    start({
      workoutId: workout.id,
      steps,
      programId: programContext?.program.id,
      programDay: programContext?.day,
    })
    navigate('/play')
  }

  return (
    <div className="intro">
      <div className="scroll">
        <header className="intro-hero">
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('common.back')}>
            <ChevronLeft />
          </button>
          {heroRig && (
            <div className="intro-hero-figure">
              <ExerciseFigure rig={getExercise(heroRig).animationAsset} size={190} speed={0.8} />
            </div>
          )}
          <div className="intro-hero-copy col">
            <div className="row" style={{ gap: 6 }}>
              <Pill variant="soft">{t(`difficulty.${workout.difficulty}`)}</Pill>
              <Pill variant="muted">{t(`wcat.${workout.category}`)}</Pill>
            </div>
            <h1 className="d intro-title">{t(workout.nameKey)}</h1>
            <p className="intro-desc">{t(workout.descriptionKey)}</p>
          </div>
        </header>

        <div className="intro-stats">
          <Stat value={String(minutes)} label={t('workout.minutes')} />
          <Stat value={String(steps.length)} label={t('workout.exercisesShort')} />
          <Stat value={String(kcal)} label={t('workout.kcal')} />
        </div>

        <section className="card intro-muscles row">
          <div className="row" style={{ gap: 8 }}>
            <MuscleMap side="front" primary={muscles.primary} secondary={muscles.secondary} width={54} />
            <MuscleMap side="back" primary={muscles.primary} secondary={muscles.secondary} width={54} />
          </div>
          <div className="col grow" style={{ gap: 8 }}>
            <span className="label">{t('workout.targetMuscles')}</span>
            <div className="intro-muscle-tags">
              {muscles.primary.slice(0, 4).map((m) => (
                <span key={m} className="pill pill-accent">{t(`muscle.${m}`)}</span>
              ))}
              {muscles.secondary.slice(0, 3).map((m) => (
                <span key={m} className="pill pill-outline">{t(`muscle.${m}`)}</span>
              ))}
            </div>
          </div>
        </section>

        <div className="intro-toggles">
          <label className="row between card intro-toggle">
            <span>{t('workout.includeWarmup')}</span>
            <Switch on={warmup} onChange={() => setWarmup((v) => !v)} />
          </label>
          <label className="row between card intro-toggle">
            <span>{t('workout.includeCooldown')}</span>
            <Switch on={cooldown} onChange={() => setCooldown((v) => !v)} />
          </label>
        </div>

        <section className="intro-list col">
          <span className="section-title">{t('workout.exercises')}</span>
          {steps.map((step, i) => {
            const exercise = getExercise(step.exerciseId)
            const isExtra = step.block !== 'main'
            return (
              <div key={`${step.exerciseId}-${i}`} className="row intro-row">
                <div className={`intro-index${isExtra ? ' extra' : ''}`}>
                  <span className="d">{i + 1}</span>
                </div>
                <div className="col grow" style={{ gap: 2 }}>
                  <span className="intro-row-name">{t(exercise.nameKey)}</span>
                  <span className={`intro-row-meta${isExtra ? ' extra' : ''}`}>
                    {isExtra
                      ? t(step.block === 'warmup' ? 'workout.warmup' : 'workout.cooldown').toUpperCase()
                      : step.durationSeconds
                        ? `${step.durationSeconds} ${t('time.sec')}${step.sides > 1 ? ` · ${t('player.eachSide')}` : ''}`
                        : `${step.reps} ${t('player.reps')}${step.sides > 1 ? ` · ${t('player.eachSide')}` : ''}`}
                  </span>
                </div>
                {exercise.tempo && <span className="intro-tempo">{exercise.tempo.replace(/-/g, '·')}</span>}
              </div>
            )
          })}
        </section>
        <div style={{ height: 110 }} />
      </div>

      <div className="intro-cta">
        <button className="btn btn-primary btn-block" onClick={begin}>
          <PlayIcon /> {t('workout.start')}
        </button>
      </div>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card intro-stat col">
      <span className="d intro-stat-value">{value}</span>
      <span className="label">{label}</span>
    </div>
  )
}

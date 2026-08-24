import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MuscleMap } from '../components/MuscleMap'
import { CheckIcon, FlameIcon } from '../components/icons'
import { getWorkout } from '../data/workouts'
import type { Muscle } from '../data/types'
import { useT } from '../i18n'
import { formatDuration } from '../lib/dates'
import { currentStreak, longestStreak } from '../lib/streak'
import { useProgress } from '../store/useAppStore'
import { useSession } from '../store/useSessionStore'
import './complete.css'

const RATINGS = [1, 2, 3, 4, 5]

export function CompleteScreen() {
  const t = useT()
  const navigate = useNavigate()
  const result = useSession((s) => s.result)
  const clear = useSession((s) => s.clear)
  const rateWorkout = useProgress((s) => s.rateWorkout)
  const history = useProgress((s) => s.history)
  const [rating, setRating] = useState<number | null>(null)

  useEffect(() => {
    if (!result) navigate('/', { replace: true })
  }, [navigate, result])

  if (!result) return null

  const workout = getWorkout(result.workoutId)
  const dates = history.map((h) => h.date)
  const streak = currentStreak(dates)
  const longest = Math.max(longestStreak(dates), streak)

  const load = result.muscleLoad as Partial<Record<Muscle, number>>
  const top = (Object.entries(load) as [Muscle, number][]) 
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
  const peak = top[0]?.[1] ?? 1
  const primary = top.slice(0, 2).map(([m]) => m)
  const secondary = top.slice(2).map(([m]) => m)

  const finishUp = () => {
    if (rating) rateWorkout(result.id, rating)
    clear()
    navigate('/', { replace: true })
  }

  return (
    <div className="complete">
      <div className="scroll">
        <header className="complete-head col">
          <div className="complete-badge">
            <CheckIcon size={26} />
          </div>
          <h1 className="d complete-title">{t('complete.title')}</h1>
          <span className="muted">{t(workout.nameKey)}</span>
        </header>

        <div className="complete-stats">
          <Stat value={formatDuration(result.durationSeconds)} label={t('complete.duration')} accent />
          <Stat value={String(result.exerciseCount)} label={t('complete.exercises')} />
          <Stat value={String(result.kcal)} label={t('complete.kcal')} />
        </div>

        <section className="complete-streak row">
          <FlameIcon size={24} />
          <div className="col">
            <span className="d complete-streak-value">{t('complete.streak', { days: streak })}</span>
            <span className="complete-streak-sub">{t('complete.longest', { days: longest })}</span>
          </div>
        </section>

        {result.programDay && (
          <div className="complete-program">{t('complete.programAdvanced', { day: result.programDay + 1 })}</div>
        )}

        <section className="card complete-muscles row">
          <div className="row" style={{ gap: 6 }}>
            <MuscleMap side="front" primary={primary} secondary={secondary} width={52} />
            <MuscleMap side="back" primary={primary} secondary={secondary} width={52} />
          </div>
          <div className="col grow" style={{ gap: 9 }}>
            <span className="label">{t('complete.musclesTrained')}</span>
            {top.map(([muscle, value]) => (
              <div key={muscle} className="row complete-muscle-row">
                <span className="complete-muscle-name">{t(`muscle.${muscle}`)}</span>
                <div className="bar grow"><i style={{ width: `${Math.round((value / peak) * 100)}%` }} /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="complete-rating col">
          <span className="complete-rating-title">{t('complete.howDidItFeel')}</span>
          <div className="complete-rating-row">
            {RATINGS.map((value) => (
              <button
                key={value}
                className={`complete-rating-btn${rating === value ? ' on' : ''}`}
                onClick={() => setRating(value)}
              >
                <span className="d">{value}</span>
              </button>
            ))}
          </div>
          <div className="row between complete-rating-legend">
            <span>{t('complete.veryEasy')}</span>
            <span>{t('complete.veryHard')}</span>
          </div>
        </section>
        <div style={{ height: 110 }} />
      </div>

      <div className="complete-cta">
        <button className="btn btn-primary btn-block" onClick={finishUp}>{t('complete.finish')}</button>
      </div>
    </div>
  )
}

function Stat({ value, label, accent }: { value: string; label: string; accent?: boolean }) {
  return (
    <div className="card complete-stat col">
      <span className="d complete-stat-value" style={accent ? { color: 'var(--accent)' } : undefined}>{value}</span>
      <span className="label">{label}</span>
    </div>
  )
}

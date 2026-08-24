import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { MuscleMap } from '../components/MuscleMap'
import { CheckIcon, SettingsIcon } from '../components/icons'
import { findWorkout } from '../data/workouts'
import type { Muscle } from '../data/types'
import { useLocale, useT } from '../i18n'
import { dayKey, formatDuration, formatTrainingTime } from '../lib/dates'
import { currentStreak, longestStreak } from '../lib/streak'
import { useProgress } from '../store/useAppStore'
import './progress.css'

const WEEKS_SHOWN = 8
const BALANCE_MUSCLES: Muscle[] = ['quadriceps', 'glutes', 'abs', 'chest', 'lats', 'triceps', 'hamstrings', 'front_delts']

export function ProgressScreen() {
  const t = useT()
  const locale = useLocale()
  const history = useProgress((s) => s.history)

  const dates = history.map((h) => h.date)
  const streak = currentStreak(dates)
  const longest = Math.max(longestStreak(dates), streak)
  const totalTime = history.reduce((sum, h) => sum + h.durationSeconds, 0)
  const { h: hours, m: minutes } = formatTrainingTime(totalTime)

  /** Eight bars of weekly work, most recent last. */
  const weekly = useMemo(() => {
    const now = new Date()
    const monday = new Date(now)
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7))
    monday.setHours(0, 0, 0, 0)
    return Array.from({ length: WEEKS_SHOWN }, (_, i) => {
      const start = new Date(monday)
      start.setDate(start.getDate() - (WEEKS_SHOWN - 1 - i) * 7)
      const end = new Date(start)
      end.setDate(end.getDate() + 7)
      const seconds = history
        .filter((h) => h.finishedAt >= start.getTime() && h.finishedAt < end.getTime())
        .reduce((sum, h) => sum + h.durationSeconds, 0)
      return { seconds, current: i === WEEKS_SHOWN - 1 }
    })
  }, [history])

  const peakWeek = Math.max(...weekly.map((w) => w.seconds), 1)

  /** Muscle load over the last 30 days, normalised against the busiest muscle. */
  const balance = useMemo(() => {
    const since = Date.now() - 30 * 24 * 3600 * 1000
    const totals: Partial<Record<Muscle, number>> = {}
    for (const entry of history) {
      if (entry.finishedAt < since) continue
      for (const [muscle, value] of Object.entries(entry.muscleLoad) as [Muscle, number][]) {
        totals[muscle] = (totals[muscle] ?? 0) + value
      }
    }
    const peak = Math.max(...Object.values(totals).map((v) => v ?? 0), 1)
    const normalised: Partial<Record<Muscle, number>> = {}
    for (const [muscle, value] of Object.entries(totals) as [Muscle, number][]) {
      normalised[muscle] = value / peak
    }
    return normalised
  }, [history])

  const formatter = new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : 'en-GB', {
    day: 'numeric',
    month: 'short',
  })
  const today = dayKey()

  return (
    <div className="scroll">
      <div className="screen-pad progress">
        <div className="row between">
          <h1 className="d progress-title">{t('progress.title')}</h1>
          <Link to="/settings" className="icon-btn" aria-label={t('settings.title')}>
            <SettingsIcon size={18} />
          </Link>
        </div>

        <div className="progress-stats">
          <StatCard value={String(history.length)} label={t('progress.workouts')} />
          <StatCard value={hours > 0 ? `${hours}${t('time.hour')} ${minutes}${t('time.minute')}` : `${minutes}${t('time.minute')}`} label={t('progress.trainingTime')} />
          <StatCard value={t('progress.days', { count: streak })} label={t('progress.currentStreak')} hot />
          <StatCard value={t('progress.days', { count: longest })} label={t('progress.longestStreak')} />
        </div>

        <section className="card progress-block col">
          <div className="row between" style={{ alignItems: 'baseline' }}>
            <span className="section-title">{t('progress.weeklyVolume')}</span>
            <span className="muted">{t('progress.lastWeeks', { count: WEEKS_SHOWN })}</span>
          </div>
          <div className="progress-bars">
            {weekly.map((week, i) => (
              <div key={i} className="col progress-bar-col">
                <div
                  className={`progress-bar-fill${week.current ? ' current' : ''}`}
                  style={{ height: `${Math.max(4, (week.seconds / peakWeek) * 92)}px` }}
                />
                <span className="progress-bar-label">{i + 1}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="card progress-block col">
          <div className="row between" style={{ alignItems: 'baseline' }}>
            <span className="section-title">{t('progress.muscleBalance')}</span>
            <span className="muted">{t('progress.lastDays', { count: 30 })}</span>
          </div>
          <div className="row" style={{ gap: 14, alignItems: 'center' }}>
            <div className="col grow" style={{ gap: 8 }}>
              {BALANCE_MUSCLES.slice(0, 6).map((muscle) => (
                <div key={muscle} className="row progress-balance-row">
                  <span className="progress-balance-name">{t(`muscle.${muscle}`)}</span>
                  <div className="bar grow">
                    <i style={{ width: `${Math.round((balance[muscle] ?? 0) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="row" style={{ gap: 4 }}>
              <MuscleMap side="front" primary={[]} secondary={[]} intensity={balance} width={54} />
              <MuscleMap side="back" primary={[]} secondary={[]} intensity={balance} width={54} />
            </div>
          </div>
        </section>

        <section className="col" style={{ gap: 10 }}>
          <span className="section-title">{t('progress.history')}</span>
          {history.length === 0 && <span className="muted">{t('progress.noHistory')}</span>}
          {history.slice(0, 12).map((entry) => {
            const workout = findWorkout(entry.workoutId)
            return (
              <div key={entry.id} className="card row progress-history">
                <span className="progress-history-check"><CheckIcon size={16} /></span>
                <div className="col grow" style={{ gap: 3 }}>
                  <span className="progress-history-name">{workout ? t(workout.nameKey) : entry.workoutId}</span>
                  <span className="muted">
                    {entry.date === today ? t('common.today') : formatter.format(new Date(entry.finishedAt))} ·{' '}
                    {formatDuration(entry.durationSeconds)} · {entry.kcal} {t('complete.kcal')}
                  </span>
                </div>
                {entry.rating && (
                  <div className="row" style={{ gap: 4 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} className={`progress-dot${n <= entry.rating! ? ' on' : ''}`} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </section>
        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}

function StatCard({ value, label, hot }: { value: string; label: string; hot?: boolean }) {
  return (
    <div className={`card progress-stat col${hot ? ' hot' : ''}`}>
      <span className="label">{label}</span>
      <span className="d progress-stat-value">{value}</span>
    </div>
  )
}

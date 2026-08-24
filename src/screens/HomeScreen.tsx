import { Link, useNavigate } from 'react-router-dom'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { CheckIcon, ClockIcon, DumbbellIcon, FlameIcon, PlayIcon, SettingsIcon } from '../components/icons'
import { Pill } from '../components/ui'
import { getWorkout, workoutSeconds } from '../data/workouts'
import { buildSteps, totalSeconds } from '../engine/session'
import { useLocale, useT } from '../i18n'
import { LOCALE_LABELS } from '../i18n/locales'
import { dayKey, weekDays } from '../lib/dates'
import { useTodayPlan, weekOf } from '../lib/plan'
import { currentStreak } from '../lib/streak'
import { useProgress, useSettings } from '../store/useAppStore'
import './home.css'

const QUICK = [
  { workoutId: 'express-5', labelKey: 'quick.express', minutes: 5, rig: 'squat' },
  { workoutId: 'abs-core-a', labelKey: 'quick.abs', minutes: 10, rig: 'crunch' },
  { workoutId: 'stretch-flow', labelKey: 'quick.stretch', minutes: 8, rig: 'child-pose' },
]

function greetingKey(): string {
  const h = new Date().getHours()
  if (h < 12) return 'greeting.morning'
  if (h < 18) return 'greeting.afternoon'
  return 'greeting.evening'
}

export function HomeScreen() {
  const t = useT()
  const locale = useLocale()
  const setLocale = useSettings((s) => s.setLocale)
  const navigate = useNavigate()
  const plan = useTodayPlan()
  const history = useProgress((s) => s.history)

  const trainedDays = new Set(history.map((h) => h.date))
  const streak = currentStreak(history.map((h) => h.date))
  const week = weekDays()
  const today = dayKey()

  return (
    <div className="scroll">
      <div className="screen-pad home">
        <header className="row between home-head">
          <div className="col">
            <span className="home-greet">{t(greetingKey())}</span>
            <span className="d home-name">{t('greeting.athlete')}</span>
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button className="icon-btn home-lang" onClick={() => setLocale(locale === 'en' ? 'uk' : 'en')}>
              {LOCALE_LABELS[locale]}
            </button>
            <Link to="/settings" className="icon-btn" aria-label={t('settings.title')}>
              <SettingsIcon size={18} />
            </Link>
          </div>
        </header>

        {plan.kind === 'workout' && (
          <TodayCard
            title={t(plan.workout.nameKey)}
            meta={t('home.weekDay', { week: weekOf(plan.day), day: plan.day })}
            minutes={Math.round(
              totalSeconds(buildSteps(plan.workout, { overrides: plan.entry.overrides })) / 60,
            )}
            exercises={plan.workout.steps.length}
            difficulty={t(`difficulty.${plan.workout.difficulty}`)}
            rig={plan.workout.steps.find((s) => s.block === 'main')?.exerciseId}
            onStart={() => navigate(`/workout/${plan.workout.id}`)}
            cta={t('home.startWorkout')}
          />
        )}

        {plan.kind === 'rest' && (
          <div className="card home-rest col">
            <Pill variant="soft">{t('home.restDay')}</Pill>
            <span className="d home-rest-title">{t('home.restDay')}</span>
            <span className="muted">{t('home.restDayHint')}</span>
            <button className="btn btn-ghost btn-block" onClick={() => navigate('/workout/stretch-flow')}>
              {t('quick.stretch')}
            </button>
          </div>
        )}

        {(plan.kind === 'none' || plan.kind === 'done') && (
          <div className="card home-rest col">
            <span className="d home-rest-title">
              {t(plan.kind === 'done' ? 'home.programDone' : 'home.noProgram')}
            </span>
            <span className="muted">{t('home.noProgramHint')}</span>
            <button className="btn btn-primary btn-block" onClick={() => navigate('/programs')}>
              {t('home.browsePrograms')}
            </button>
          </div>
        )}

        <section className="card home-week col">
          <div className="row between">
            <span className="section-title">{t('home.thisWeek')}</span>
            <span className="home-week-count">
              {week.filter((d) => trainedDays.has(d)).length} / {plan.kind === 'workout' ? plan.program.daysPerWeek : 7}
            </span>
          </div>
          <div className="home-week-grid">
            {week.map((day, i) => {
              const done = trainedDays.has(day)
              const isToday = day === today
              return (
                <div key={day} className="col home-day">
                  <div className={`home-day-cell${done ? ' done' : ''}${isToday && !done ? ' today' : ''}`}>
                    {done && <CheckIcon size={16} />}
                  </div>
                  <span className={`home-day-label${isToday ? ' today' : ''}`}>
                    {new Intl.DateTimeFormat(locale === 'uk' ? 'uk-UA' : 'en-GB', { weekday: 'narrow' })
                      .format(new Date(`${week[i]}T12:00:00`))
                      .toUpperCase()}
                  </span>
                </div>
              )
            })}
          </div>
        </section>

        <section className="row between home-streak card">
          <div className="row" style={{ gap: 10 }}>
            <span className="home-flame"><FlameIcon size={20} /></span>
            <div className="col">
              <span className="d home-streak-value">{streak}</span>
              <span className="muted">{t('home.streak')}</span>
            </div>
          </div>
          <Link to="/progress" className="pill pill-muted">{t('nav.progress')}</Link>
        </section>

        <section className="col" style={{ gap: 12 }}>
          <span className="section-title">{t('home.quickStart')}</span>
          <div className="home-quick">
            {QUICK.map((q) => (
              <Link key={q.workoutId} to={`/workout/${q.workoutId}`} className="card home-quick-card col">
                <ExerciseFigure rig={q.rig} size={62} speed={0.7} />
                <div className="col">
                  <span className="d home-quick-title">{t(q.labelKey)}</span>
                  <span className="muted">
                    {Math.round(workoutSeconds(getWorkout(q.workoutId).steps) / 60)} {t('time.min')}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

function TodayCard({
  title, meta, minutes, exercises, difficulty, rig, onStart, cta,
}: {
  title: string
  meta: string
  minutes: number
  exercises: number
  difficulty: string
  rig?: string
  onStart: () => void
  cta: string
}) {
  const t = useT()
  return (
    <section className="home-today col">
      <div className="home-today-glow" />
      {rig && (
        <div className="home-today-figure">
          <ExerciseFigure rig={rig} size={150} speed={0.75} />
        </div>
      )}
      <div className="row" style={{ gap: 8 }}>
        <Pill variant="accent">{t('home.today')}</Pill>
        <span className="muted">{meta}</span>
      </div>
      <h1 className="d home-today-title">{title}</h1>
      <div className="row home-today-meta">
        <span className="row" style={{ gap: 6 }}><ClockIcon /> {minutes} {t('time.min')}</span>
        <span className="row" style={{ gap: 6 }}><DumbbellIcon size={15} /> {exercises}</span>
        <span>· {difficulty}</span>
      </div>
      <button className="btn btn-primary btn-block" onClick={onStart}>
        <PlayIcon /> {cta}
      </button>
    </section>
  )
}

import { useNavigate, useParams } from 'react-router-dom'
import { CheckIcon, ChevronLeft, PlayIcon } from '../components/icons'
import { Bar, Pill } from '../components/ui'
import { findProgram } from '../data/programs'
import { findWorkout } from '../data/workouts'
import { useT } from '../i18n'
import { programProgress, weekOf } from '../lib/plan'
import { useProgress } from '../store/useAppStore'
import './programs.css'

export function ProgramDetailScreen() {
  const { programId } = useParams()
  const navigate = useNavigate()
  const t = useT()
  const active = useProgress((s) => s.activeProgram)
  const startProgram = useProgress((s) => s.startProgram)
  const leaveProgram = useProgress((s) => s.leaveProgram)

  const program = programId ? findProgram(programId) : undefined
  if (!program) {
    navigate('/programs', { replace: true })
    return null
  }

  const isActive = active?.programId === program.id
  const completedDays = isActive ? active.completedDays : []
  const progress = programProgress(program, completedDays)
  const currentDay = isActive ? active.currentDay : 1
  const todayEntry = program.days.find((d) => d.day === currentDay)
  const todayWorkout = todayEntry?.workoutId ? findWorkout(todayEntry.workoutId) : undefined

  const begin = () => {
    if (!isActive) startProgram(program.id)
    if (todayWorkout) navigate(`/workout/${todayWorkout.id}?program=${program.id}&day=${currentDay}`)
    else navigate('/')
  }

  const weeks = Math.ceil(program.durationDays / 7)

  return (
    <div className="scroll">
      <div className="screen-pad programs">
        <div className="row" style={{ gap: 12 }}>
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('common.back')}>
            <ChevronLeft />
          </button>
          <Pill variant="soft">{t(`difficulty.${program.difficulty}`)}</Pill>
        </div>

        <div className="col" style={{ gap: 8 }}>
          <h1 className="d programs-title">{t(program.nameKey)}</h1>
          <span className="muted" style={{ lineHeight: 1.5 }}>{t(program.descriptionKey)}</span>
          <span className="programs-card-meta">
            {program.durationDays % 7 === 0
              ? t('programs.weeks', { count: weeks })
              : t('programs.days', { count: program.durationDays })}{' '}
            ·{' '}
            {program.daysPerWeek === 7
              ? t('programs.everyDay')
              : t('programs.perWeek', { count: program.daysPerWeek })}
          </span>
        </div>

        {isActive && (
          <div className="col" style={{ gap: 8 }}>
            <div className="row between">
              <span className="programs-active-meta">
                {t('programs.weekOf', { current: weekOf(currentDay), total: weeks })}
              </span>
              <span className="programs-active-meta">{t('programs.percentComplete', { percent: progress.percent })}</span>
            </div>
            <Bar value={progress.percent / 100} />
          </div>
        )}

        <button className="btn btn-primary btn-block" onClick={begin}>
          <PlayIcon /> {isActive ? t('programs.continue') : t('programs.start')}
        </button>

        <span className="section-title">{t('programs.schedule')}</span>

        <div className="col" style={{ gap: 8 }}>
          {Array.from({ length: weeks }, (_, w) => (
            <section key={w} className="card programs-week-block col">
              <span className="label">{t('programs.weekOf', { current: w + 1, total: weeks })}</span>
              <div className="col" style={{ gap: 6 }}>
                {program.days
                  .filter((d) => weekOf(d.day) === w + 1)
                  .map((day) => {
                    const workout = day.workoutId ? findWorkout(day.workoutId) : undefined
                    const done = completedDays.includes(day.day)
                    const isToday = isActive && day.day === currentDay
                    return (
                      <div key={day.day} className={`row programs-day-row${isToday ? ' today' : ''}`}>
                        <span className={`programs-day-mark${done ? ' done' : ''}${day.rest ? ' rest' : ''}`}>
                          {done ? <CheckIcon size={12} /> : day.day}
                        </span>
                        <span className="grow programs-day-name">
                          {workout ? t(workout.nameKey) : t('programs.rest')}
                        </span>
                        {isToday && <Pill variant="accent">{t('programs.today')}</Pill>}
                      </div>
                    )
                  })}
              </div>
            </section>
          ))}
        </div>

        {isActive && (
          <button className="btn btn-ghost btn-block" onClick={leaveProgram}>
            {t('programs.leave')}
          </button>
        )}
        <div style={{ height: 24 }} />
      </div>
    </div>
  )
}

import { Link, useNavigate } from 'react-router-dom'
import { CheckIcon } from '../components/icons'
import { Bar } from '../components/ui'
import { PROGRAMS, findProgram } from '../data/programs'
import type { Program } from '../data/types'
import { useT } from '../i18n'
import { programProgress, weekOf } from '../lib/plan'
import { useProgress } from '../store/useAppStore'
import './programs.css'

const ACCENT: Record<Program['accent'], string> = {
  lime: 'var(--accent)',
  cool: 'var(--cool)',
  hot: 'var(--hot)',
  violet: 'var(--violet)',
}

export function ProgramsScreen() {
  const t = useT()
  const navigate = useNavigate()
  const active = useProgress((s) => s.activeProgram)
  const activeProgram = active ? findProgram(active.programId) : undefined

  return (
    <div className="scroll">
      <div className="screen-pad programs">
        <h1 className="d programs-title">{t('programs.title')}</h1>

        {activeProgram && active && (
          <ActiveCard
            program={activeProgram}
            currentDay={active.currentDay}
            completedDays={active.completedDays}
            onOpen={() => navigate(`/programs/${activeProgram.id}`)}
          />
        )}

        <span className="section-title">{t('programs.all')}</span>

        <div className="col programs-list">
          {PROGRAMS.map((program) => {
            const isActive = program.id === active?.programId
            const weeks = Math.round(program.durationDays / 7)
            return (
              <Link
                key={program.id}
                to={`/programs/${program.id}`}
                className="card col programs-card"
                style={isActive ? { borderColor: '#39421F' } : undefined}
              >
                <div className="row between" style={{ gap: 10, alignItems: 'flex-start' }}>
                  <div className="col" style={{ gap: 3 }}>
                    <span className="d programs-card-name">{t(program.nameKey)}</span>
                    <span className="muted">{t(program.goalKey)}</span>
                  </div>
                  <span className="pill pill-muted" style={{ color: ACCENT[program.accent] }}>
                    {program.durationDays % 7 === 0 && weeks > 1
                      ? t('programs.weeks', { count: weeks })
                      : t('programs.days', { count: program.durationDays })}
                  </span>
                </div>
                <span className="programs-card-meta">
                  {program.daysPerWeek === 7
                    ? t('programs.everyDay')
                    : t('programs.perWeek', { count: program.daysPerWeek })}{' '}
                  · {t(`difficulty.${program.difficulty}`)}
                </span>
              </Link>
            )
          })}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}

function ActiveCard({
  program, currentDay, completedDays, onOpen,
}: {
  program: Program
  currentDay: number
  completedDays: number[]
  onOpen: () => void
}) {
  const t = useT()
  const progress = programProgress(program, completedDays)
  const weekStart = (weekOf(currentDay) - 1) * 7

  return (
    <button className="col programs-active" onClick={onOpen}>
      <div className="row between">
        <span className="label" style={{ color: 'var(--accent)' }}>{t('programs.active')}</span>
        <span className="programs-active-meta">
          {t('programs.workoutOf', { current: progress.done + 1, total: progress.total })}
        </span>
      </div>
      <div className="row between" style={{ alignItems: 'baseline' }}>
        <span className="d programs-active-name">{t(program.nameKey)}</span>
        <span className="d programs-active-pct">{progress.percent}%</span>
      </div>
      <Bar value={progress.percent / 100} />
      <div className="programs-week">
        {Array.from({ length: 7 }, (_, i) => {
          const day = weekStart + i + 1
          const entry = program.days.find((d) => d.day === day)
          const done = completedDays.includes(day)
          const isToday = day === currentDay
          const isRest = entry?.rest ?? day > program.durationDays
          return (
            <div
              key={day}
              className={`programs-day${done ? ' done' : ''}${isToday ? ' today' : ''}${isRest ? ' rest' : ''}`}
            >
              {done ? <CheckIcon size={13} /> : <span>{day}</span>}
            </div>
          )
        })}
      </div>
      <div className="row programs-legend">
        <span><i className="dot done" />{t('programs.completed')}</span>
        <span><i className="dot today" />{t('programs.today')}</span>
        <span><i className="dot" />{t('programs.rest')}</span>
      </div>
    </button>
  )
}

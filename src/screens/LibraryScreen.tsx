import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { SearchIcon } from '../components/icons'
import { EXERCISES } from '../data/exercises'
import type { BodyPart, Difficulty, ExerciseCategory } from '../data/types'
import { useLocale, useT } from '../i18n'
import { translate } from '../i18n/registry'
import './library.css'

const BODY_PARTS: (BodyPart | 'all')[] = ['all', 'full_body', 'chest', 'back', 'arms', 'shoulders', 'core', 'legs', 'glutes']
const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']
const CATEGORIES: ExerciseCategory[] = ['strength', 'cardio', 'mobility', 'stretching']

const DIFF_COLOR: Record<Difficulty, string> = {
  beginner: 'var(--accent)',
  intermediate: 'var(--cool)',
  advanced: 'var(--hot)',
}

export function LibraryScreen() {
  const t = useT()
  const locale = useLocale()
  const [query, setQuery] = useState('')
  const [body, setBody] = useState<BodyPart | 'all'>('all')
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)
  const [category, setCategory] = useState<ExerciseCategory | null>(null)

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return EXERCISES.filter((e) => {
      if (body !== 'all' && !e.bodyParts.includes(body)) return false
      if (difficulty && e.difficulty !== difficulty) return false
      if (category && e.category !== category) return false
      if (!needle) return true
      // Search both locales: people type "присід" with an English UI and vice versa.
      return (
        translate('en', e.nameKey).toLowerCase().includes(needle) ||
        translate('uk', e.nameKey).toLowerCase().includes(needle)
      )
    })
  }, [body, category, difficulty, query])

  const hasFilters = body !== 'all' || difficulty !== null || category !== null || query !== ''

  return (
    <div className="scroll">
      <div className="screen-pad library">
        <div className="row between">
          <h1 className="d library-title">{t('library.title')}</h1>
          <span className="muted">{results.length}</span>
        </div>

        <label className="library-search row">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('library.search')}
            enterKeyHint="search"
          />
        </label>

        <div className="library-chips">
          {BODY_PARTS.map((part) => (
            <button
              key={part}
              className={`library-chip${body === part ? ' on' : ''}`}
              onClick={() => setBody(part)}
            >
              {part === 'all' ? t('library.all') : t(`body.${part}`)}
            </button>
          ))}
        </div>

        <div className="row library-filters">
          <FilterGroup
            label={t('library.difficulty')}
            options={DIFFICULTIES.map((d) => ({ id: d, label: t(`difficulty.${d}`) }))}
            value={difficulty}
            onChange={(v) => setDifficulty(v as Difficulty | null)}
          />
          <FilterGroup
            label={t('library.type')}
            options={CATEGORIES.map((c) => ({ id: c, label: t(`category.${c}`) }))}
            value={category}
            onChange={(v) => setCategory(v as ExerciseCategory | null)}
          />
          <span className="library-equipment">{t('library.noEquipment')}</span>
        </div>

        <div className="col library-list">
          {results.map((exercise) => (
            <Link key={exercise.id} to={`/library/${exercise.id}`} className="card row library-row">
              <div className="library-thumb">
                <ExerciseFigure rig={exercise.animationAsset} size={56} speed={0.65} />
              </div>
              <div className="col grow" style={{ gap: 3 }}>
                <span className="library-name">{t(exercise.nameKey)}</span>
                <span className="library-alt">
                  {translate(locale === 'en' ? 'uk' : 'en', exercise.nameKey)}
                </span>
                <span className="library-muscles">
                  {exercise.primaryMuscles.map((m) => t(`muscle.${m}`)).join(' · ')}
                </span>
              </div>
              <span
                className="pill"
                style={{ border: `1px solid ${DIFF_COLOR[exercise.difficulty]}`, color: DIFF_COLOR[exercise.difficulty] }}
              >
                {t(`difficulty.${exercise.difficulty}`)}
              </span>
            </Link>
          ))}

          {results.length === 0 && (
            <div className="library-empty col">
              <span className="muted">{t('library.empty')}</span>
              {hasFilters && (
                <button
                  className="btn btn-ghost"
                  onClick={() => {
                    setQuery('')
                    setBody('all')
                    setDifficulty(null)
                    setCategory(null)
                  }}
                >
                  {t('library.clear')}
                </button>
              )}
            </div>
          )}
        </div>
        <div style={{ height: 20 }} />
      </div>
    </div>
  )
}

function FilterGroup({
  label, options, value, onChange,
}: {
  label: string
  options: { id: string; label: string }[]
  value: string | null
  onChange: (value: string | null) => void
}) {
  const [open, setOpen] = useState(false)
  const active = options.find((o) => o.id === value)
  return (
    <div className="library-filter">
      <button className={`library-filter-btn${active ? ' on' : ''}`} onClick={() => setOpen((v) => !v)}>
        {active?.label ?? label}
      </button>
      {open && (
        <div className="library-filter-menu">
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                onChange(option.id === value ? null : option.id)
                setOpen(false)
              }}
              className={option.id === value ? 'on' : undefined}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

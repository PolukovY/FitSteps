import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { MuscleMap } from '../components/MuscleMap'
import { ChevronLeft, CloseIcon, PlayIcon, SparkIcon } from '../components/icons'
import { Pill } from '../components/ui'
import { findExercise } from '../data/exercises'
import { buildSteps } from '../engine/session'
import { sounds } from '../engine/sound'
import { useT } from '../i18n'
import { useSession } from '../store/useSessionStore'
import './detail.css'

type Tab = 'howto' | 'mistakes' | 'variations'

export function ExerciseDetailScreen() {
  const { exerciseId } = useParams()
  const navigate = useNavigate()
  const t = useT()
  const start = useSession((s) => s.start)
  const [tab, setTab] = useState<Tab>('howto')

  const exercise = exerciseId ? findExercise(exerciseId) : undefined
  if (!exercise) {
    navigate('/library', { replace: true })
    return null
  }

  const mistakes = exercise.commonMistakesKey ? t(exercise.commonMistakesKey).split('\n') : []
  const easier = exercise.easierAlternativeId ? findExercise(exercise.easierAlternativeId) : undefined
  const harder = exercise.harderAlternativeId ? findExercise(exercise.harderAlternativeId) : undefined

  /** "Try exercise" runs this single movement as a one-step session. */
  const tryIt = () => {
    sounds.unlock()
    const timed = exercise.type === 'timer' || exercise.type === 'hold'
    start({
      workoutId: 'express-5',
      steps: buildSteps(
        {
          id: 'single', nameKey: exercise.nameKey, descriptionKey: exercise.descriptionKey,
          category: 'full_body', difficulty: exercise.difficulty, estimatedKcal: 0,
          steps: [
            {
              exerciseId: exercise.id,
              block: 'main',
              reps: timed ? undefined : (exercise.defaultReps ?? 10),
              durationSeconds: timed ? (exercise.defaultDurationSeconds ?? 30) : undefined,
              restSeconds: 0,
            },
          ],
        },
        {},
      ),
    })
    navigate('/play')
  }

  return (
    <div className="detail">
      <div className="scroll">
        <header className="detail-hero">
          <button className="icon-btn detail-back" onClick={() => navigate(-1)} aria-label={t('common.back')}>
            <ChevronLeft />
          </button>
          <Link to="/library" className="icon-btn detail-close" aria-label={t('common.close')}>
            <CloseIcon />
          </Link>
          <ExerciseFigure rig={exercise.animationAsset} size={200} />
        </header>

        <div className="detail-body col">
          <div className="row between" style={{ gap: 10, alignItems: 'flex-end' }}>
            <div className="col" style={{ gap: 4 }}>
              <h1 className="d detail-title">{t(exercise.nameKey)}</h1>
              <span className="muted">
                {t(`category.${exercise.category}`)} · {t('library.noEquipment')}
              </span>
            </div>
            <Pill variant="soft">{t(`difficulty.${exercise.difficulty}`)}</Pill>
          </div>

          <p className="detail-desc">{t(exercise.descriptionKey)}</p>

          <section className="card detail-muscles row">
            <div className="row" style={{ gap: 8 }}>
              <MuscleMap side="front" primary={exercise.primaryMuscles} secondary={exercise.secondaryMuscles} width={56} />
              <MuscleMap side="back" primary={exercise.primaryMuscles} secondary={exercise.secondaryMuscles} width={56} />
            </div>
            <div className="col grow" style={{ gap: 10 }}>
              <div className="col" style={{ gap: 5 }}>
                <span className="label" style={{ color: 'var(--accent)' }}>{t('detail.primary')}</span>
                <span className="detail-muscle-list">
                  {exercise.primaryMuscles.map((m) => t(`muscle.${m}`)).join(' · ')}
                </span>
              </div>
              <div className="col" style={{ gap: 5 }}>
                <span className="label">{t('detail.secondary')}</span>
                <span className="detail-muscle-list dim">
                  {exercise.secondaryMuscles.length
                    ? exercise.secondaryMuscles.map((m) => t(`muscle.${m}`)).join(' · ')
                    : '—'}
                </span>
              </div>
              <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
                {exercise.tempo && <span className="detail-chip">{t('player.tempo')} {exercise.tempo.replace(/-/g, '·')}</span>}
                <span className="detail-chip">
                  {exercise.defaultReps
                    ? `${exercise.defaultReps} ${t('player.reps')}`
                    : `${exercise.defaultDurationSeconds} ${t('time.sec')}`}
                </span>
              </div>
            </div>
          </section>

          <nav className="row detail-tabs">
            {(['howto', 'mistakes', 'variations'] as Tab[]).map((id) => (
              <button
                key={id}
                className={`detail-tab${tab === id ? ' on' : ''}`}
                onClick={() => setTab(id)}
              >
                {t(id === 'howto' ? 'detail.howTo' : id === 'mistakes' ? 'detail.mistakes' : 'detail.variations')}
              </button>
            ))}
          </nav>

          {tab === 'howto' && (
            <div className="col detail-steps">
              <Step index="1" title={t('detail.startingPosition')} body={t(exercise.startingPositionKey)} />
              <Step index="2" title={t('detail.movement')} body={t(exercise.instructionsKey)} />
              {exercise.breathingKey && (
                <Step index="3" title={t('detail.breathing')} body={t(exercise.breathingKey)} />
              )}
              {exercise.rangeOfMotionKey && (
                <Step index="4" title={t('detail.rangeOfMotion')} body={t(exercise.rangeOfMotionKey)} />
              )}
              <div className="col detail-cues">
                <span className="label">{t('detail.cues')}</span>
                <div className="detail-cue-list">
                  {exercise.coachingCueKeys.map((key) => (
                    <span key={key} className="detail-cue row">
                      <SparkIcon size={13} /> {t(key)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {tab === 'mistakes' && (
            <div className="col detail-mistakes">
              {mistakes.map((mistake) => (
                <div key={mistake} className="row detail-mistake">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--hot)" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="8.5" /><path d="M9 9l6 6M15 9l-6 6" />
                  </svg>
                  <span>{mistake}</span>
                </div>
              ))}
              {exercise.safetyTipsKey && (
                <div className="detail-safety col">
                  <span className="label" style={{ color: 'var(--hot-text)' }}>{t('detail.safety')}</span>
                  <span>{t(exercise.safetyTipsKey)}</span>
                </div>
              )}
              {mistakes.length === 0 && !exercise.safetyTipsKey && <span className="muted">—</span>}
            </div>
          )}

          {tab === 'variations' && (
            <div className="detail-variations">
              {easier && <VariationCard label={t('detail.easier')} id={easier.id} name={t(easier.nameKey)} rig={easier.animationAsset} />}
              {harder && <VariationCard label={t('detail.harder')} id={harder.id} name={t(harder.nameKey)} rig={harder.animationAsset} />}
              {!easier && !harder && <span className="muted">—</span>}
            </div>
          )}
        </div>
        <div style={{ height: 110 }} />
      </div>

      <div className="detail-cta">
        <button className="btn btn-primary btn-block" onClick={tryIt}>
          <PlayIcon /> {t('detail.tryExercise')}
        </button>
      </div>
    </div>
  )
}

function Step({ index, title, body }: { index: string; title: string; body: string }) {
  return (
    <div className="row detail-step">
      <div className="detail-step-index"><span className="d">{index}</span></div>
      <div className="col" style={{ gap: 2 }}>
        <span className="detail-step-title">{title}</span>
        <span className="detail-step-body">{body}</span>
      </div>
    </div>
  )
}

function VariationCard({ label, id, name, rig }: { label: string; id: string; name: string; rig: string }) {
  return (
    <Link to={`/library/${id}`} className="card col detail-variation">
      <div className="detail-variation-figure">
        <ExerciseFigure rig={rig} size={84} speed={0.7} />
      </div>
      <span className="label">{label}</span>
      <span className="detail-variation-name">{name}</span>
    </Link>
  )
}

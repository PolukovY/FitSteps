import { useState } from 'react'
import { ExerciseFigure } from '../components/figure/ExerciseFigure'
import { ChevronRight } from '../components/icons'
import { useT } from '../i18n'
import { LOCALES, LOCALE_LABELS } from '../i18n/locales'
import { useSettings } from '../store/useAppStore'
import './onboarding.css'

/** Shown until a name is stored. One question, one answer, straight into the app. */
export function OnboardingScreen() {
  const t = useT()
  const { locale, setLocale, setName } = useSettings()
  const [value, setValue] = useState('')

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    if (!value.trim()) return
    setName(value)
  }

  return (
    <div className="onboarding">
      <div className="onboarding-inner">
        <div className="onboarding-langs">
          {LOCALES.map((code) => (
            <button
              key={code}
              className={`onboarding-lang${locale === code ? ' on' : ''}`}
              onClick={() => setLocale(code)}
            >
              {LOCALE_LABELS[code]}
            </button>
          ))}
        </div>

        <div className="onboarding-art">
          <ExerciseFigure rig="squat" size={200} speed={0.7} />
        </div>

        <div className="onboarding-brand">
          <span className="onboarding-welcome">{t('onboarding.welcome')}</span>
          <span className="d onboarding-name">FitSteps</span>
          <span className="onboarding-pitch">{t('onboarding.pitch')}</span>
        </div>

        <form className="onboarding-form" onSubmit={submit}>
          <label className="onboarding-question" htmlFor="name">
            {t('onboarding.question')}
          </label>
          <input
            id="name"
            className="onboarding-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t('onboarding.placeholder')}
            maxLength={24}
            autoComplete="given-name"
            enterKeyHint="go"
            autoFocus
          />
          <span className="onboarding-hint">{t('onboarding.hint')}</span>
          <button className="btn btn-primary btn-block" type="submit" disabled={!value.trim()}>
            {t('onboarding.continue')} <ChevronRight size={17} />
          </button>
        </form>
      </div>
    </div>
  )
}

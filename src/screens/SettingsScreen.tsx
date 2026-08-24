import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from '../components/icons'
import { Sheet, Switch } from '../components/ui'
import { getVoiceProvider } from '../engine/voice'
import { useLocale, useT } from '../i18n'
import { LOCALES, LOCALE_LABELS } from '../i18n/locales'
import { useProgress, useSettings } from '../store/useAppStore'
import './settings.css'

export function SettingsScreen() {
  const t = useT()
  const navigate = useNavigate()
  const locale = useLocale()
  const { voiceCoach, sound, vibration, countdown, setLocale, toggle } = useSettings()
  const resetAll = useProgress((s) => s.resetAll)
  const [confirmReset, setConfirmReset] = useState(false)

  const voiceAvailable = getVoiceProvider().available

  return (
    <div className="scroll">
      <div className="screen-pad settings">
        <div className="row" style={{ gap: 12 }}>
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label={t('common.back')}>
            <ChevronLeft />
          </button>
          <h1 className="d settings-title">{t('settings.title')}</h1>
        </div>

        <section className="col settings-group">
          <span className="label">{t('settings.language')}</span>
          <div className="settings-langs">
            {LOCALES.map((code) => (
              <button
                key={code}
                className={`settings-lang${locale === code ? ' on' : ''}`}
                onClick={() => setLocale(code)}
              >
                {LOCALE_LABELS[code]}
                <span>{code === 'en' ? 'English' : 'Українська'}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="col settings-group">
          <Row
            title={t('settings.voiceCoach')}
            hint={voiceAvailable ? t('settings.voiceCoachHint') : t('settings.voiceCoachHint')}
            on={voiceCoach && voiceAvailable}
            disabled={!voiceAvailable}
            onChange={() => toggle('voiceCoach')}
          />
          <Row title={t('settings.sound')} hint={t('settings.soundHint')} on={sound} onChange={() => toggle('sound')} />
          <Row title={t('settings.vibration')} hint={t('settings.vibrationHint')} on={vibration} onChange={() => toggle('vibration')} />
          <Row title={t('settings.countdown')} hint={t('settings.countdownHint')} on={countdown} onChange={() => toggle('countdown')} />
        </section>

        <section className="col settings-group">
          <span className="label">{t('settings.data')}</span>
          <p className="settings-hint">{t('settings.resetHint')}</p>
          <button className="btn btn-ghost btn-block settings-danger" onClick={() => setConfirmReset(true)}>
            {t('settings.resetData')}
          </button>
        </section>

        <p className="settings-about">{t('settings.offline')}</p>
        <div style={{ height: 24 }} />
      </div>

      {confirmReset && (
        <Sheet onClose={() => setConfirmReset(false)}>
          <span className="d settings-confirm">{t('settings.resetConfirm')}</span>
          <div className="col" style={{ gap: 10, marginTop: 16 }}>
            <button className="btn btn-primary btn-block" onClick={() => setConfirmReset(false)}>
              {t('settings.cancel')}
            </button>
            <button
              className="btn btn-ghost btn-block settings-danger"
              onClick={() => {
                resetAll()
                setConfirmReset(false)
                navigate('/', { replace: true })
              }}
            >
              {t('settings.erase')}
            </button>
          </div>
        </Sheet>
      )}
    </div>
  )
}

function Row({
  title, hint, on, onChange, disabled,
}: {
  title: string
  hint: string
  on: boolean
  onChange: () => void
  disabled?: boolean
}) {
  return (
    <div className={`card row settings-row${disabled ? ' disabled' : ''}`}>
      <div className="col grow" style={{ gap: 3 }}>
        <span className="settings-row-title">{title}</span>
        <span className="settings-hint">{hint}</span>
      </div>
      <Switch on={on} onChange={disabled ? () => {} : onChange} />
    </div>
  )
}

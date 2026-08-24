import type { Muscle } from '../data/types'

interface Props {
  side: 'front' | 'back'
  primary: Muscle[]
  secondary: Muscle[]
  width?: number
  /** Continuous 0..1 load per muscle, used by the progress screen instead of primary/secondary. */
  intensity?: Partial<Record<Muscle, number>>
}

const BASE = 'var(--muscle-base)'

/**
 * One simplified body, two faces. Regions are keyed by the same Muscle union
 * the exercise data uses, so a new exercise lights up the map with no extra work.
 */
export function MuscleMap({ side, primary, secondary, width = 62, intensity }: Props) {
  const fill = (...muscles: Muscle[]): string => {
    if (intensity) {
      const value = Math.max(...muscles.map((m) => intensity[m] ?? 0), 0)
      if (value <= 0.02) return BASE
      return `color-mix(in oklab, var(--accent) ${Math.round(18 + value * 82)}%, var(--muscle-base))`
    }
    if (muscles.some((m) => primary.includes(m))) return 'var(--muscle-primary)'
    if (muscles.some((m) => secondary.includes(m))) return 'var(--muscle-secondary)'
    return BASE
  }

  const height = Math.round((width * 192) / 100)

  if (side === 'front') {
    return (
      <svg width={width} height={height} viewBox="0 0 100 192" fill="none" aria-hidden="true">
        <circle cx="50" cy="14" r="9" fill={fill('neck')} />
        <rect x="45" y="22" width="10" height="7" rx="3" fill={fill('neck')} />
        <ellipse cx="30" cy="37" rx="9.5" ry="7.5" fill={fill('front_delts', 'side_delts')} />
        <ellipse cx="70" cy="37" rx="9.5" ry="7.5" fill={fill('front_delts', 'side_delts')} />
        <path d="M37 32h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H39a3 3 0 0 1-3-3V34a2 2 0 0 1 1-2z" fill={fill('chest')} />
        <path d="M52 32h11a2 2 0 0 1 1 2v13a3 3 0 0 1-3 3H52a2 2 0 0 1-2-2V34a2 2 0 0 1 2-2z" fill={fill('chest')} />
        <ellipse cx="23" cy="55" rx="6" ry="12" fill={fill('biceps')} />
        <ellipse cx="77" cy="55" rx="6" ry="12" fill={fill('biceps')} />
        <ellipse cx="18" cy="80" rx="5" ry="13" fill={fill('forearms')} />
        <ellipse cx="82" cy="80" rx="5" ry="13" fill={fill('forearms')} />
        <rect x="42" y="53" width="7" height="9" rx="2" fill={fill('abs')} />
        <rect x="51" y="53" width="7" height="9" rx="2" fill={fill('abs')} />
        <rect x="42" y="64" width="7" height="9" rx="2" fill={fill('abs')} />
        <rect x="51" y="64" width="7" height="9" rx="2" fill={fill('abs')} />
        <rect x="42" y="75" width="7" height="9" rx="2" fill={fill('abs')} />
        <rect x="51" y="75" width="7" height="9" rx="2" fill={fill('abs')} />
        <path d="M36 54c-2 8-2 18 1 27l3-2V54z" fill={fill('obliques')} />
        <path d="M64 54c2 8 2 18-1 27l-3-2V54z" fill={fill('obliques')} />
        <path d="M44 90h12v14H44z" fill={fill('hip_flexors')} />
        <ellipse cx="41" cy="120" rx="9.5" ry="24" fill={fill('quadriceps')} />
        <ellipse cx="59" cy="120" rx="9.5" ry="24" fill={fill('quadriceps')} />
        <ellipse cx="47" cy="116" rx="4" ry="18" fill={fill('adductors')} />
        <ellipse cx="53" cy="116" rx="4" ry="18" fill={fill('adductors')} />
        <ellipse cx="40" cy="160" rx="6.5" ry="17" fill={fill('calves')} />
        <ellipse cx="60" cy="160" rx="6.5" ry="17" fill={fill('calves')} />
      </svg>
    )
  }

  return (
    <svg width={width} height={height} viewBox="0 0 100 192" fill="none" aria-hidden="true">
      <circle cx="50" cy="14" r="9" fill={fill('neck')} />
      <path d="M50 24 33 34l4 12h26l4-12z" fill={fill('traps')} />
      <ellipse cx="28" cy="38" rx="9" ry="7" fill={fill('rear_delts', 'side_delts')} />
      <ellipse cx="72" cy="38" rx="9" ry="7" fill={fill('rear_delts', 'side_delts')} />
      <path d="M37 46h12v22l-13-6z" fill={fill('lats')} />
      <path d="M63 46H51v22l13-6z" fill={fill('lats')} />
      <rect x="40" y="70" width="20" height="18" rx="3" fill={fill('lower_back')} />
      <ellipse cx="22" cy="56" rx="6" ry="12" fill={fill('triceps')} />
      <ellipse cx="78" cy="56" rx="6" ry="12" fill={fill('triceps')} />
      <ellipse cx="17" cy="81" rx="5" ry="13" fill={fill('forearms')} />
      <ellipse cx="83" cy="81" rx="5" ry="13" fill={fill('forearms')} />
      <path d="M40 90c-6 0-9 5-9 10s4 9 10 9h8V90z" fill={fill('glutes')} />
      <path d="M60 90c6 0 9 5 9 10s-4 9-10 9h-8V90z" fill={fill('glutes')} />
      <path d="M31 92c-4 2-5 8-3 12l6-3z" fill={fill('abductors')} />
      <path d="M69 92c4 2 5 8 3 12l-6-3z" fill={fill('abductors')} />
      <ellipse cx="41" cy="130" rx="9" ry="21" fill={fill('hamstrings')} />
      <ellipse cx="59" cy="130" rx="9" ry="21" fill={fill('hamstrings')} />
      <ellipse cx="40" cy="164" rx="6.5" ry="16" fill={fill('calves')} />
      <ellipse cx="60" cy="164" rx="6.5" ry="16" fill={fill('calves')} />
    </svg>
  )
}

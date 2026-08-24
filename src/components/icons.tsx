/** One stroke style, 24px grid — icons scale and recolour with the text. */
interface P {
  size?: number
  className?: string
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export const HomeIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /></svg>
)
export const CalendarIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><rect x="3.5" y="5" width="17" height="15" rx="2.5" /><path d="M8 3v4M16 3v4M3.5 10h17" /></svg>
)
export const DumbbellIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M4 9v6M8 7v10M16 7v10M20 9v6M8 12h8" /></svg>
)
export const ChartIcon = ({ size = 22 }: P) => (
  <svg {...base(size)}><path d="M5 19V9M12 19V5M19 19v-6" /></svg>
)
export const ClockIcon = ({ size = 16 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
)
export const FlameIcon = ({ size = 16 }: P) => (
  <svg {...base(size)}><path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-1.5.7-2.8 1.7-4 .2 1.2.8 2 1.8 2.4C10.2 8 10.6 5.4 12 3z" /></svg>
)
export const PlayIcon = ({ size = 17 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l11-6.5z" /></svg>
)
export const PauseIcon = ({ size = 18 }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><rect x="7" y="5" width="4" height="14" rx="1.4" /><rect x="13" y="5" width="4" height="14" rx="1.4" /></svg>
)
export const CheckIcon = ({ size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2.8}><path d="M5 12.5 10 17l9-10" /></svg>
)
export const CloseIcon = ({ size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const ChevronLeft = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M15 6l-6 6 6 6" /></svg>
)
export const ChevronRight = ({ size = 18 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M9 6l6 6-6 6" /></svg>
)
export const ChevronDown = ({ size = 12 }: P) => (
  <svg {...base(size)} strokeWidth={2.4}><path d="M6 9l6 6 6-6" /></svg>
)
export const SearchIcon = ({ size = 17 }: P) => (
  <svg {...base(size)} strokeWidth={2}><circle cx="11" cy="11" r="6.5" /><path d="M16 16l4 4" /></svg>
)
export const SoundOnIcon = ({ size = 17 }: P) => (
  <svg {...base(size)}><path d="M5 9h3l4-3.5v13L8 15H5z" /><path d="M16 9.5a4 4 0 0 1 0 5" /></svg>
)
export const SoundOffIcon = ({ size = 17 }: P) => (
  <svg {...base(size)}><path d="M5 9h3l4-3.5v13L8 15H5z" /><path d="M16 10l4 4M20 10l-4 4" /></svg>
)
export const SwapIcon = ({ size = 16 }: P) => (
  <svg {...base(size)}><path d="M4 8h13l-3-3M20 16H7l3 3" /></svg>
)
export const SparkIcon = ({ size = 16 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M12 3v3M12 18v3M4.2 12H7M17 12h2.8M6.3 6.3l2 2M15.7 15.7l2 2M17.7 6.3l-2 2M8.3 15.7l-2 2" /></svg>
)
export const SettingsIcon = ({ size = 20 }: P) => (
  <svg {...base(size)}><circle cx="12" cy="12" r="3.2" /><path d="M19.4 13.5a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V20a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H4a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1A2 2 0 1 1 8.1 3l.1.1a1.6 1.6 0 0 0 1.8.3H10a1.6 1.6 0 0 0 1-1.5V2a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V10a1.6 1.6 0 0 0 1.5 1H22a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.5 1z" /></svg>
)
export const PlusIcon = ({ size = 15 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M12 6v12M6 12h12" /></svg>
)
export const SkipIcon = ({ size = 15 }: P) => (
  <svg {...base(size)} strokeWidth={2}><path d="M6 5l9 7-9 7zM18 5v14" /></svg>
)
export const HeartIcon = ({ size = 17 }: P) => (
  <svg {...base(size)}><path d="M12 20s-7-4.5-7-9.5A3.8 3.8 0 0 1 12 8a3.8 3.8 0 0 1 7 2.5C19 15.5 12 20 12 20z" /></svg>
)

/** Local calendar day key. Streaks and weekly grids are calendar concepts. */
export function dayKey(d: Date | number = new Date()): string {
  const date = typeof d === 'number' ? new Date(d) : d
  const m = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${date.getFullYear()}-${m}-${day}`
}

export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split('-').map(Number)
  const date = new Date(y, m - 1, d)
  date.setDate(date.getDate() + delta)
  return dayKey(date)
}

/** Monday-first week containing `from`. */
export function weekDays(from: Date = new Date()): string[] {
  const date = new Date(from)
  const offset = (date.getDay() + 6) % 7
  date.setDate(date.getDate() - offset)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(date)
    d.setDate(d.getDate() + i)
    return dayKey(d)
  })
}

export function formatDuration(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = Math.floor(totalSeconds % 60)
  return `${m}:${`${s}`.padStart(2, '0')}`
}

export function formatClock(totalSeconds: number): string {
  const m = Math.floor(Math.max(0, totalSeconds) / 60)
  const s = Math.floor(Math.max(0, totalSeconds) % 60)
  return `${`${m}`.padStart(2, '0')}:${`${s}`.padStart(2, '0')}`
}

export function formatTrainingTime(totalSeconds: number): { h: number; m: number } {
  return { h: Math.floor(totalSeconds / 3600), m: Math.round((totalSeconds % 3600) / 60) }
}

import { addDays, dayKey } from './dates'

/**
 * Current streak counts back from today, tolerating a workout-free today so
 * an unfinished day does not visibly break the run until it actually lapses.
 */
export function currentStreak(dates: string[]): number {
  const set = new Set(dates)
  const today = dayKey()
  let cursor = set.has(today) ? today : addDays(today, -1)
  let streak = 0
  while (set.has(cursor)) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function longestStreak(dates: string[]): number {
  const sorted = [...new Set(dates)].sort()
  let best = 0
  let run = 0
  let prev: string | null = null
  for (const d of sorted) {
    run = prev && addDays(prev, 1) === d ? run + 1 : 1
    best = Math.max(best, run)
    prev = d
  }
  return best
}

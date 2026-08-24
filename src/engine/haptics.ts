function vibrate(pattern: number | number[]): void {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return
  try {
    navigator.vibrate(pattern)
  } catch {
    // Vibration is a nicety; a browser refusing it must never break a workout.
  }
}

export const haptics = {
  tick: () => vibrate(18),
  go: () => vibrate([0, 60]),
  done: () => vibrate([0, 35, 60, 35]),
  rest: () => vibrate(25),
  complete: () => vibrate([0, 70, 90, 70, 90, 140]),
}

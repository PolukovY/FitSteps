import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { BottomNav } from './components/BottomNav'
import { HomeScreen } from './screens/HomeScreen'
import { ProgramsScreen } from './screens/ProgramsScreen'
import { ProgramDetailScreen } from './screens/ProgramDetailScreen'
import { LibraryScreen } from './screens/LibraryScreen'
import { ExerciseDetailScreen } from './screens/ExerciseDetailScreen'
import { ProgressScreen } from './screens/ProgressScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import { WorkoutIntroScreen } from './screens/WorkoutIntroScreen'
import { PlayerScreen } from './screens/PlayerScreen'
import { CompleteScreen } from './screens/CompleteScreen'

/** The tab bar belongs to the browsing screens only — the workout is full screen. */
const TAB_ROUTES = ['/', '/programs', '/library', '/progress']

function Shell() {
  const { pathname } = useLocation()
  const showNav = TAB_ROUTES.includes(pathname)

  return (
    <div className="app-frame">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/programs" element={<ProgramsScreen />} />
        <Route path="/programs/:programId" element={<ProgramDetailScreen />} />
        <Route path="/library" element={<LibraryScreen />} />
        <Route path="/library/:exerciseId" element={<ExerciseDetailScreen />} />
        <Route path="/progress" element={<ProgressScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="/workout/:workoutId" element={<WorkoutIntroScreen />} />
        <Route path="/play" element={<PlayerScreen />} />
        <Route path="/complete" element={<CompleteScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {showNav && <BottomNav />}
    </div>
  )
}

export function App() {
  return (
    <HashRouter>
      <Shell />
    </HashRouter>
  )
}

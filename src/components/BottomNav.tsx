import { NavLink } from 'react-router-dom'
import { useT } from '../i18n'
import { CalendarIcon, ChartIcon, DumbbellIcon, HomeIcon } from './icons'

const TABS = [
  { to: '/', key: 'nav.home', Icon: HomeIcon, end: true },
  { to: '/programs', key: 'nav.programs', Icon: CalendarIcon, end: false },
  { to: '/library', key: 'nav.library', Icon: DumbbellIcon, end: false },
  { to: '/progress', key: 'nav.progress', Icon: ChartIcon, end: false },
]

export function BottomNav() {
  const t = useT()
  return (
    <nav className="nav">
      {TABS.map(({ to, key, Icon, end }) => (
        <NavLink key={to} to={to} end={end} className={({ isActive }) => (isActive ? 'active' : undefined)}>
          <Icon />
          <span>{t(key)}</span>
        </NavLink>
      ))}
    </nav>
  )
}

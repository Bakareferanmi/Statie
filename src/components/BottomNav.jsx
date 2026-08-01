import { NavLink } from 'react-router-dom'
import { FiActivity, FiCalendar, FiUsers, FiTarget, FiMessageCircle } from 'react-icons/fi'
import './bottomnav.css'

const LINKS = [
  { to: '/', label: 'Livescores', Icon: FiActivity },
  { to: '/fixtures', label: 'Fixtures', Icon: FiCalendar },
  { to: '/lineups', label: 'Lineups', Icon: FiUsers },
  { to: '/betting-tips', label: 'Tips', Icon: FiTarget },
  { to: '/chat', label: 'Chat', Icon: FiMessageCircle },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {LINKS.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          end={to === '/'}
        >
          <Icon className="nav-icon" />
          <span className="nav-label">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

import { NavLink } from 'react-router-dom'
import { FiHome, FiCalendar, FiUsers, FiRepeat, FiTarget, FiMessageCircle } from 'react-icons/fi'
import './bottomnav.css'

const LINKS = [
  { to: '/', label: 'Home', Icon: FiHome },
  { to: '/fixtures', label: 'Fixtures', Icon: FiCalendar },
  { to: '/lineups', label: 'Lineups', Icon: FiUsers },
  { to: '/transfers', label: 'Transfers', Icon: FiRepeat },
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

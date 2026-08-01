import { NavLink } from 'react-router-dom'
import { FiCalendar, FiUsers, FiTarget, FiMessageCircle } from 'react-icons/fi'
import { GiSoccerBall } from 'react-icons/gi'
import './bottomnav.css'

const LINKS = [
  { to: '/', label: 'Livescores', Icon: GiSoccerBall },
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

import { NavLink } from 'react-router-dom'
import './bottomnav.css'

const LINKS = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/fixtures', label: 'Fixtures', icon: '📅' },
  { to: '/lineups', label: 'Lineups', icon: '⚽' },
  { to: '/transfers', label: 'Transfers', icon: '🔁' },
  { to: '/betting-tips', label: 'Tips', icon: '🎯' },
  { to: '/chat', label: 'Chat', icon: '💬' },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {LINKS.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
          end={link.to === '/'}
        >
          <span className="nav-icon">{link.icon}</span>
          <span className="nav-label">{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

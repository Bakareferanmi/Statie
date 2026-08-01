import { NavLink } from 'react-router-dom'
import './bottomnav.css'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/fixtures', label: 'Fixtures' },
  { to: '/lineups', label: 'Lineups' },
  { to: '/transfers', label: 'Transfers' },
  { to: '/betting-tips', label: 'Tips' },
  { to: '/chat', label: 'Chat' },
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
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}

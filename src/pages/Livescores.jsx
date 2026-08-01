import { FiCircle } from 'react-icons/fi'
import logo from '../assets/statie-logo.png'
import './livescores.css'

const MOCK_LIVE = [
  { home: 'Arsenal', away: 'Chelsea', homeScore: 1, awayScore: 0, minute: "63'", competition: 'Premier League' },
  { home: 'Real Madrid', away: 'Barcelona', homeScore: 2, awayScore: 2, minute: "78'", competition: 'La Liga' },
]

const MOCK_UPCOMING = [
  { home: 'Man City', away: 'Liverpool', time: 'Today, 7:45 PM', competition: 'Premier League' },
  { home: 'PSG', away: 'Bayern Munich', time: 'Today, 9:00 PM', competition: 'Champions League' },
]

export default function Livescores() {
  return (
    <div className="page livescores-page">
      <div className="ls-header">
        <img src={logo} alt="Statie" className="ls-logo" />
        <h1>Livescores</h1>
      </div>

      <section className="ls-section">
        <span className="ls-label live"><FiCircle /> Live now</span>
        {MOCK_LIVE.map((m, i) => (
          <div key={i} className="ls-card live-card">
            <span className="ls-competition">{m.competition}</span>
            <div className="ls-match-row">
              <span className="ls-team">{m.home}</span>
              <span className="ls-score">{m.homeScore} - {m.awayScore}</span>
              <span className="ls-team">{m.away}</span>
            </div>
            <span className="ls-minute">{m.minute}</span>
          </div>
        ))}
      </section>

      <section className="ls-section">
        <span className="ls-label">Upcoming today</span>
        {MOCK_UPCOMING.map((m, i) => (
          <div key={i} className="ls-card">
            <span className="ls-competition">{m.competition}</span>
            <div className="ls-match-row">
              <span className="ls-team">{m.home}</span>
              <span className="ls-vs">vs</span>
              <span className="ls-team">{m.away}</span>
            </div>
            <span className="ls-time">{m.time}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

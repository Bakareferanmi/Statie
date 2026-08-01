import { FiCalendar } from 'react-icons/fi'
import './fixtures.css'

const MOCK_FIXTURES = {
  Today: [
    { home: 'Man City', away: 'Liverpool', time: '7:45 PM', competition: 'Premier League' },
    { home: 'PSG', away: 'Bayern Munich', time: '9:00 PM', competition: 'Champions League' },
  ],
  Tomorrow: [
    { home: 'Barcelona', away: 'Atletico Madrid', time: '4:00 PM', competition: 'La Liga' },
    { home: 'Juventus', away: 'AC Milan', time: '6:30 PM', competition: 'Serie A' },
    { home: 'Dortmund', away: 'Leverkusen', time: '8:00 PM', competition: 'Bundesliga' },
  ],
  'Sat, Aug 8': [
    { home: 'Arsenal', away: 'Tottenham', time: '12:30 PM', competition: 'Premier League' },
  ],
}

export default function Fixtures() {
  return (
    <div className="page fixtures-page">
      <div className="fx-header">
        <FiCalendar className="fx-header-icon" />
        <h1>Fixtures</h1>
      </div>

      {Object.entries(MOCK_FIXTURES).map(([day, matches]) => (
        <section key={day} className="fx-section">
          <span className="fx-label">{day}</span>
          {matches.map((m, i) => (
            <div key={i} className="fx-card">
              <span className="fx-competition">{m.competition}</span>
              <div className="fx-match-row">
                <span className="fx-team">{m.home}</span>
                <span className="fx-time">{m.time}</span>
                <span className="fx-team">{m.away}</span>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { FiCalendar } from 'react-icons/fi'
import { getFixtures } from '../api.js'
import './fixtures.css'

function formatDate(utcDate) {
  return new Date(utcDate).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Fixtures() {
  const [fixtures, setFixtures] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getFixtures()
        setFixtures(data)
        setError(null)
      } catch (err) {
        setError('Could not load fixtures. The server may be waking up — try again shortly.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page fixtures-page">
      <div className="fx-header">
        <FiCalendar className="fx-header-icon" />
        <h1>Fixtures</h1>
      </div>

      {loading && <p>Loading fixtures...</p>}
      {error && <p className="fx-error">{error}</p>}

      {!loading && !error && (
        <div className="fx-list">
          {fixtures.length === 0 && <p className="fx-empty">No upcoming fixtures found.</p>}
          {fixtures.map((m) => (
            <div key={m.id} className="fx-card">
              <span className="fx-competition">{m.competition?.name}</span>
              <div className="fx-match-row">
                <span className="fx-team">{m.homeTeam?.name}</span>
                <span className="fx-vs">vs</span>
                <span className="fx-team">{m.awayTeam?.name}</span>
              </div>
              <span className="fx-time">{formatDate(m.utcDate)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

import { useState, useEffect } from 'react'
import { FiCircle } from 'react-icons/fi'
import logo from '../assets/statie-logo.png'
import { getLiveScores, getFixtures } from '../api.js'
import './livescores.css'

function formatTime(utcDate) {
  return new Date(utcDate).toLocaleString('en-US', {
    weekday: 'short',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function Livescores() {
  const [live, setLive] = useState([])
  const [upcoming, setUpcoming] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [liveMatches, fixtures] = await Promise.all([
          getLiveScores(),
          getFixtures(),
        ])
        setLive(liveMatches)
        setUpcoming(fixtures.slice(0, 5))
        setError(null)
      } catch (err) {
        setError('Could not load data. The server may be waking up — try again in a moment.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  return (
    <div className="page livescores-page">
      <div className="ls-header">
        <img src={logo} alt="Statie" className="ls-logo" />
        <h1>Livescores</h1>
      </div>

      {loading && <p>Loading matches...</p>}
      {error && <p className="ls-error">{error}</p>}

      {!loading && !error && (
        <>
          <section className="ls-section">
            <span className="ls-label live"><FiCircle /> Live now</span>
            {live.length === 0 && <p className="ls-empty">No live matches right now.</p>}
            {live.map((m) => (
              <div key={m.id} className="ls-card live-card">
                <span className="ls-competition">{m.competition?.name}</span>
                <div className="ls-match-row">
                  <span className="ls-team">{m.homeTeam?.name}</span>
                  <span className="ls-score">
                    {m.score?.fullTime?.home ?? 0} - {m.score?.fullTime?.away ?? 0}
                  </span>
                  <span className="ls-team">{m.awayTeam?.name}</span>
                </div>
                <span className="ls-minute">{m.status}</span>
              </div>
            ))}
          </section>

          <section className="ls-section">
            <span className="ls-label">Upcoming</span>
            {upcoming.length === 0 && <p className="ls-empty">No upcoming matches found.</p>}
            {upcoming.map((m) => (
              <div key={m.id} className="ls-card">
                <span className="ls-competition">{m.competition?.name}</span>
                <div className="ls-match-row">
                  <span className="ls-team">{m.homeTeam?.name}</span>
                  <span className="ls-vs">vs</span>
                  <span className="ls-team">{m.awayTeam?.name}</span>
                </div>
                <span className="ls-time">{formatTime(m.utcDate)}</span>
              </div>
            ))}
          </section>
        </>
      )}
    </div>
  )
}

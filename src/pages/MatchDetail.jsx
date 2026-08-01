import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiStar } from 'react-icons/fi'
import { getMatchById } from '../data/matches'
import { isFavorite, toggleFavorite } from '../utils/favorites'
import { useState } from 'react'
import './matchdetail.css'

const MOCK_TIMELINE = [
  { minute: "12'", event: 'Yellow card', team: 'away' },
  { minute: "34'", event: 'Goal', team: 'home' },
  { minute: "58'", event: 'Substitution', team: 'home' },
]

const MOCK_STATS = [
  { label: 'Possession', home: 58, away: 42, unit: '%' },
  { label: 'Shots on target', home: 6, away: 3, unit: '' },
  { label: 'Corners', home: 7, away: 4, unit: '' },
]

export default function MatchDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const match = getMatchById(id)
  const [favorites, setFavorites] = useState(() =>
    match ? [match.home, match.away].filter(isFavorite) : []
  )

  if (!match) {
    return (
      <div className="page">
        <button className="md-back" onClick={() => navigate(-1)}>
          <FiArrowLeft /> Back
        </button>
        <p>Match not found.</p>
      </div>
    )
  }

  function handleToggle(team) {
    toggleFavorite(team)
    setFavorites((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    )
  }

  const isLive = match.status === 'live'

  return (
    <div className="page match-detail-page">
      <button className="md-back" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Back
      </button>

      <div className="md-hero">
        <span className="md-competition">{match.competition}</span>

        <div className="md-teams">
          <div className="md-team">
            <span className="md-team-name">{match.home}</span>
            <button
              className={`md-star ${favorites.includes(match.home) ? 'active' : ''}`}
              onClick={() => handleToggle(match.home)}
            >
              <FiStar />
            </button>
          </div>

          <div className="md-score-block">
            {isLive ? (
              <>
                <span className="md-score">
                  {match.homeScore} - {match.awayScore}
                </span>
                <span className="md-minute">{match.minute}</span>
              </>
            ) : (
              <>
                <span className="md-vs">vs</span>
                <span className="md-time">
                  {match.day}, {match.time}
                </span>
              </>
            )}
          </div>

          <div className="md-team">
            <button
              className={`md-star ${favorites.includes(match.away) ? 'active' : ''}`}
              onClick={() => handleToggle(match.away)}
            >
              <FiStar />
            </button>
            <span className="md-team-name">{match.away}</span>
          </div>
        </div>
      </div>

      {isLive && (
        <section className="md-section">
          <h2>Match stats</h2>
          {MOCK_STATS.map((s) => (
            <div key={s.label} className="md-stat-row">
              <span className="md-stat-value">
                {s.home}
                {s.unit}
              </span>
              <div className="md-stat-mid">
                <span className="md-stat-label">{s.label}</span>
                <div className="md-stat-bar">
                  <div
                    className="md-stat-fill"
                    style={{ width: `${(s.home / (s.home + s.away)) * 100}%` }}
                  />
                </div>
              </div>
              <span className="md-stat-value">
                {s.away}
                {s.unit}
              </span>
            </div>
          ))}
        </section>
      )}

      {isLive && (
        <section className="md-section">
          <h2>Timeline</h2>
          {MOCK_TIMELINE.map((t, i) => (
            <div key={i} className={`md-timeline-item ${t.team}`}>
              <span className="md-timeline-minute">{t.minute}</span>
              <span className="md-timeline-event">{t.event}</span>
            </div>
          ))}
        </section>
      )}

      {!isLive && (
        <section className="md-section">
          <p className="md-upcoming-note">
            Kickoff stats and lineups will appear here once the match begins.
          </p>
        </section>
      )}
    </div>
  )
}

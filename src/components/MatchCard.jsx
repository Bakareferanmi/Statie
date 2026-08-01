import { useNavigate } from 'react-router-dom'
import { FiStar } from 'react-icons/fi'
import './matchcard.css'

export default function MatchCard({ match, favorites, onToggleFavorite }) {
  const navigate = useNavigate()
  const isLive = match.status === 'live'

  function handleStarClick(e, team) {
    e.stopPropagation()
    onToggleFavorite(team)
  }

  return (
    <div
      className={`mc-card ${isLive ? 'mc-live' : ''}`}
      onClick={() => navigate(`/match/${match.id}`)}
      role="button"
      tabIndex={0}
    >
      <div className="mc-top">
        <span className="mc-competition">{match.competition}</span>
        {isLive ? (
          <span className="mc-minute">{match.minute}</span>
        ) : (
          <span className="mc-time">{match.time}</span>
        )}
      </div>

      <div className="mc-match-row">
        <div className="mc-team">
          <button
            className={`mc-star ${favorites.includes(match.home) ? 'active' : ''}`}
            onClick={(e) => handleStarClick(e, match.home)}
            aria-label={`Follow ${match.home}`}
          >
            <FiStar />
          </button>
          <span>{match.home}</span>
        </div>

        {isLive ? (
          <span className="mc-score">
            {match.homeScore} - {match.awayScore}
          </span>
        ) : (
          <span className="mc-vs">vs</span>
        )}

        <div className="mc-team right">
          <span>{match.away}</span>
          <button
            className={`mc-star ${favorites.includes(match.away) ? 'active' : ''}`}
            onClick={(e) => handleStarClick(e, match.away)}
            aria-label={`Follow ${match.away}`}
          >
            <FiStar />
          </button>
        </div>
      </div>
    </div>
  )
}

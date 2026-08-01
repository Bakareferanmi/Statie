import { useState, useEffect } from 'react'
import { FiUsers } from 'react-icons/fi'
import { getFixtures, getLineups } from '../api.js'
import './lineups.css'

export default function Lineups() {
  const [matches, setMatches] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [lineupData, setLineupData] = useState(null)
  const [loadingMatches, setLoadingMatches] = useState(true)
  const [loadingLineup, setLoadingLineup] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoadingMatches(true)
        const data = await getFixtures()
        setMatches(data.slice(0, 10))
      } catch (err) {
        setError('Could not load matches. The server may be waking up.')
      } finally {
        setLoadingMatches(false)
      }
    }
    loadMatches()
  }, [])

  async function selectMatch(id) {
    setSelectedId(id)
    setLineupData(null)
    setError(null)
    try {
      setLoadingLineup(true)
      const data = await getLineups(id)
      setLineupData(data)
    } catch (err) {
      setError('Lineup not available yet for this match.')
    } finally {
      setLoadingLineup(false)
    }
  }

  return (
    <div className="page lineups-page">
      <div className="lu-header">
        <FiUsers className="lu-header-icon" />
        <h1>Lineups</h1>
      </div>

      {loadingMatches && <p>Loading matches...</p>}

      {!loadingMatches && (
        <div className="lu-match-picker">
          {matches.map((m) => (
            <button
              key={m.id}
              className={`lu-match-chip ${selectedId === m.id ? 'selected' : ''}`}
              onClick={() => selectMatch(m.id)}
            >
              {m.homeTeam?.name} vs {m.awayTeam?.name}
            </button>
          ))}
        </div>
      )}

      {loadingLineup && <p>Loading lineup...</p>}
      {error && <p className="lu-error">{error}</p>}

      {lineupData && !loadingLineup && (
        <div className="lu-teams">
          <div className="lu-team-block">
            <h2>{lineupData.homeTeam?.name}</h2>
            <ul>
              {(lineupData.homeTeam?.lineup || []).map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
              {(!lineupData.homeTeam?.lineup || lineupData.homeTeam.lineup.length === 0) && (
                <li className="lu-empty">Lineup not announced yet</li>
              )}
            </ul>
          </div>
          <div className="lu-team-block">
            <h2>{lineupData.awayTeam?.name}</h2>
            <ul>
              {(lineupData.awayTeam?.lineup || []).map((p) => (
                <li key={p.id}>{p.name}</li>
              ))}
              {(!lineupData.awayTeam?.lineup || lineupData.awayTeam.lineup.length === 0) && (
                <li className="lu-empty">Lineup not announced yet</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

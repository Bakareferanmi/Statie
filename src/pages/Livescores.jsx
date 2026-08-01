import { FiCircle } from 'react-icons/fi'
import { useState, useMemo } from 'react'
import logo from '../assets/statie-logo.png'
import { MATCHES, getCompetitions } from '../data/matches'
import { getFavorites, toggleFavorite } from '../utils/favorites'
import FilterBar from '../components/FilterBar.jsx'
import MatchCard from '../components/MatchCard.jsx'
import './livescores.css'

export default function Livescores() {
  const [competition, setCompetition] = useState('All')
  const [search, setSearch] = useState('')
  const [favorites, setFavorites] = useState(getFavorites())

  function handleToggleFavorite(team) {
    setFavorites(toggleFavorite(team))
  }

  const filtered = useMemo(() => {
    return MATCHES.filter((m) => {
      const matchesCompetition = competition === 'All' || m.competition === competition
      const matchesSearch =
        search.trim() === '' ||
        m.home.toLowerCase().includes(search.toLowerCase()) ||
        m.away.toLowerCase().includes(search.toLowerCase())
      return matchesCompetition && matchesSearch
    })
  }, [competition, search])

  const live = filtered.filter((m) => m.status === 'live')
  const upcoming = filtered.filter((m) => m.status === 'upcoming')

  return (
    <div className="page livescores-page">
      <div className="ls-header">
        <img src={logo} alt="Statie" className="ls-logo" />
        <h1>Livescores</h1>
      </div>

      <FilterBar
        competitions={getCompetitions()}
        activeCompetition={competition}
        onCompetitionChange={setCompetition}
        search={search}
        onSearchChange={setSearch}
      />

      {live.length > 0 && (
        <section className="ls-section">
          <span className="ls-label live">
            <FiCircle /> Live now
          </span>
          {live.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="ls-section">
          <span className="ls-label">Upcoming</span>
          {upcoming.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      )}

      {filtered.length === 0 && <p className="ls-empty">No matches match your filters.</p>}
    </div>
  )
}

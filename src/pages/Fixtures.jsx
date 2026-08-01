import { FiCalendar } from 'react-icons/fi'
import { useState, useMemo } from 'react'
import { MATCHES, getCompetitions } from '../data/matches'
import { getFavorites, toggleFavorite } from '../utils/favorites'
import FilterBar from '../components/FilterBar.jsx'
import MatchCard from '../components/MatchCard.jsx'
import './fixtures.css'

export default function Fixtures() {
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

  const grouped = useMemo(() => {
    const map = {}
    filtered.forEach((m) => {
      if (!map[m.day]) map[m.day] = []
      map[m.day].push(m)
    })
    return map
  }, [filtered])

  return (
    <div className="page fixtures-page">
      <div className="fx-header">
        <FiCalendar className="fx-header-icon" />
        <h1>Fixtures</h1>
      </div>

      <FilterBar
        competitions={getCompetitions()}
        activeCompetition={competition}
        onCompetitionChange={setCompetition}
        search={search}
        onSearchChange={setSearch}
      />

      {Object.entries(grouped).map(([day, matches]) => (
        <section key={day} className="fx-section">
          <span className="fx-label">{day}</span>
          {matches.map((m) => (
            <MatchCard
              key={m.id}
              match={m}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </section>
      ))}

      {filtered.length === 0 && <p className="fx-empty">No fixtures match your filters.</p>}
    </div>
  )
}

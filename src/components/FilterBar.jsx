import { FiSearch } from 'react-icons/fi'
import './filterbar.css'

export default function FilterBar({
  competitions,
  activeCompetition,
  onCompetitionChange,
  search,
  onSearchChange,
}) {
  return (
    <div className="filter-bar">
      <div className="filter-search">
        <FiSearch className="filter-search-icon" />
        <input
          type="text"
          placeholder="Search team..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <div className="filter-chips">
        <button
          className={`filter-chip ${activeCompetition === 'All' ? 'active' : ''}`}
          onClick={() => onCompetitionChange('All')}
        >
          All
        </button>
        {competitions.map((c) => (
          <button
            key={c}
            className={`filter-chip ${activeCompetition === c ? 'active' : ''}`}
            onClick={() => onCompetitionChange(c)}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

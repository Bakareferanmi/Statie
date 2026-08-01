import './lineups.css'

// Formation string e.g. "4-3-3" -> rows of outfield players.
// GK is always a solo row added in front of the formation.
function getPositions(formation) {
  const rows = formation.split('-').map(Number)
  const allRows = [1, ...rows] // GK + outfield rows
  const rowCount = allRows.length
  const positions = []

  allRows.forEach((count, rowIndex) => {
    for (let i = 0; i < count; i++) {
      const x = ((i + 1) / (count + 1)) * 100
      positions.push({ rowIndex, x })
    }
  })
  return { positions, rowCount }
}

function layoutTeam(formation, side) {
  const { positions, rowCount } = getPositions(formation)
  return positions.map((p) => {
    const t = rowCount === 1 ? 0 : p.rowIndex / (rowCount - 1)
    const y = side === 'home' ? 95 - t * 40 : 5 + t * 40
    return { ...p, y }
  })
}

const HOME_TEAM = {
  name: 'Arsenal',
  formation: '4-3-3',
  players: [
    { number: 1, name: 'Raya' },
    { number: 2, name: 'White' },
    { number: 6, name: 'Gabriel' },
    { number: 4, name: 'Saliba' },
    { number: 3, name: 'Zinchenko' },
    { number: 5, name: 'Rice' },
    { number: 8, name: 'Odegaard' },
    { number: 7, name: 'Havertz' },
    { number: 11, name: 'Martinelli' },
    { number: 9, name: 'Jesus' },
    { number: 35, name: 'Trossard' },
  ],
}

const AWAY_TEAM = {
  name: 'Chelsea',
  formation: '4-2-3-1',
  players: [
    { number: 1, name: 'Sanchez' },
    { number: 2, name: 'James' },
    { number: 6, name: 'Silva' },
    { number: 4, name: 'Badiashile' },
    { number: 21, name: 'Cucurella' },
    { number: 5, name: 'Caicedo' },
    { number: 8, name: 'Enzo' },
    { number: 20, name: 'Palmer' },
    { number: 7, name: 'Sterling' },
    { number: 17, name: 'Mudryk' },
    { number: 9, name: 'Jackson' },
  ],
}

function Team({ team, side }) {
  const layout = layoutTeam(team.formation, side)
  return (
    <>
      {team.players.map((player, i) => {
        const pos = layout[i]
        return (
          <div
            key={player.number}
            className={`lu-player ${side}`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <span className="lu-dot">{player.number}</span>
            <span className="lu-name">{player.name}</span>
          </div>
        )
      })}
    </>
  )
}

export default function Lineups() {
  return (
    <div className="page lineups-page">
      <h1>Lineups</h1>

      <div className="lu-teams-header">
        <div className="lu-team-info">
          <span className="lu-team-name">{HOME_TEAM.name}</span>
          <span className="lu-formation">{HOME_TEAM.formation}</span>
        </div>
        <span className="lu-vs">vs</span>
        <div className="lu-team-info right">
          <span className="lu-team-name">{AWAY_TEAM.name}</span>
          <span className="lu-formation">{AWAY_TEAM.formation}</span>
        </div>
      </div>

      <div className="lu-pitch">
        <div className="lu-halfway-line" />
        <div className="lu-center-circle" />
        <div className="lu-goal-box top" />
        <div className="lu-goal-box bottom" />
        <Team team={HOME_TEAM} side="home" />
        <Team team={AWAY_TEAM} side="away" />
      </div>

      <p className="lu-note">Lineups are provisional and may change closer to kickoff.</p>
    </div>
  )
}

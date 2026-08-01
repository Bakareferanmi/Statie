// Central mock match data. In a future iteration this can be swapped
// for a real API call without touching the pages that consume it.

export const MATCHES = [
  {
    id: 'm1',
    home: 'Arsenal',
    away: 'Chelsea',
    homeScore: 1,
    awayScore: 0,
    minute: "63'",
    competition: 'Premier League',
    status: 'live',
    day: 'Today',
    time: '4:30 PM',
  },
  {
    id: 'm2',
    home: 'Real Madrid',
    away: 'Barcelona',
    homeScore: 2,
    awayScore: 2,
    minute: "78'",
    competition: 'La Liga',
    status: 'live',
    day: 'Today',
    time: '3:00 PM',
  },
  {
    id: 'm3',
    home: 'Man City',
    away: 'Liverpool',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'Premier League',
    status: 'upcoming',
    day: 'Today',
    time: '7:45 PM',
  },
  {
    id: 'm4',
    home: 'PSG',
    away: 'Bayern Munich',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'Champions League',
    status: 'upcoming',
    day: 'Today',
    time: '9:00 PM',
  },
  {
    id: 'm5',
    home: 'Barcelona',
    away: 'Atletico Madrid',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'La Liga',
    status: 'upcoming',
    day: 'Tomorrow',
    time: '4:00 PM',
  },
  {
    id: 'm6',
    home: 'Juventus',
    away: 'AC Milan',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'Serie A',
    status: 'upcoming',
    day: 'Tomorrow',
    time: '6:30 PM',
  },
  {
    id: 'm7',
    home: 'Dortmund',
    away: 'Leverkusen',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'Bundesliga',
    status: 'upcoming',
    day: 'Tomorrow',
    time: '8:00 PM',
  },
  {
    id: 'm8',
    home: 'Arsenal',
    away: 'Tottenham',
    homeScore: null,
    awayScore: null,
    minute: null,
    competition: 'Premier League',
    status: 'upcoming',
    day: 'Sat, Aug 8',
    time: '12:30 PM',
  },
]

export function getMatchById(id) {
  return MATCHES.find((m) => m.id === id)
}

export function getCompetitions() {
  return [...new Set(MATCHES.map((m) => m.competition))]
}

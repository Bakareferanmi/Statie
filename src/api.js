const API_URL = import.meta.env.VITE_API_URL

export async function getLiveScores(competition = 'PL') {
  const res = await fetch(`${API_URL}/fixtures/live?competition=${competition}`)
  if (!res.ok) throw new Error('Failed to fetch live scores')
  const data = await res.json()
  return data.matches || []
}

export async function getFixtures(competition = 'PL') {
  const res = await fetch(`${API_URL}/fixtures/?competition=${competition}`)
  if (!res.ok) throw new Error('Failed to fetch fixtures')
  const data = await res.json()
  return data.matches || []
}

export async function sendChatMessage(message) {
  const res = await fetch(`${API_URL}/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  })
  if (!res.ok) throw new Error('Failed to get response')
  const data = await res.json()
  return data.reply
}

export async function getDailyTip(competition = 'PL') {
  const res = await fetch(`${API_URL}/tips/?competition=${competition}`)
  if (!res.ok) throw new Error('Failed to fetch tip')
  return res.json()
}

export async function getLineups(matchId) {
  const res = await fetch(`${API_URL}/lineups/${matchId}`)
  if (!res.ok) throw new Error('Failed to fetch lineup')
  return res.json()
}

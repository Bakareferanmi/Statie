const KEY = 'statie_favorite_teams'

export function getFavorites() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function isFavorite(team) {
  return getFavorites().includes(team)
}

export function toggleFavorite(team) {
  const current = getFavorites()
  const next = current.includes(team)
    ? current.filter((t) => t !== team)
    : [...current, team]
  localStorage.setItem(KEY, JSON.stringify(next))
  return next
}

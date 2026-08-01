import { useState, useEffect } from 'react'
import { FiTarget } from 'react-icons/fi'
import { getDailyTip } from '../api.js'
import './bettingtips.css'

export default function BettingTips() {
  const [tip, setTip] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getDailyTip()
        if (data.error) {
          setError(data.error)
        } else {
          setTip(data)
          setError(null)
        }
      } catch (err) {
        setError('Could not load tip. The server may be waking up — try again shortly.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="page tips-page">
      <div className="tp-header">
        <FiTarget className="tp-header-icon" />
        <h1>Betting Tips</h1>
      </div>

      {loading && <p>Generating today's tip...</p>}
      {error && <p className="tp-error">{error}</p>}

      {!loading && !error && tip && (
        <div className="tp-card">
          <span className="tp-match">{tip.match}</span>
          <p className="tp-text">{tip.tip}</p>
          <div className="tp-confidence-bar">
            <div className="tp-confidence-fill" style={{ width: `${tip.confidence}%` }} />
          </div>
          <span className="tp-confidence-label">{tip.confidence}% confidence</span>
          <p className="tp-disclaimer">Not guaranteed advice — bet responsibly.</p>
        </div>
      )}
    </div>
  )
}

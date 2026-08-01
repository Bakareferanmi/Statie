import { FiTarget } from 'react-icons/fi'
import './bettingtips.css'

const MOCK_TIPS = [
  {
    match: 'Man City vs Liverpool',
    competition: 'Premier League',
    tip: 'Both Teams to Score',
    confidence: 'High',
    odds: '1.65',
  },
  {
    match: 'PSG vs Bayern Munich',
    competition: 'Champions League',
    tip: 'Over 2.5 Goals',
    confidence: 'High',
    odds: '1.80',
  },
  {
    match: 'Barcelona vs Atletico Madrid',
    competition: 'La Liga',
    tip: 'Barcelona to Win',
    confidence: 'Medium',
    odds: '1.95',
  },
  {
    match: 'Juventus vs AC Milan',
    competition: 'Serie A',
    tip: 'Draw',
    confidence: 'Low',
    odds: '3.20',
  },
]

const CONFIDENCE_CLASS = {
  High: 'high',
  Medium: 'medium',
  Low: 'low',
}

export default function BettingTips() {
  return (
    <div className="page tips-page">
      <div className="tp-header">
        <FiTarget className="tp-header-icon" />
        <h1>Betting Tips</h1>
      </div>

      <div className="tp-list">
        {MOCK_TIPS.map((t, i) => (
          <div key={i} className="tp-card">
            <div className="tp-card-top">
              <span className="tp-competition">{t.competition}</span>
              <span className={`tp-confidence ${CONFIDENCE_CLASS[t.confidence]}`}>
                {t.confidence}
              </span>
            </div>
            <span className="tp-match">{t.match}</span>
            <div className="tp-card-bottom">
              <span className="tp-tip">{t.tip}</span>
              <span className="tp-odds">{t.odds}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="tp-note">
        Tips are for informational purposes only. Bet responsibly and within your means.
      </p>
    </div>
  )
}

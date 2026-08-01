import { FiTrendingUp, FiTarget, FiClock } from 'react-icons/fi'
import logo from '../assets/statie-logo.png'
import './home.css'

const MOCK_MATCH = {
  home: 'Arsenal',
  away: 'Chelsea',
  time: 'Today, 4:30 PM',
  competition: 'Premier League',
}

const MOCK_TIP = {
  text: 'Arsenal to win & both teams to score',
  confidence: 78,
}

const MOCK_NEWS = [
  { title: 'Saka doubtful for Sunday after training injury', time: '2h ago' },
  { title: 'Chelsea close in on January striker target', time: '5h ago' },
  { title: 'Man City confirm De Bruyne return date', time: '8h ago' },
]

export default function Home() {
  return (
    <div className="page home-page">
      <div className="home-header">
        <img src={logo} alt="Statie" className="home-logo" />
        <div>
          <p className="home-greeting">Welcome back</p>
          <h1>Your daily digest</h1>
        </div>
      </div>

      <section className="digest-card featured-card">
        <span className="card-label"><FiClock /> {MOCK_MATCH.time}</span>
        <h2>{MOCK_MATCH.home} vs {MOCK_MATCH.away}</h2>
        <p className="card-sub">{MOCK_MATCH.competition}</p>
      </section>

      <section className="digest-card tip-card">
        <span className="card-label"><FiTarget /> Tip of the day</span>
        <p className="tip-text">{MOCK_TIP.text}</p>
        <div className="confidence-bar">
          <div className="confidence-fill" style={{ width: `${MOCK_TIP.confidence}%` }} />
        </div>
        <span className="confidence-label">{MOCK_TIP.confidence}% confidence</span>
      </section>

      <section className="news-section">
        <span className="card-label"><FiTrendingUp /> Latest news</span>
        {MOCK_NEWS.map((item, i) => (
          <div key={i} className="news-item">
            <p>{item.title}</p>
            <span>{item.time}</span>
          </div>
        ))}
      </section>
    </div>
  )
}

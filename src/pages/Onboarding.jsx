import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiTarget, FiMessageCircle, FiBell } from 'react-icons/fi'
import { GiSoccerBall } from 'react-icons/gi'
import './onboarding.css'

const SLIDES = [
  { title: 'Live fixtures & lineups', text: 'Real-time fixtures, lineups, and scores for the leagues you care about.', Icon: FiCalendar },
  { title: 'Smart tips & predictions', text: 'Statie analyzes the data and gives you tips you can actually use.', Icon: FiTarget },
  { title: 'Chat with Statie', text: 'Ask questions, get explanations, and talk football with your own AI agent.', Icon: FiMessageCircle },
]

const TEAMS = [
  'Manchester United', 'Manchester City', 'Liverpool', 'Arsenal', 'Chelsea',
  'Real Madrid', 'Barcelona', 'Bayern Munich', 'PSG', 'Juventus',
]

export default function Onboarding() {
  const [step, setStep] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [selectedTeams, setSelectedTeams] = useState([])
  const navigate = useNavigate()

  function toggleTeam(team) {
    setSelectedTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    )
  }

  function nextSlide() {
    if (slideIndex < SLIDES.length - 1) {
      setSlideIndex(slideIndex + 1)
    } else {
      setStep(1)
    }
  }

  function finishOnboarding(notificationsEnabled) {
    localStorage.setItem('statie_onboarded', 'true')
    localStorage.setItem('statie_teams', JSON.stringify(selectedTeams))
    localStorage.setItem('statie_notifications', String(notificationsEnabled))
    navigate('/', { replace: true })
  }

  async function requestNotifications() {
    let granted = false
    if ('Notification' in window) {
      const result = await Notification.requestPermission()
      granted = result === 'granted'
    }
    finishOnboarding(granted)
  }

  const FloatingBall = () => (
    <div className="floating-ball-wrap">
      <GiSoccerBall className="floating-ball" />
    </div>
  )

  if (step === 0) {
    const slide = SLIDES[slideIndex]
    const SlideIcon = slide.Icon
    return (
      <div className="onboarding-screen">
        <FloatingBall />
        <div className="onboarding-dots">
          {SLIDES.map((_, i) => (
            <span key={i} className={`dot ${i === slideIndex ? 'active' : ''}`} />
          ))}
        </div>
        <div className="slide-icon-wrap">
          <SlideIcon className="slide-icon" key={slideIndex} />
        </div>
        <h1>{slide.title}</h1>
        <p>{slide.text}</p>
        <button className="primary-btn" onClick={nextSlide}>
          {slideIndex < SLIDES.length - 1 ? 'Next' : 'Get started'}
        </button>
        {slideIndex < SLIDES.length - 1 && (
          <button className="text-btn" onClick={() => setStep(1)}>Skip</button>
        )}
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="onboarding-screen">
        <FloatingBall />
        <h1>Pick your teams</h1>
        <p>Statie will personalize fixtures, news, and tips around these.</p>
        <div className="team-grid">
          {TEAMS.map((team) => (
            <button
              key={team}
              className={`team-chip ${selectedTeams.includes(team) ? 'selected' : ''}`}
              onClick={() => toggleTeam(team)}
            >
              {team}
            </button>
          ))}
        </div>
        <button className="primary-btn" onClick={() => setStep(2)}>Continue</button>
        <button className="text-btn" onClick={() => setStep(2)}>Skip</button>
      </div>
    )
  }

  return (
    <div className="onboarding-screen">
      <FloatingBall />
      <div className="slide-icon-wrap">
        <FiBell className="slide-icon" />
      </div>
      <h1>Stay in the loop</h1>
      <p>Turn on notifications for goal alerts, lineup drops, and daily tips.</p>
      <button className="primary-btn" onClick={requestNotifications}>Enable notifications</button>
      <button className="text-btn" onClick={() => finishOnboarding(false)}>Not now</button>
    </div>
  )
}

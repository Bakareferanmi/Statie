import { Routes, Route, Navigate } from 'react-router-dom'
import Onboarding from './pages/Onboarding.jsx'
import Livescores from './pages/Livescores.jsx'
import Fixtures from './pages/Fixtures.jsx'
import Lineups from './pages/Lineups.jsx'
import BettingTips from './pages/BettingTips.jsx'
import Chat from './pages/Chat.jsx'
import BottomNav from './components/BottomNav.jsx'

function isOnboarded() {
  return localStorage.getItem('statie_onboarded') === 'true'
}

function ProtectedLayout({ children }) {
  if (!isOnboarded()) {
    return <Navigate to="/onboarding" replace />
  }
  return (
    <>
      {children}
      <BottomNav />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={<ProtectedLayout><Livescores /></ProtectedLayout>} />
      <Route path="/fixtures" element={<ProtectedLayout><Fixtures /></ProtectedLayout>} />
      <Route path="/lineups" element={<ProtectedLayout><Lineups /></ProtectedLayout>} />
      <Route path="/betting-tips" element={<ProtectedLayout><BettingTips /></ProtectedLayout>} />
      <Route path="/chat" element={<ProtectedLayout><Chat /></ProtectedLayout>} />
    </Routes>
  )
}

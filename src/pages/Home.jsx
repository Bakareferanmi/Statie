import logo from '../assets/statie-logo.png'

export default function Home() {
  return (
    <div className="page">
      <img src={logo} alt="Statie" style={{ width: 48, height: 48, marginBottom: 12 }} />
      <h1>Statie</h1>
      <p>Your daily digest will show up here.</p>
    </div>
  )
}

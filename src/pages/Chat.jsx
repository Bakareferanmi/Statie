import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import logo from '../assets/statie-logo.png'
import './chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey, I'm Statie. Ask me about fixtures, lineups, or today's tips." },
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  function sendMessage() {
    if (!input.trim()) return
    const userMsg = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')

    // Placeholder response until backend is wired up
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: "I'll be able to answer that properly once I'm connected to live data." },
      ])
    }, 600)
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <img src={logo} alt="Statie" className="chat-logo" />
        <span>Statie</span>
      </div>

      <div className="chat-messages">
        {messages.map((m, i) => (
          <div key={i} className={`chat-bubble ${m.role}`}>
            {m.text}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Statie anything..."
        />
        <button onClick={sendMessage}><FiSend /></button>
      </div>
    </div>
  )
}

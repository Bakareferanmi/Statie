import { useState, useRef, useEffect } from 'react'
import { FiSend } from 'react-icons/fi'
import logo from '../assets/statie-logo.png'
import { sendChatMessage } from '../api.js'
import './chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey, I'm Statie. Ask me about fixtures, lineups, or today's tips." },
  ])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage() {
    if (!input.trim() || sending) return
    const userMsg = { role: 'user', text: input }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setSending(true)

    try {
      const reply = await sendChatMessage(userMsg.text)
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: "Sorry, I couldn't reach the server. The backend may be waking up — try again in a few seconds." },
      ])
    } finally {
      setSending(false)
    }
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
        {sending && <div className="chat-bubble assistant">Statie is thinking...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-bar">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Statie anything..."
          disabled={sending}
        />
        <button onClick={sendMessage} disabled={sending}><FiSend /></button>
      </div>
    </div>
  )
}

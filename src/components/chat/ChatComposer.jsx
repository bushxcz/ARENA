import { useState } from 'react'
import Button from '../ui/Button'
import Input from '../ui/Input'

function ChatComposer({ disabled = false, onSend }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!message.trim() || disabled) {
      return
    }

    onSend(message.trim())
    setMessage('')
  }

  return (
    <form className="flex gap-3" onSubmit={handleSubmit}>
      <Input
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder={disabled ? 'Chat is unavailable right now' : 'Send a message to your team'}
        disabled={disabled}
      />
      <Button type="submit" disabled={disabled || !message.trim()}>
        Send
      </Button>
    </form>
  )
}

export default ChatComposer

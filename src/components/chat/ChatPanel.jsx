import ChatBubble from './ChatBubble'
import ChatComposer from './ChatComposer'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'

function ChatPanel({ currentUserId, messages, onSend, title = 'Team Chat', disabled = false }) {
  return (
    <Card
      title={title}
      description="Instant local updates simulate real-time team coordination during the contest."
      contentClassName="space-y-4"
    >
      <div className="h-[360px] space-y-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/40 p-3">
        {messages.length ? (
          messages.map((message) => (
            <ChatBubble
              key={message.id}
              message={message}
              isOwnMessage={message.userId === currentUserId}
            />
          ))
        ) : (
          <EmptyState
            title="No messages yet"
            description="Start the conversation when your team joins the room."
            compact
          />
        )}
      </div>
      <ChatComposer disabled={disabled} onSend={onSend} />
    </Card>
  )
}

export default ChatPanel

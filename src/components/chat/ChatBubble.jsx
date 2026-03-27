import Badge from '../ui/Badge'

function ChatBubble({ message, isOwnMessage = false }) {
  return (
    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl border px-4 py-3 ${
          isOwnMessage
            ? 'border-indigo-400/50 bg-indigo-500/20'
            : message.type === 'system'
              ? 'border-emerald-400/40 bg-emerald-500/10'
              : 'border-white/10 bg-slate-900/80'
        }`}
      >
        <div className="mb-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-white">{message.author}</span>
          {message.type === 'system' ? <Badge variant="success">System</Badge> : null}
          <span className="text-xs text-slate-400">{message.timestamp}</span>
        </div>
        <p className="text-sm leading-6 text-slate-200">{message.text}</p>
      </div>
    </div>
  )
}

export default ChatBubble

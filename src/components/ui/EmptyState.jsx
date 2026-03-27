function EmptyState({ title, description, compact = false, action }) {
  return (
    <div
      className="text-center"
      style={{
        border: '1px dashed rgba(255,255,255,0.08)',
        background: 'rgba(4,6,8,0.5)',
        padding: compact ? '2rem 1rem' : '3rem 1.5rem',
      }}
    >
      <iconify-icon icon="solar:inbox-linear" style={{ fontSize: '1.5rem', color: '#6B7280', display: 'block', margin: '0 auto 0.75rem' }} />
      <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
        {title}
      </h3>
      <p className="mx-auto mt-2" style={{ maxWidth: '32rem', fontSize: '0.8rem', color: '#6B7280' }}>
        {description}
      </p>
      {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
    </div>
  )
}

export default EmptyState

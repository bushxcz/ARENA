function Modal({ isOpen, onClose, title, description, children }) {
  if (!isOpen) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      style={{ background: 'rgba(4,6,8,0.85)', backdropFilter: 'blur(4px)' }}
    >
      <div
        className="w-full relative"
        style={{
          maxWidth: '32rem',
          background: '#12161E',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '1.5rem',
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1rem), calc(100% - 1rem) 100%, 0 100%)',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Glow */}
        <div className="absolute top-0 right-0 w-20 h-20 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)' }} />

        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.15rem', color: '#fff', letterSpacing: '-0.03em' }}>
              {title}
            </h2>
            {description ? (
              <p className="mt-1" style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {description}
              </p>
            ) : null}
          </div>
          <button
            className="transition-colors"
            onClick={onClose}
            type="button"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.65rem',
              color: '#6B7280',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.target.style.color = '#00FF88')}
            onMouseLeave={(e) => (e.target.style.color = '#6B7280')}
          >
            Close
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  )
}

export default Modal

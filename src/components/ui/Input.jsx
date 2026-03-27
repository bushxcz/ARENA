function Input({ label, error, icon, className = '', ...props }) {
  return (
    <label className="block">
      {label ? (
        <span
          className="mb-2 block"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            fontWeight: 500,
            color: '#6B7280',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          {label}
        </span>
      ) : null}

      <div className="relative">
        {icon ? (
          <iconify-icon
            icon={icon}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#6B7280', fontSize: '1rem' }}
          />
        ) : null}
        <input
          className={`w-full outline-none transition-colors ${className}`}
          style={{
            background: '#040608',
            border: `1px solid ${error ? 'rgba(255, 68, 68, 0.5)' : 'rgba(255,255,255,0.08)'}`,
            paddingLeft: icon ? '2.5rem' : '1rem',
            paddingRight: '1rem',
            paddingTop: '0.75rem',
            paddingBottom: '0.75rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.8rem',
            color: '#E8E8E0',
            borderRadius: 0,
          }}
          {...props}
        />
      </div>

      {error ? (
        <span
          className="mt-2 block flex items-center gap-1"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.6rem',
            color: '#ff4444',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}
        >
          {error}
        </span>
      ) : null}
    </label>
  )
}

export default Input

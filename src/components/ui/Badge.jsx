const variantStyles = {
  default: {
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.03)',
    color: '#E8E8E0',
  },
  primary: {
    border: '1px solid rgba(0,255,136,0.3)',
    background: 'rgba(0,255,136,0.08)',
    color: '#00FF88',
  },
  success: {
    border: '1px solid rgba(52,211,153,0.3)',
    background: 'rgba(52,211,153,0.08)',
    color: '#34D399',
  },
  danger: {
    border: '1px solid rgba(255,68,68,0.3)',
    background: 'rgba(255,68,68,0.08)',
    color: '#ff6666',
  },
  warning: {
    border: '1px solid rgba(251,191,36,0.3)',
    background: 'rgba(251,191,36,0.08)',
    color: '#FBBF24',
  },
}

function Badge({ children, variant = 'default' }) {
  const style = variantStyles[variant] || variantStyles.default

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.2rem 0.6rem',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '0.6rem',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        clipPath: 'polygon(0.2rem 0, 100% 0, 100% calc(100% - 0.2rem), calc(100% - 0.2rem) 100%, 0 100%, 0 0.2rem)',
        ...style,
      }}
    >
      {children}
    </span>
  )
}

export default Badge

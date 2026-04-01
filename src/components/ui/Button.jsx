const variants = {
  primary: '',
  secondary:
    'axon-btn-outline',
  ghost:
    'bg-transparent text-[#E8E8E0]/70 hover:bg-white/5 hover:text-white disabled:text-[#6B7280]/50',
  danger: '',
}

const variantStyles = {
  primary: {},
  secondary: {},
  ghost: {
    background: 'transparent',
    color: 'rgba(232,232,224,0.7)',
    clipPath: 'none',
    fontWeight: 400,
  },
  danger: {
    background: '#ff4444',
    color: '#fff',
  },
}

function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
  style,
  ...props
}) {
  const sizeStyle =
    size === 'sm'
      ? { padding: '0.5rem 1rem', fontSize: '0.7rem' }
      : size === 'lg'
        ? { padding: '1rem 2rem', fontSize: '0.8rem' }
        : { padding: '0.75rem 1.5rem', fontSize: '0.75rem' }

  // For primary and danger, use the axon-btn class
  const isAxonBtn = variant === 'primary' || variant === 'secondary' || variant === 'danger'

  return (
    <button
      type={type}
      className={`${isAxonBtn ? 'axon-btn' : ''} ${variants[variant]} ${className}`}
      style={{
        ...sizeStyle,
        ...(variantStyles[variant] || {}),
        ...style,
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        opacity: props.disabled ? 0.5 : 1,
      }}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button

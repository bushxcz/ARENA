function Card({
  title,
  description,
  action,
  children,
  className = '',
  contentClassName = '',
}) {
  return (
    <section
      className={`axon-card ${className}`}
    >
      {title || description || action ? (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title ? (
              <h2 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-1" style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                {description}
              </p>
            ) : null}
          </div>
          {action}
        </div>
      ) : null}
      <div className={contentClassName}>{children}</div>
    </section>
  )
}

export default Card

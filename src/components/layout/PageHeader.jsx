function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-col gap-4 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <div className="axon-badge" style={{ marginBottom: '0.75rem' }}>
            <iconify-icon icon="solar:widget-linear" />
            {eyebrow.toUpperCase()}
          </div>
        ) : null}
        <h1 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(1.5rem,2.5vw,2rem)', color: '#fff', letterSpacing: '-0.04rem' }}>
          {title}
        </h1>
        {description ? (
          <p className="mt-2" style={{ fontSize: '0.85rem', color: '#6B7280', maxWidth: '48rem' }}>
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}

export default PageHeader

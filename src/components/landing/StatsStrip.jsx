const stats = [
  { value: '2,000+', label: 'Active Developers' },
  { value: '500+', label: 'Competitions Run' },
  { value: '1.2M', label: 'Code Submissions' },
  { value: '99.9%', label: 'Uptime SLA' },
]

export default function StatsStrip() {
  return (
    <section id="stats" className="border-b border-white/5 relative z-10" style={{ background: '#0B0E14' }}>
      <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`reveal ${i > 0 ? `stagger-${i}` : ''} flex flex-col justify-center items-center text-center ${i > 0 ? 'border-l border-white/5' : ''}`}
            style={{ padding: 'clamp(2rem,4vw,4rem) 1rem' }}
          >
            <div
              className={i === stats.length - 1 ? 'text-[#00FF88]' : 'text-white'}
              style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 'clamp(1.5rem,2.5vw,2.5rem)', fontWeight: 600, marginBottom: '0.25rem' }}
            >
              {stat.value}
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

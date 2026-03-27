const features = [
  {
    icon: 'solar:users-group-rounded-linear',
    title: 'Team Formation',
    description: 'Build your dream squad. Invite teammates, assign roles, and strategize before competitions. Real-time roster management with role-based permissions.',
    bullets: ['Role-based Access', 'Live Roster Sync', 'Team Messaging'],
  },
  {
    icon: 'solar:code-square-linear',
    title: 'Live Coding Arena',
    description: 'Compete in real-time coding challenges. Collaborative code editor, instant test-case validation, and automatic scoring — all within your browser.',
    bullets: ['In-Browser IDE', 'Auto Test Validation', 'Multi-Language Support'],
    elevated: true,
  },
  {
    icon: 'solar:ranking-linear',
    title: 'Leaderboard & Rankings',
    description: 'Track your progress across competitions. Global and per-competition leaderboards, historical performance analytics, and achievement badges.',
    bullets: ['Global Rankings', 'Performance Analytics', 'Achievement System'],
  },
]

export default function Features() {
  return (
    <section id="features" className="border-b border-white/5 relative" style={{ padding: 'clamp(4rem,8vw,8rem) 0', background: 'rgba(11,14,20,0.3)' }}>
      <div className="mx-auto" style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}>
        {/* Header */}
        <div className="mb-16 md:w-2/3 reveal">
          <div className="axon-badge">
            <iconify-icon icon="solar:cpu-linear" />
            PLATFORM
          </div>
          <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.04rem', color: '#fff' }}>
            Everything you need.<br/>Nothing you don't.
          </h2>
          <p style={{ color: '#6B7280', fontSize: 'clamp(0.9rem,1vw,1rem)' }}>
            ARENA provides a complete ecosystem for competitive coding — from team formation to live competition to post-match analytics.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <div
              key={i}
              className={`axon-card reveal ${i > 0 ? `stagger-${i}` : ''} flex flex-col ${feat.elevated ? 'md:-translate-y-4' : ''}`}
            >
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <div className="w-10 h-10 flex items-center justify-center border border-white/10 text-[#00FF88]" style={{ background: '#0B0E14' }}>
                  <iconify-icon icon={feat.icon} style={{ fontSize: '1.25rem' }} />
                </div>
                <h3 style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: '#fff' }}>
                  {feat.title}
                </h3>
              </div>
              <p className="flex-1 mb-6" style={{ color: '#6B7280', fontSize: '0.875rem' }}>
                {feat.description}
              </p>
              <ul className="flex flex-col gap-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280' }}>
                {feat.bullets.map((b, j) => (
                  <li key={j} className="flex items-center gap-2">
                    <iconify-icon icon="solar:alt-arrow-right-linear" style={{ color: '#00FF88' }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

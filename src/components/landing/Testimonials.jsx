const testimonials = [
  {
    quote: '"ARENA completely changed how our university runs hackathons. Team formation, live coding, scoring — it just works. We went from chaotic spreadsheets to seamless competitions."',
    name: 'Priya S.',
    role: 'CS Club President @ MIT',
  },
  {
    quote: '"The real-time leaderboard is addictive. Our engineers started hosting weekly coding duels and their problem-solving speed improved by 35% in two months."',
    name: 'Jason T.',
    role: 'Engineering Manager @ Vercel',
    featured: true,
  },
  {
    quote: '"We use ARENA for all our technical hiring challenges. The built-in test validation and anti-cheat measures give us confidence in every result."',
    name: 'Amara D.',
    role: 'Head of Talent @ Stripe',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-b border-white/5" style={{ padding: 'clamp(4rem,8vw,8rem) 0' }}>
      <div className="mx-auto" style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}>
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="axon-badge" style={{ margin: '0 auto 1.5rem' }}>
            <iconify-icon icon="solar:star-linear" />
            VALIDATION
          </div>
          <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.15, letterSpacing: '-0.04rem', textTransform: 'uppercase', color: '#fff' }}>
            Shipped faster. Competed harder.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 reveal stagger-2">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`axon-card flex flex-col justify-between ${t.featured ? 'border-[#00FF88]/20 md:-translate-y-4' : ''}`}
              style={t.featured ? { boxShadow: '0 0 20px rgba(0,255,136,0.05)' } : {}}
            >
              {/* Stars */}
              <div className="flex text-[#00FF88] mb-6">
                {[0,1,2,3,4].map(j => (
                  <iconify-icon key={j} icon="solar:star-bold" />
                ))}
              </div>

              <p className="mb-8" style={{ color: '#fff', fontSize: '0.875rem', lineHeight: 1.7 }}>
                {t.quote}
              </p>

              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 border border-white/10" style={{ background: 'rgba(107,114,128,0.2)' }} />
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  <span className="block mb-1" style={{ color: '#fff', fontWeight: 600 }}>{t.name}</span>
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

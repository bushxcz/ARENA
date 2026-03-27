const plans = [
  {
    name: 'Starter',
    price: 'Free',
    priceNote: 'forever',
    description: 'Perfect for students and small teams getting started with competitive coding.',
    features: [
      'Up to 5 Team Members',
      'Join Public Competitions',
      'Basic Leaderboard Access',
      'Community Support',
    ],
    cta: 'Get Started Free',
    outline: true,
  },
  {
    name: 'Pro',
    price: '$29',
    priceNote: '/mo per team',
    description: 'For serious competitors and organizations running custom tournaments.',
    features: [
      'Unlimited Team Members',
      'Create Private Competitions',
      'Advanced Analytics & Export',
      'Priority Support & SLA',
    ],
    cta: 'Start 14-Day Trial',
    recommended: true,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="border-b border-white/5" style={{ padding: 'clamp(4rem,8vw,8rem) 0', background: '#040608' }}>
      <div className="mx-auto" style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}>
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <div className="axon-badge" style={{ margin: '0 auto 1.5rem' }}>
            <iconify-icon icon="solar:wallet-linear" />
            ECONOMICS
          </div>
          <h2 className="mb-4" style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2rem,3.5vw,3rem)', lineHeight: 1.15, letterSpacing: '-0.04rem', textTransform: 'uppercase', color: '#fff' }}>
            Scale without penalty.
          </h2>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            Pay for what you use. Cancel anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto" style={{ maxWidth: '56rem' }}>
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`axon-card reveal ${i > 0 ? 'stagger-1' : ''} flex flex-col h-full relative overflow-hidden ${plan.recommended ? 'md:-translate-y-4 border-[#00FF88]/40' : ''}`}
              style={plan.recommended ? { background: '#0B0E14', boxShadow: '0 0 40px rgba(0,255,136,0.08)' } : { background: '#12161E' }}
            >
              {plan.recommended && (
                <div className="absolute top-4 right-4" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)', color: '#00FF88', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', textTransform: 'uppercase', fontWeight: 600, padding: '0.25rem 0.5rem', letterSpacing: '0.15em' }}>
                  Recommended
                </div>
              )}

              <h3 className="mb-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: plan.recommended ? '#00FF88' : '#6B7280' }}>
                {plan.name}
              </h3>

              <div className="mb-6" style={{ fontFamily: 'Syne, system-ui, sans-serif', fontSize: 'clamp(2rem,2.5vw,3rem)', color: '#fff', fontWeight: 600 }}>
                {plan.price}
                <span style={{ fontSize: '0.875rem', color: '#6B7280', fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 400 }}>{plan.priceNote}</span>
              </div>

              <p className="mb-8" style={{ color: plan.recommended ? 'rgba(232,232,224,0.9)' : '#6B7280', fontSize: '0.875rem' }}>
                {plan.description}
              </p>

              <div className="flex-1 flex flex-col gap-3 mb-8 border-t border-white/5 pt-6" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: plan.recommended ? '#fff' : 'rgba(232,232,224,0.8)' }}>
                {plan.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-2">
                    <iconify-icon icon={plan.recommended ? 'solar:check-circle-bold' : 'solar:check-circle-linear'} style={{ color: '#00FF88' }} />
                    {f}
                  </div>
                ))}
              </div>

              <a href="/auth/signup" className={`axon-btn w-full ${plan.outline ? 'axon-btn-outline' : ''}`}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

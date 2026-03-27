import { useState } from 'react'

export default function CTASection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) setSubmitted(true)
  }

  return (
    <section id="cta" className="border-b border-white/5" style={{ padding: 'clamp(4rem,8vw,8rem) 0' }}>
      <div className="mx-auto flex justify-center" style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}>
        <div
          className="w-full relative reveal z-10 border border-[#00FF88]/30"
          style={{ maxWidth: '56rem', background: '#12161E', padding: 'clamp(2rem,4vw,4rem)', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 2rem), calc(100% - 2rem) 100%, 0 100%)' }}
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.1) 0%, transparent 70%)' }} />

          <div className="text-center mb-10">
            <h2 className="mb-4" style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2rem,3.5vw,3.5rem)', lineHeight: 1.15, textTransform: 'uppercase', color: '#fff', letterSpacing: '-0.04rem' }}>
              Stop spectating.<br/>Start competing.
            </h2>
            <p className="mx-auto" style={{ color: '#6B7280', fontSize: 'clamp(0.9rem,1vw,1rem)', maxWidth: '32rem' }}>
              Join thousands of developers. Setup takes under 2 minutes.
            </p>
          </div>

          {submitted ? (
            <div className="text-center" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem', color: '#00FF88' }}>
              <iconify-icon icon="solar:check-circle-bold" style={{ fontSize: '2rem', marginBottom: '0.5rem', display: 'block' }} />
              You're in! Check your inbox.
            </div>
          ) : (
            <form className="flex flex-col md:flex-row gap-4 mx-auto" style={{ maxWidth: '40rem' }} onSubmit={handleSubmit}>
              <div className="relative flex-1">
                <iconify-icon icon="solar:letter-linear" className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: '#6B7280' }} />
                <input
                  type="email"
                  placeholder="Work Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                  style={{
                    background: '#040608',
                    border: '1px solid rgba(255,255,255,0.1)',
                    paddingLeft: '2.5rem',
                    paddingRight: '1rem',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '0.875rem',
                    color: '#fff',
                    outline: 'none',
                    borderRadius: 0,
                  }}
                />
              </div>
              <button type="submit" className="axon-btn" style={{ padding: '1rem 2rem' }}>Get Access</button>
            </form>
          )}

          <p className="text-center mt-6 flex items-center justify-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <iconify-icon icon="solar:shield-keyhole-linear" />
            No credit card required. Free forever on Starter.
          </p>
        </div>
      </div>
    </section>
  )
}

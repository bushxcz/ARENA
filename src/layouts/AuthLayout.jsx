import { useEffect, useRef } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

function AuthLayout() {
  const canvasRef = useRef(null)

  // Particle canvas background
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let width, height, animId
    const particles = []

    function resize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = Math.random() * 1.2 + 0.4
      }
      update() {
        this.x += this.vx
        this.y += this.vy
        if (this.x < 0 || this.x > width) this.vx *= -1
        if (this.y < 0 || this.y > height) this.vy *= -1
      }
      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(0, 255, 136, 0.5)'
        ctx.fill()
      }
    }

    resize()
    const count = Math.min(Math.floor(width / 20), 60)
    for (let i = 0; i < count; i++) particles.push(new Particle())

    function animate() {
      ctx.clearRect(0, 0, width, height)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.15 - (dist / 100) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
        particles[i].update()
        particles[i].draw()
      }
      animId = requestAnimationFrame(animate)
    }

    animate()
    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: '#040608' }}>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.3,
          mixBlendMode: 'screen',
        }}
      />

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(0,255,136,0.06) 0%, transparent 60%)' }} />

      <div
        className="relative z-10 mx-auto grid min-h-screen items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: 'clamp(1rem,5vw,4rem)' }}
      >
        {/* Left Panel — Brand Showcase */}
        <section className="hidden lg:flex lg:flex-col lg:justify-between h-full py-12">
          <div>
            {/* Brand */}
            <a href="/" className="flex items-center gap-2 group mb-12">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00FF88] group-hover:rotate-90 transition-transform duration-500">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem,1.2vw,1.25rem)', letterSpacing: '-0.05em', color: '#fff' }}>
                ARENA
              </span>
            </a>

            <div className="axon-badge">
              <iconify-icon icon="solar:shield-check-linear" />
              SECURE ACCESS
            </div>

            <h1 className="mb-6" style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2.5rem,4vw,3.5rem)', lineHeight: 0.95, color: '#fff', letterSpacing: '-0.04rem' }}>
              ENTER THE<br />
              <span className="text-gradient">ARENA.</span>
            </h1>

            <p className="mb-10" style={{ color: '#6B7280', fontSize: 'clamp(0.9rem,1vw,1rem)', maxWidth: '36rem' }}>
              Join thousands of developers competing in real-time coding challenges. Form teams, solve problems, and climb the leaderboard.
            </p>
          </div>

          {/* Feature pills */}
          <div className="grid gap-3 md:grid-cols-3">
            {[
              { icon: 'solar:users-group-rounded-linear', text: 'Team Coordination' },
              { icon: 'solar:code-square-linear', text: 'Live Coding Arena' },
              { icon: 'solar:ranking-linear', text: 'Real-Time Rankings' },
            ].map((item) => (
              <div
                key={item.text}
                className="axon-card flex items-center gap-3"
                style={{ padding: '1rem' }}
              >
                <iconify-icon icon={item.icon} style={{ color: '#00FF88', fontSize: '1.25rem' }} />
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#E8E8E0', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Right Panel — Auth Form */}
        <section className="flex items-center justify-center">
          <div
            className="w-full relative"
            style={{
              maxWidth: '28rem',
              background: '#12161E',
              border: '1px solid rgba(255,255,255,0.08)',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 1.5rem), calc(100% - 1.5rem) 100%, 0 100%)',
            }}
          >
            {/* Glow accent */}
            <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.08) 0%, transparent 70%)' }} />

            {/* Tab Switcher */}
            <div className="mb-8 flex gap-1 p-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <NavLink
                to="/auth/login"
                className={({ isActive }) =>
                  `flex-1 py-2.5 text-center transition-all duration-300`
                }
                style={({ isActive }) => ({
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: isActive ? '#040608' : '#6B7280',
                  background: isActive ? '#00FF88' : 'transparent',
                  clipPath: isActive ? 'polygon(0.4rem 0, 100% 0, 100% calc(100% - 0.4rem), calc(100% - 0.4rem) 100%, 0 100%, 0 0.4rem)' : 'none',
                })}
              >
                Login
              </NavLink>
              <NavLink
                to="/auth/signup"
                className={({ isActive }) =>
                  `flex-1 py-2.5 text-center transition-all duration-300`
                }
                style={({ isActive }) => ({
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: isActive ? '#040608' : '#6B7280',
                  background: isActive ? '#00FF88' : 'transparent',
                  clipPath: isActive ? 'polygon(0.4rem 0, 100% 0, 100% calc(100% - 0.4rem), calc(100% - 0.4rem) 100%, 0 100%, 0 0.4rem)' : 'none',
                })}
              >
                Signup
              </NavLink>
            </div>

            <Outlet />

            {/* Mobile brand footer */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-2 lg:hidden">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-[#00FF88]">
                <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
              <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '0.85rem', color: '#fff', letterSpacing: '-0.03em' }}>ARENA</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AuthLayout

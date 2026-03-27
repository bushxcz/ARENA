import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/landing/Navbar'
import Hero from '../../components/landing/Hero'
import Footer from '../../components/landing/Footer'
import useAuthStore from '../../store/useAuthStore'

export default function LandingPage() {
  const canvasRef = useRef(null)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Scroll-reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active')
        })
      },
      { rootMargin: '0px', threshold: 0.15 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // WebGL particle canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let width, height
    let animId
    const particles = []

    function resize() {
      width = canvas.width = canvas.offsetWidth
      height = canvas.height = canvas.offsetHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.vx = (Math.random() - 0.5) * 0.5
        this.vy = (Math.random() - 0.5) * 0.5
        this.radius = Math.random() * 1.5 + 0.5
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
        ctx.fillStyle = 'rgba(0, 255, 136, 0.6)'
        ctx.fill()
      }
    }

    resize()
    const count = Math.min(Math.floor(window.innerWidth / 15), 100)
    for (let i = 0; i < count; i++) particles.push(new Particle())

    function animate() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 136, ${0.2 - (dist / 120) * 0.2})`
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
    <div style={{ background: '#040608', color: '#E8E8E0', minHeight: '100vh', position: 'relative' }}>
      {/* WebGL Canvas — lives behind the Hero */}
      <canvas
        ref={canvasRef}
        id="webgl-canvas"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh', // Extend to cover the gateway
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.4,
          mixBlendMode: 'screen',
        }}
      />

      <Navbar />
      <Hero />
      
      {/* Access Gateway replacing marketing fluff */}
      <section className="relative z-10 py-32 flex flex-col items-center justify-center border-t border-white/5" style={{ background: 'linear-gradient(180deg, rgba(4,6,8,0) 0%, rgba(11,14,20,1) 100%)' }}>
        <div className="max-w-3xl w-full px-6 text-center reveal">
          <div className="axon-badge mb-6" style={{ width: 'fit-content', margin: '0 auto' }}>
            <iconify-icon icon="solar:lock-keyhole-linear" />
            ACCESS TERMINAL
          </div>
          <h2 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(2rem,4vw,3rem)', color: '#fff', letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
            Ready to deploy?
          </h2>
          <p className="text-slate-400 mb-12 max-w-xl mx-auto" style={{ fontSize: '1rem' }}>
            Securely authenticate to access your teams, view active arenas, and enter live coding competitions.
          </p>

          {isAuthenticated ? (
            <div className="p-8 axon-card mx-auto" style={{ maxWidth: '28rem' }}>
              <iconify-icon icon="solar:shield-check-linear" className="text-5xl text-[#00FF88] mb-6 inline-block" />
              <p className="mb-8" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem', color: '#00FF88', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Active session detected // Credentials verified
              </p>
              <Link to="/dashboard" className="axon-btn w-full justify-center py-4 text-[0.85rem]">
                ENTER DASHBOARD
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-6 relative" style={{ zIndex: 2 }}>
              <div className="p-8 axon-card flex flex-col items-center text-center hover:border-[rgba(0,255,136,0.3)] transition-colors group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: 'rgba(0,255,136,0.1)', border: '1px solid rgba(0,255,136,0.2)' }}>
                  <iconify-icon icon="solar:user-plus-linear" className="text-3xl text-[#00FF88]" />
                </div>
                <h3 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#fff' }} className="mb-2">New Recruit</h3>
                <p className="text-sm text-slate-400 mb-8 px-4">Initialize a new competitor profile and start climbing ranks.</p>
                <Link to="/auth/signup" className="axon-btn w-full justify-center">
                  INITIALIZE PROFILE
                </Link>
              </div>

              <div className="p-8 axon-card flex flex-col items-center text-center hover:border-white/20 transition-colors group">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <iconify-icon icon="solar:login-2-linear" className="text-3xl text-white" />
                </div>
                <h3 style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.25rem', color: '#fff' }} className="mb-2">Operator Return</h3>
                <p className="text-sm text-slate-400 mb-8 px-4">Authenticate with your existing credentials to resume.</p>
                <Link to="/auth/login" className="axon-btn w-full justify-center" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.1)' }}>
                  AUTHENTICATE
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}

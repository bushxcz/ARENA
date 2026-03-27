import { useEffect, useRef } from 'react'
import Navbar from '../../components/landing/Navbar'
import Hero from '../../components/landing/Hero'
import StatsStrip from '../../components/landing/StatsStrip'
import Features from '../../components/landing/Features'
import Testimonials from '../../components/landing/Testimonials'
import Pricing from '../../components/landing/Pricing'
import CTASection from '../../components/landing/CTASection'
import Footer from '../../components/landing/Footer'

export default function LandingPage() {
  const canvasRef = useRef(null)

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
          height: '90vh',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: 0.4,
          mixBlendMode: 'screen',
        }}
      />

      <Navbar />
      <Hero />
      <StatsStrip />
      <Features />
      <Testimonials />
      <Pricing />
      <CTASection />
      <Footer />
    </div>
  )
}

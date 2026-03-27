import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 py-4 border-b ${
        scrolled
          ? 'border-white/5'
          : 'border-transparent'
      }`}
      style={scrolled ? { background: 'rgba(4,6,8,0.9)', backdropFilter: 'blur(12px)' } : {}}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}
      >
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00FF88] group-hover:rotate-90 transition-transform duration-500">
            <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="12" cy="12" r="3" fill="currentColor" />
          </svg>
          <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 700, fontSize: 'clamp(1.1rem,1.2vw,1.25rem)', letterSpacing: '-0.05em', color: '#fff' }}>
            ARENA
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'rgba(232,232,224,0.7)' }}>
          <a href="/auth/login" className="hover:text-[#00FF88] transition-colors">Login</a>
        </div>

        <a href="/auth/signup" className="hidden md:inline-flex axon-btn" style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem' }}>
          Join Now
        </a>

        {/* Mobile Toggle */}
        <button className="md:hidden text-[#E8E8E0] text-xl" onClick={() => setMobileOpen(!mobileOpen)}>
          <iconify-icon icon={mobileOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 mt-4 px-6 py-6 flex flex-col gap-4" style={{ background: 'rgba(4,6,8,0.95)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
          <a href="/auth/login" className="text-[#E8E8E0]/70 hover:text-[#00FF88] transition-colors" onClick={() => setMobileOpen(false)}>Login</a>
          <a href="/auth/signup" className="axon-btn mt-2 inline-block text-center" style={{ padding: '0.5rem 1.25rem', fontSize: '0.7rem' }}>Join Now</a>
        </div>
      )}
    </nav>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#040608', paddingTop: '4rem', paddingBottom: '2rem' }} className="relative overflow-hidden flex flex-col">
      <div
        className="mx-auto w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10 border-b border-white/5 pb-16"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)' }}
      >
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <a href="#" className="flex items-center gap-2 group mb-4">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#00FF88]">
              <path d="M12 2L2 12L12 22L22 12L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" fill="currentColor" />
            </svg>
            <span style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: '1.125rem', letterSpacing: '-0.05em', color: '#fff' }}>ARENA</span>
          </a>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            The competitive coding platform.
          </p>
        </div>

        {/* Platform Links */}
        <div className="flex flex-col gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6B7280' }}>
          <h4 className="mb-2" style={{ color: '#fff' }}>Platform</h4>
          <a href="#features" className="hover:text-[#00FF88] transition-colors">Teams</a>
          <a href="#features" className="hover:text-[#00FF88] transition-colors">Arena</a>
          <a href="#features" className="hover:text-[#00FF88] transition-colors">Leaderboard</a>
        </div>

        {/* Developers */}
        <div className="flex flex-col gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6B7280' }}>
          <h4 className="mb-2" style={{ color: '#fff' }}>Developers</h4>
          <a href="#" className="hover:text-[#00FF88] transition-colors">Documentation</a>
          <a href="#" className="hover:text-[#00FF88] transition-colors">API Reference</a>
          <a href="#" className="hover:text-[#00FF88] transition-colors">GitHub</a>
        </div>

        {/* Company */}
        <div className="flex flex-col gap-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#6B7280' }}>
          <h4 className="mb-2" style={{ color: '#fff' }}>Company</h4>
          <a href="#" className="hover:text-[#00FF88] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#00FF88] transition-colors">Terms</a>
          <div className="flex gap-4 text-lg mt-4">
            <a href="#" className="hover:text-[#00FF88] transition-colors"><iconify-icon icon="solar:twitter-linear" /></a>
            <a href="#" className="hover:text-[#00FF88] transition-colors"><iconify-icon icon="solar:github-linear" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="mx-auto w-full flex flex-col md:flex-row justify-between items-center relative z-10 pt-4"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '1rem clamp(1rem,5vw,4rem) 0', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}
      >
        <p>© 2026 ARENA SYSTEMS. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" style={{ boxShadow: '0 0 8px rgba(0,255,136,0.6)' }} />
          All systems operational
        </div>
      </div>
    </footer>
  )
}

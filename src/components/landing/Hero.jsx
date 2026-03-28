export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-24 pb-12 overflow-hidden border-b border-white/5">
      {/* WebGL Canvas is rendered in parent LandingPage */}

      <div
        className="mx-auto w-full grid grid-cols-1 lg:grid-cols-12 items-center relative z-10"
        style={{ maxWidth: 'clamp(65rem,90vw,88rem)', padding: '0 clamp(1rem,5vw,4rem)', gap: 'clamp(2.5rem,5vw,5rem)' }}
      >
        {/* Copy */}
        <div className="lg:col-span-7 flex flex-col items-start z-20">
          <div className="axon-badge reveal">
            <iconify-icon icon="solar:bolt-linear" />
            SYS_INIT // ARENA V1.0
          </div>

          <h1 className="reveal stagger-1 mb-6" style={{ fontFamily: 'Syne, system-ui, sans-serif', fontWeight: 600, fontSize: 'clamp(3.5rem,6vw,5.5rem)', lineHeight: 0.9, color: '#fff', letterSpacing: '-0.06rem' }}>
            COMPETE.<br/>
            <span className="text-gradient">CODE. CONQUER.</span>
          </h1>

          <p className="reveal stagger-2 mb-10" style={{ color: '#6B7280', fontSize: 'clamp(1rem,1.1vw,1.15rem)' }}>
            The ultimate competitive coding arena. Form teams, join real-time competitions, and climb the leaderboard. Write code, strategize, and prove you're the best — all in one platform.
          </p>

          <div className="flex flex-wrap items-center gap-4 reveal stagger-3">
            <a href="/auth/signup" className="axon-btn">Get Started</a>
            <a href="#features" className="axon-btn axon-btn-outline">Explore Features</a>
          </div>

          <div className="mt-8 flex items-center gap-3 reveal stagger-3" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            <div className="flex -space-x-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: '#0B0E14', border: '1px solid rgba(107,114,128,0.3)' }}>
                  <iconify-icon icon="solar:user-linear" style={{ fontSize: '0.6rem' }} />
                </div>
              ))}
            </div>
            <span>Trusted by 2,000+ developers worldwide</span>
          </div>
        </div>

        {/* Dashboard Mockup */}
        <div className="hidden lg:block lg:col-span-5 relative z-10 reveal stagger-2">
          <div className="glass-panel overflow-hidden border border-white/10 shadow-2xl" style={{ boxShadow: '0 25px 50px -12px rgba(0,255,136,0.05)' }}>
            {/* Header */}
            <div className="border-b border-white/5 px-4 py-3 flex items-center justify-between" style={{ background: '#12161E' }}>
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(107,114,128,0.5)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(107,114,128,0.5)' }} />
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: 'rgba(107,114,128,0.5)' }} />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.15em' }}>arena_live_competition</span>
              </div>
              <div className="flex items-center gap-2" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#00FF88' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" /> LIVE
              </div>
            </div>

            {/* Body */}
            <div className="p-5 grid grid-cols-3 gap-3" style={{ background: 'rgba(11,14,20,0.8)', height: 360 }}>
              {/* Sidebar */}
              <div className="col-span-1 flex flex-col gap-2 border-r border-white/5 pr-3">
                <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Teams</div>
                {[
                  { name: 'Alpha Squad', score: '2,450 pts' },
                  { name: 'ByteForce', score: '2,120 pts' },
                  { name: 'NullPointers', score: '1,890 pts' },
                ].map((team, i) => (
                  <div key={i} className={`p-2 flex flex-col gap-1 cursor-pointer transition-colors ${i === 0 ? 'border border-white/5 border-l-2 border-l-[#00FF88]' : 'hover:bg-[#12161E]'}`} style={ i === 0 ? { background: '#12161E' } : {}}>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.7rem', color: i === 0 ? '#fff' : 'rgba(232,232,224,0.7)' }}>{team.name}</span>
                    <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280' }}>{team.score}</span>
                  </div>
                ))}
              </div>

              {/* Main */}
              <div className="col-span-2 flex flex-col gap-3">
                <div className="flex justify-between items-end">
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#6B7280', textTransform: 'uppercase' }}>Challenge Progress</div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#fff', background: 'rgba(255,255,255,0.05)', padding: '0.25rem 0.5rem' }}>Round 3/5</div>
                </div>

                {/* Code Block */}
                <div className="flex-1 border border-white/5 relative overflow-hidden p-4" style={{ background: '#080B0F' }}>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                  <div className="relative z-10" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: 'rgba(232,232,224,0.7)', lineHeight: 1.8 }}>
                    <div><span style={{ color: '#6B7280' }}>1</span> <span style={{ color: '#00FF88' }}>function</span> solve(arr) {'{'}</div>
                    <div><span style={{ color: '#6B7280' }}>2</span>   <span style={{ color: '#00FF88' }}>let</span> result = [];</div>
                    <div><span style={{ color: '#6B7280' }}>3</span>   <span style={{ color: '#00FF88' }}>for</span> (<span style={{ color: '#00FF88' }}>let</span> i = 0; ...)</div>
                    <div><span style={{ color: '#6B7280' }}>4</span>     result.push(...);</div>
                    <div><span style={{ color: '#6B7280' }}>5</span>   <span style={{ color: '#00FF88' }}>return</span> result;</div>
                    <div><span style={{ color: '#6B7280' }}>6</span> {'}'}</div>
                  </div>
                </div>

                {/* Terminal */}
                <div className="border border-white/5 p-2 overflow-hidden" style={{ background: '#040608', height: 70 }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.6rem', color: '#6B7280' }}>
                    &gt; Running test suite...<br/>
                    &gt; <span style={{ color: '#00FF88' }}>✓ 12/12 test cases passed</span><br/>
                    &gt; Submission accepted. +320 pts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

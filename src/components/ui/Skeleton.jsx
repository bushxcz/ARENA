function Skeleton({ className = '' }) {
  return (
    <div
      className={`animate-pulse ${className}`}
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.03)' }}
    />
  )
}

export default Skeleton

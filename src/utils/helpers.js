export function delay(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export function getStatusTone(status) {
  if (status === 'live') return 'success'
  if (status === 'paused') return 'warning'
  if (status === 'ended') return 'danger'
  return 'default'
}

export function formatClock(date) {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

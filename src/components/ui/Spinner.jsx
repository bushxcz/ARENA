function Spinner() {
  return (
    <div className="flex items-center gap-3 text-sm text-slate-400">
      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-indigo-400"></span>
      Loading...
    </div>
  )
}

export default Spinner

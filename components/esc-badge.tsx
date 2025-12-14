export function EscBadge() {
  return (
    <div className="relative inline-flex">
      <div className="bg-[#F6DA34] px-4 py-1.5 relative">
        {/* Left notch */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-[#f5f5f5] rotate-45" />
        {/* Right notch */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3 h-3 bg-[#F6DA34] rotate-45" />
        <span className="text-sm font-bold tracking-wider text-foreground relative z-10">CRISIS</span>
      </div>
    </div>
  )
}

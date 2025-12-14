"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function AnimatedArrow() {
  const [isAnimating, setIsAnimating] = useState(false)

  const handleClick = () => {
    setIsAnimating(true)
    // Reset animation after it completes
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <button className="mt-8 p-2 cursor-pointer" onClick={handleClick}>
      <ArrowRight
        className={`w-16 h-16 text-foreground transition-transform ${isAnimating ? "animate-bounce-horizontal" : ""}`}
        strokeWidth={2}
      />
    </button>
  )
}

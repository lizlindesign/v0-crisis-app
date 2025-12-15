"use client"

import { ArrowRight } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AnimatedArrow() {
  const [isClicked, setIsClicked] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setIsClicked(true)
    // Delay navigation to show enhanced arrow animation
    setTimeout(() => {
      router.push("/risk-mapping")
    }, 800)
  }

  return (
    <button className="mt-8 p-2 cursor-pointer" onClick={handleClick}>
      <ArrowRight
        className={`w-16 h-16 text-foreground transition-transform ${
          isClicked ? "animate-bounce-horizontal" : "animate-pulse-right"
        }`}
        strokeWidth={2}
      />
    </button>
  )
}

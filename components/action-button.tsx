"use client"

import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ActionButtonProps {
  icon: ReactNode
  title: string
  subtitle?: string
  variant: "dark" | "light"
  focused?: boolean
}

export function ActionButton({ icon, title, subtitle, variant, focused = false }: ActionButtonProps) {
  return (
    <button
      className={cn(
        "w-full flex items-center gap-6 px-6 py-5 rounded-none transition-all duration-200 cursor-pointer",
        variant === "dark"
          ? focused
            ? "bg-foreground text-background hover:bg-background hover:text-foreground"
            : "bg-background text-foreground hover:bg-foreground hover:text-background"
          : focused
            ? "bg-foreground text-background hover:bg-background hover:text-foreground"
            : "bg-background text-foreground hover:bg-foreground hover:text-background",
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex flex-col items-start">
        <span className="text-sm font-bold tracking-wider">{title}</span>
        {subtitle && <span className="text-sm font-bold tracking-wider">{subtitle}</span>}
      </div>
    </button>
  )
}

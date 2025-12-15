"use client"

import { useState } from "react"
import Link from "next/link"
import { X, ArrowRight, Plus, Truck, Home, User } from "lucide-react"

export default function SafeZonePage() {
  const [isArrowAnimating, setIsArrowAnimating] = useState(false)
  const [hoveredTile, setHoveredTile] = useState<string | null>(null)

  const handleArrowClick = () => {
    setIsArrowAnimating(true)
    setTimeout(() => setIsArrowAnimating(false), 500)
  }

  const tiles = [
    { id: "family", label: "FAMILY", icon: User, highlight: false, href: "/family-status" },
    { id: "medical", label: "MEDICAL", icon: Plus, highlight: true, href: "#" },
    { id: "transit", label: "TRANSIT", icon: Truck, highlight: false, href: "#" },
    { id: "supply", label: "SUPPLY", icon: Home, highlight: false, href: "#" },
  ]

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-10 pb-4">
        <Link href="/earthquake" className="inline-block">
          <X className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity text-foreground" strokeWidth={2} />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mt-6 leading-tight">
          YOU ARE AT
          <br />A SAFE ZONE
        </h1>
      </div>

      {/* Tiles Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
          {tiles.map((tile) => (
            <Link
              key={tile.id}
              href={tile.href}
              onMouseEnter={() => setHoveredTile(tile.id)}
              onMouseLeave={() => setHoveredTile(null)}
              className={`
                aspect-square rounded-2xl flex flex-col items-center justify-center gap-3
                transition-all duration-200 cursor-pointer active:scale-95
                ${
                  tile.highlight
                    ? hoveredTile && hoveredTile !== "medical"
                      ? "bg-white border-2 border-gray-300"
                      : "bg-[#F6DA34] hover:bg-[#e5c92f]"
                    : "bg-white border-2 border-gray-300 hover:bg-[#F6DA34] hover:border-[#F6DA34]"
                }
              `}
            >
              {tile.id === "family" ? (
                <svg width="48" height="48" viewBox="0 0 24 24" fill="black">
                  <circle cx="12" cy="7" r="4" />
                  <path d="M12 14c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
                </svg>
              ) : tile.id === "medical" ? (
                <Plus className="w-12 h-12 text-black" strokeWidth={3} />
              ) : tile.id === "transit" ? (
                <Truck className="w-12 h-12 text-black" strokeWidth={2} />
              ) : (
                <Home className="w-12 h-12 text-black" strokeWidth={2} />
              )}
              <span className="text-lg font-bold tracking-tight text-black">{tile.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white px-6 pt-2 pb-4 rounded-t-3xl -mt-4 relative z-10">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div onClick={handleArrowClick} className="flex items-center justify-between py-2 cursor-pointer group">
          <div>
            <span className="text-sm font-bold tracking-tight text-gray-600">EMERGENCY CENTER</span>
            <p className="text-4xl font-bold tracking-tight text-foreground mt-1">
              220 <span className="text-2xl">YD/M</span>
            </p>
          </div>
          <ArrowRight
            className={`w-10 h-10 text-foreground transition-transform ${
              isArrowAnimating ? "translate-x-2" : "group-hover:translate-x-1"
            }`}
            strokeWidth={2.5}
          />
        </div>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import Link from "next/link"
import { ChevronLeft, ArrowRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function RiskMappingPage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [viewMode, setViewMode] = useState<"map" | "drone">("map")
  const [scale, setScale] = useState(1) // Start at scale 1 to show full image
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50)
    return () => clearTimeout(timer)
  }, [])

  const handleArrowClick = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 4)) // Allow zooming from 0.5 to 4 to see full image
  const handleZoomOutWithReset = () => {
    const newScale = Math.max(scale - 0.25, 0.5)
    setScale(newScale)
    if (newScale <= 1) {
      setPosition({ x: 0, y: 0 })
    }
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true)
    dragStart.current = { x: e.clientX, y: e.clientY }
    positionStart.current = { x: position.x, y: position.y }
    ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return
    const dx = e.clientX - dragStart.current.x
    const dy = e.clientY - dragStart.current.y

    const container = containerRef.current
    if (container) {
      const containerWidth = container.clientWidth
      const containerHeight = container.clientHeight
      const maxX = (containerWidth * scale) / 2 // Allow more panning room
      const maxY = (containerHeight * scale) / 2

      const newX = Math.max(-maxX, Math.min(maxX, positionStart.current.x + dx))
      const newY = Math.max(-maxY, Math.min(maxY, positionStart.current.y + dy))

      setPosition({ x: newX, y: newY })
    }
  }

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    }
    setIsDragging(false)
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.15 : 0.15
    setScale((s) => Math.min(Math.max(s + delta, 0.5), 4))
  }

  return (
    <div
      className={`h-screen bg-white flex flex-col overflow-hidden transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      {/* Map Section */}
      <div
        ref={containerRef}
        className="flex-1 relative overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "none",
        }}
      >
        {viewMode === "map" ? (
          <div className="absolute inset-0 bg-[#f8f8f8]">
            <div
              className="absolute inset-0"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) rotate(-15deg) scale(${scale * 1.4})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 390 520" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="100" width="100" height="80" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <rect x="140" y="80" width="120" height="100" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <rect x="280" y="60" width="90" height="120" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />

                <polygon points="30,220 130,200 140,300 40,310" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <rect x="160" y="200" width="100" height="90" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <polygon points="280,180 370,160 380,280 290,290" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />

                <rect x="50" y="340" width="80" height="100" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <polygon points="150,320 260,310 270,420 160,430" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />
                <rect x="290" y="320" width="90" height="110" fill="#f0f0f0" stroke="#e0e0e0" strokeWidth="2" />

                <line x1="-50" y1="190" x2="450" y2="170" stroke="#e5e5e5" strokeWidth="14" />
                <line x1="-50" y1="310" x2="450" y2="290" stroke="#e5e5e5" strokeWidth="14" />

                <line x1="130" y1="-50" x2="150" y2="570" stroke="#e5e5e5" strokeWidth="14" />
                <line x1="270" y1="-50" x2="290" y2="570" stroke="#e5e5e5" strokeWidth="14" />

                <line x1="-30" y1="450" x2="200" y2="50" stroke="#ebebeb" strokeWidth="10" />
                <line x1="180" y1="500" x2="420" y2="80" stroke="#ebebeb" strokeWidth="10" />
              </svg>
            </div>

            <span className="absolute top-28 right-6 text-sm text-gray-400 font-medium text-right">
              Little
              <br />
              Italy
            </span>
            <span className="absolute top-44 left-6 text-sm text-gray-400 font-medium">Tribeca</span>
            <span className="absolute top-[280px] left-6 text-sm text-gray-400 font-medium leading-tight">
              Financial
              <br />
              District
            </span>
            <span className="absolute bottom-16 left-6 text-[10px] text-gray-300 font-medium tracking-[0.2em] uppercase">
              West Street
            </span>
            <span className="absolute bottom-16 right-4 text-sm text-gray-400 font-medium">SoHo</span>

            <HouseIcon className="absolute top-36 right-20" />
            <ShopIcon className="absolute top-[260px] left-14" />
            <HotelIcon className="absolute bottom-20 left-1/2 -translate-x-1/2" />

            <div className="absolute top-[300px] left-[70%] -translate-x-1/2">
              <svg width="260" height="260" viewBox="0 0 260 260" className="absolute -top-[130px] -left-[130px]">
                <circle cx="130" cy="130" r="30" stroke="#F6DA34" strokeWidth="8" fill="none" />
                <circle cx="130" cy="130" r="55" stroke="#F6DA34" strokeWidth="8" fill="none" />
                <circle cx="130" cy="130" r="80" stroke="#F6DA34" strokeWidth="8" fill="none" />
                <circle cx="130" cy="130" r="105" stroke="#F6DA34" strokeWidth="8" fill="none" />
              </svg>
              <div className="absolute -top-4 -left-8 text-center">
                <span className="text-xs text-gray-600 font-medium leading-tight">
                  North
                  <br />
                  Beach
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div
            className="absolute inset-0 flex items-center justify-center bg-gray-900"
            style={{
              touchAction: "none",
            }}
          >
            <img
              src="/images/hongkong-taipo-highlighted.jpg"
              alt="Aerial drone view"
              className="max-w-none pointer-events-none select-none"
              draggable={false}
              style={{
                height: "100%",
                width: "auto",
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            />
          </div>
        )}

        <div className="absolute bottom-9 right-4 flex flex-col gap-2 z-20">
          <Link
            href="/report"
            onPointerDown={(e) => e.stopPropagation()}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.862 4.487l2.651 2.651M19.513 7.138l-11.8 11.8-3.536.708.708-3.536 11.8-11.8a1.875 1.875 0 012.652 0l.176.176a1.875 1.875 0 010 2.652z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleZoomIn}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-xl font-medium hover:bg-white transition-colors"
          >
            +
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={handleZoomOutWithReset}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-xl font-medium hover:bg-white transition-colors"
          >
            −
          </button>
        </div>

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-10 z-10 pointer-events-none">
          <div className="flex items-start justify-between">
            <div>
              <Link href="/earthquake" className="inline-block mb-4 pointer-events-auto">
                <ChevronLeft
                  className={`w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity ${viewMode === "drone" ? "text-white" : "text-foreground"}`}
                  strokeWidth={2}
                />
              </Link>
              <h1
                className={`text-3xl font-bold tracking-tight whitespace-nowrap ${viewMode === "drone" ? "text-white" : "text-foreground"}`}
              >
                FIRE NEARBY
              </h1>
            </div>

            <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm pointer-events-auto">
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  viewMode === "map" ? "bg-black text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Map
              </button>
              <button
                onClick={() => setViewMode("drone")}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                  viewMode === "drone" ? "bg-black text-white" : "text-gray-600 hover:text-black"
                }`}
              >
                Drone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white px-6 pt-2 pb-4 rounded-t-3xl -mt-4 relative z-10 border-t border-gray-200">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">EVACUATE</h2>
            <div className="flex items-center gap-1 mt-1 text-muted-foreground">
              <svg
                width="12"
                height="16"
                viewBox="0 0 14 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-70"
              >
                <path
                  d="M7 1C3.69 1 1 3.69 1 7C1 11.5 7 17 7 17C7 17 13 11.5 13 7C13 3.69 10.31 1 7 1Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />
                <circle cx="7" cy="7" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <span className="text-sm">North Beach Nearby</span>
            </div>

            <div className="mt-2 text-xs font-medium text-foreground leading-snug">
              <p>Earthquake: magnitude M 6.5</p>
              <p>182 miles away</p>
              <p>AM 06:21</p>
            </div>
          </div>

          <Link href="/evacuation">
            <button className="p-2 cursor-pointer" onClick={handleArrowClick}>
              <ArrowRight
                className={`w-12 h-12 text-foreground transition-transform ${isAnimating ? "animate-bounce-horizontal" : ""}`}
                strokeWidth={2}
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

function HouseIcon({ className }: { className?: string }) {
  return (
    <div className={`w-7 h-7 bg-gray-700 flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 7L7 3L12 7V12H2V7Z" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

function ShopIcon({ className }: { className?: string }) {
  return (
    <div className={`w-7 h-7 bg-gray-700 flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="5" width="10" height="7" stroke="white" strokeWidth="1.5" fill="none" />
        <path d="M2 5L4 2H10L12 5" stroke="white" strokeWidth="1.5" fill="none" />
      </svg>
    </div>
  )
}

function HotelIcon({ className }: { className?: string }) {
  return (
    <div className={`w-7 h-7 bg-gray-700 flex items-center justify-center ${className}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="10" height="10" stroke="white" strokeWidth="1.5" fill="none" />
        <line x1="7" y1="2" x2="7" y2="12" stroke="white" strokeWidth="1" />
        <line x1="2" y1="7" x2="12" y2="7" stroke="white" strokeWidth="1" />
      </svg>
    </div>
  )
}

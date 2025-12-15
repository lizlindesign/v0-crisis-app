"use client"

import type React from "react"

import Link from "next/link"
import { X, ArrowRight, ArrowUpLeft } from "lucide-react"
import { useState, useRef } from "react"

export default function EvacuationPage() {
  const [viewMode, setViewMode] = useState<"2d" | "3d" | "nav">("2d")
  const [scale, setScale] = useState(1.8)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 4))
  const handleZoomOut = () => {
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
      const maxX = (containerWidth * scale) / 2
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

  const handleViewChange = (mode: "2d" | "3d" | "nav") => {
    setViewMode(mode)
    setScale(mode === "3d" ? 1.1 : 1.8)
    setPosition({ x: 0, y: 0 })
    setIsExpanded(false)
  }

  if (viewMode === "nav") {
    return (
      <div className="h-screen flex flex-col overflow-hidden">
        <div
          className="bg-[#F6DA34] relative flex items-center justify-center flex-1"
          style={{
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: "flex",
          }}
        >
          {/* Header overlay */}
          <div className="absolute top-0 left-0 right-0 px-6 pt-10 z-10">
            <div className="flex items-start justify-between">
              <Link href="/earthquake" className="inline-block">
                <X className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity text-black" strokeWidth={2} />
              </Link>

              <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm">
                <button
                  onClick={() => handleViewChange("2d")}
                  className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors text-gray-600 hover:text-black"
                >
                  2D
                </button>
                <button
                  onClick={() => handleViewChange("3d")}
                  className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors text-gray-600 hover:text-black"
                >
                  3D
                </button>
                <button
                  onClick={() => handleViewChange("nav")}
                  className="px-3 py-1.5 text-xs font-medium rounded-full transition-colors bg-black text-white"
                >
                  Nav
                </button>
              </div>
            </div>
          </div>

          <svg
            width="192"
            height="192"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black animate-urgent-pulse"
            style={{
              marginTop: isExpanded ? "32px" : "0px",
              transition: "margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <path
              d="M12 19V5M12 5L5 12M12 5L19 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <style jsx>{`
            @keyframes urgent-pulse {
              0%, 100% {
                transform: translateY(0) scale(1);
              }
              25% {
                transform: translateY(-12px) scale(1.05);
              }
              50% {
                transform: translateY(0) scale(1);
              }
              75% {
                transform: translateY(-12px) scale(1.05);
              }
            }
            .animate-urgent-pulse {
              animation: urgent-pulse 1.2s ease-in-out infinite;
            }
          `}</style>
        </div>

        <div className="bg-white rounded-t-3xl -mt-4 relative z-10">
          <div className="flex justify-center pt-3 pb-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
            <div className="w-12 h-1 bg-gray-300 rounded-full" />
          </div>

          {/* Current step - always visible */}
          <div className="flex flex-col items-center text-center px-6 pb-4">
            <p className="text-7xl font-bold tracking-tight">
              30<span className="text-4xl font-bold">ft</span>
            </p>
            <p className="text-gray-400 text-lg mt-1">About 45 secs</p>
          </div>

          <div
            style={{
              maxHeight: isExpanded ? "300px" : "0px",
              opacity: isExpanded ? 1 : 0,
              transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out",
              willChange: "max-height, opacity",
              overflow: "hidden",
            }}
          >
            {/* Step 1 - Turn right */}
            <div className="bg-[#e8e8e8] py-3 px-6 flex items-center justify-between w-full">
              <ArrowRight className="w-10 h-10 text-black" strokeWidth={2.5} />
              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight">
                  82<span className="text-lg font-bold">ft</span>
                </p>
                <p className="text-gray-500 text-sm">About 2 mins</p>
              </div>
            </div>

            {/* Step 2 - Stairs */}
            <div className="bg-[#dedede] py-3 px-6 flex items-center justify-between w-full">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ transform: "scaleX(-1)" }}
              >
                <path
                  d="M8 32 L8 24 L16 24 L16 16 L24 16 L24 8 L32 8"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight">
                  21<span className="text-lg font-bold">fl</span>
                </p>
                <p className="text-gray-500 text-sm">About 26 mins</p>
              </div>
            </div>

            {/* Step 3 - Diagonal arrow */}
            <div className="bg-[#d4d4d4] py-3 px-6 flex items-center justify-between w-full">
              <ArrowUpLeft className="w-10 h-10 text-black" strokeWidth={2.5} />
              <div className="text-right">
                <p className="text-3xl font-bold tracking-tight">
                  50<span className="text-lg font-bold">yd</span>
                </p>
                <p className="text-gray-500 text-sm">About 3 mins</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-[#f5f5f5] flex flex-col overflow-hidden">
      {/* Map Area - Full screen with floorplan */}
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
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})${viewMode === "2d" ? " rotate(10deg)" : ""}`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.15s ease-out",
          }}
        >
          <img
            src={viewMode === "2d" ? "/images/floorplan-2d.png" : "/images/evacuation-3d.png"}
            alt={viewMode === "2d" ? "2D evacuation route floorplan" : "3D evacuation route view"}
            className="max-w-none pointer-events-none select-none"
            draggable={false}
            style={
              viewMode === "2d"
                ? {
                    height: "100%",
                    width: "auto",
                  }
                : {
                    height: "100%",
                    width: "auto",
                  }
            }
          />
        </div>

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
            onClick={handleZoomOut}
            className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-xl font-medium hover:bg-white transition-colors"
          >
            −
          </button>
        </div>

        {/* Header overlay */}
        <div className="absolute top-0 left-0 right-0 px-6 pt-10 z-10 pointer-events-none">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <Link href="/earthquake" className="inline-block pointer-events-auto">
                <X className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity text-white" strokeWidth={2} />
              </Link>

              {/* Toggle */}
              <div className="flex items-center gap-1 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm pointer-events-auto">
                <button
                  onClick={() => handleViewChange("2d")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    viewMode === "2d" ? "bg-black text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  2D
                </button>
                <button
                  onClick={() => handleViewChange("3d")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    viewMode === "3d" ? "bg-black text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  3D
                </button>
                <button
                  onClick={() => handleViewChange("nav")}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                    viewMode === "nav" ? "bg-black text-white" : "text-gray-600 hover:text-black"
                  }`}
                >
                  Nav
                </button>
              </div>
            </div>

            <h1 className="text-3xl font-bold tracking-tight whitespace-nowrap text-white">EVACUATION ROUTE</h1>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bg-white px-6 pb-4 pt-2 rounded-t-3xl -mt-4 relative z-10">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-sm text-muted-foreground font-medium">EST</span>
            <p className="text-3xl font-bold tracking-tight">17:30 min</p>
          </div>
          <div className="w-12 h-12 flex items-center justify-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ transform: "scaleX(-1)" }}
            >
              <path
                d="M8 32 L8 24 L16 24 L16 16 L24 16 L24 8 L32 8"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

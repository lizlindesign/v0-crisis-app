"use client"

import type React from "react"

import Link from "next/link"
import { ChevronLeft, Phone } from "lucide-react"
import { useState, useRef } from "react"

export default function FamilyStatusPage() {
  const [viewMode, setViewMode] = useState<"map" | "drone">("map")
  const [scale, setScale] = useState(0.7) // Start at 0.7 scale so all 3 pins are visible
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const positionStart = useRef({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  const handleZoomIn = () => setScale((s) => Math.min(s + 0.25, 4))
  const handleZoomOut = () => {
    const newScale = Math.max(scale - 0.25, 0.5)
    setScale(newScale)
    if (newScale <= 0.5) {
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
    setScale((s) => Math.min(Math.max(s + delta, 0.5), 4)) // Minimum 0.5
  }

  const familyMembers = [
    { name: "Mom", status: "Safe" },
    { name: "Jonny", status: "Safe" },
    { name: "Ave", status: "Safe" },
  ]

  return (
    <div className="h-screen bg-white flex flex-col overflow-hidden">
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
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute bg-[#f0f0f0]"
              style={{
                top: "-100%",
                left: "-100%",
                width: "300%",
                height: "300%",
                transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(-15deg)`,
                transformOrigin: "center center",
                transition: isDragging ? "none" : "transform 0.15s ease-out",
              }}
            >
              {/* City grid map */}
              <svg
                className="w-full h-full"
                viewBox="0 0 1200 1800"
                preserveAspectRatio="xMidYMid slice"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Buildings - Row 1 */}
                <rect x="30" y="60" width="150" height="120" fill="#e0e0e0" />
                <rect x="210" y="45" width="180" height="135" fill="#e0e0e0" />
                <rect x="420" y="75" width="135" height="105" fill="#e0e0e0" />
                <rect x="585" y="60" width="120" height="120" fill="#e0e0e0" />
                <rect x="735" y="45" width="165" height="135" fill="#e0e0e0" />
                <rect x="930" y="75" width="120" height="105" fill="#e0e0e0" />
                <rect x="1080" y="60" width="90" height="120" fill="#e0e0e0" />

                {/* Buildings - Row 2 */}
                <rect x="45" y="255" width="120" height="150" fill="#e0e0e0" />
                <rect x="195" y="270" width="165" height="120" fill="#e0e0e0" />
                <rect x="390" y="240" width="150" height="165" fill="#e0e0e0" />
                <rect x="570" y="270" width="120" height="135" fill="#e0e0e0" />
                <rect x="720" y="255" width="180" height="150" fill="#e0e0e0" />
                <rect x="930" y="240" width="135" height="165" fill="#e0e0e0" />
                <rect x="1095" y="270" width="75" height="135" fill="#e0e0e0" />

                {/* Buildings - Row 3 */}
                <rect x="60" y="495" width="135" height="135" fill="#e0e0e0" />
                <rect x="225" y="480" width="180" height="150" fill="#e0e0e0" />
                <rect x="435" y="510" width="120" height="105" fill="#e0e0e0" />
                <rect x="585" y="495" width="105" height="120" fill="#e0e0e0" />
                <rect x="720" y="480" width="165" height="150" fill="#e0e0e0" />
                <rect x="915" y="510" width="150" height="105" fill="#e0e0e0" />
                <rect x="1095" y="495" width="75" height="120" fill="#e0e0e0" />

                {/* Buildings - Row 4 */}
                <rect x="30" y="720" width="165" height="120" fill="#e0e0e0" />
                <rect x="225" y="705" width="150" height="150" fill="#e0e0e0" />
                <rect x="405" y="735" width="135" height="105" fill="#e0e0e0" />
                <rect x="570" y="720" width="120" height="120" fill="#e0e0e0" />
                <rect x="720" y="705" width="180" height="150" fill="#e0e0e0" />
                <rect x="930" y="735" width="135" height="105" fill="#e0e0e0" />
                <rect x="1095" y="720" width="75" height="120" fill="#e0e0e0" />

                {/* Buildings - Row 5 */}
                <rect x="45" y="945" width="135" height="150" fill="#e0e0e0" />
                <rect x="210" y="960" width="180" height="120" fill="#e0e0e0" />
                <rect x="420" y="930" width="150" height="165" fill="#e0e0e0" />
                <rect x="600" y="960" width="105" height="135" fill="#e0e0e0" />
                <rect x="735" y="945" width="165" height="150" fill="#e0e0e0" />
                <rect x="930" y="930" width="135" height="165" fill="#e0e0e0" />
                <rect x="1095" y="960" width="75" height="135" fill="#e0e0e0" />

                {/* Buildings - Row 6 */}
                <rect x="60" y="1185" width="120" height="135" fill="#e0e0e0" />
                <rect x="210" y="1170" width="165" height="150" fill="#e0e0e0" />
                <rect x="405" y="1200" width="135" height="120" fill="#e0e0e0" />
                <rect x="570" y="1185" width="120" height="135" fill="#e0e0e0" />
                <rect x="720" y="1170" width="180" height="150" fill="#e0e0e0" />
                <rect x="930" y="1200" width="150" height="120" fill="#e0e0e0" />
                <rect x="1110" y="1185" width="60" height="135" fill="#e0e0e0" />

                {/* Buildings - Row 7 */}
                <rect x="30" y="1425" width="150" height="120" fill="#e0e0e0" />
                <rect x="210" y="1410" width="180" height="150" fill="#e0e0e0" />
                <rect x="420" y="1440" width="135" height="105" fill="#e0e0e0" />
                <rect x="585" y="1425" width="120" height="120" fill="#e0e0e0" />
                <rect x="735" y="1410" width="165" height="150" fill="#e0e0e0" />
                <rect x="930" y="1440" width="120" height="105" fill="#e0e0e0" />
                <rect x="1080" y="1425" width="90" height="120" fill="#e0e0e0" />

                {/* Buildings - Row 8 */}
                <rect x="45" y="1635" width="135" height="120" fill="#e0e0e0" />
                <rect x="210" y="1620" width="165" height="135" fill="#e0e0e0" />
                <rect x="405" y="1650" width="150" height="105" fill="#e0e0e0" />
                <rect x="585" y="1635" width="105" height="120" fill="#e0e0e0" />
                <rect x="720" y="1620" width="180" height="135" fill="#e0e0e0" />
                <rect x="930" y="1650" width="150" height="165" fill="#e0e0e0" />
                <rect x="1095" y="1635" width="75" height="120" fill="#e0e0e0" />

                {/* Streets - horizontal */}
                <rect x="0" y="200" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="440" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="665" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="890" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="1130" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="1370" width="1200" height="38" fill="#f8f8f8" />
                <rect x="0" y="1580" width="1200" height="38" fill="#f8f8f8" />

                {/* Streets - vertical */}
                <rect x="188" y="0" width="33" height="1800" fill="#f8f8f8" />
                <rect x="398" y="0" width="33" height="1800" fill="#f8f8f8" />
                <rect x="560" y="0" width="33" height="1800" fill="#f8f8f8" />
                <rect x="712" y="0" width="33" height="1800" fill="#f8f8f8" />
                <rect x="908" y="0" width="33" height="1800" fill="#f8f8f8" />
                <rect x="1072" y="0" width="33" height="1800" fill="#f8f8f8" />

                <defs>
                  <style>
                    {`
                      @keyframes ripple1 {
                        0% { r: 40; opacity: 1; }
                        100% { r: 120; opacity: 0; }
                      }
                      @keyframes ripple2 {
                        0% { r: 40; opacity: 1; }
                        100% { r: 120; opacity: 0; }
                      }
                      @keyframes ripple3 {
                        0% { r: 40; opacity: 1; }
                        100% { r: 120; opacity: 0; }
                      }
                      .ripple-1 {
                        animation: ripple1 2s ease-out infinite;
                      }
                      .ripple-2 {
                        animation: ripple2 2s ease-out infinite 0.66s;
                      }
                      .ripple-3 {
                        animation: ripple3 2s ease-out infinite 1.33s;
                      }
                    `}
                  </style>
                </defs>

                <circle cx="600" cy="900" r="40" fill="none" stroke="#F6DA34" strokeWidth="8" className="ripple-1" />
                <circle cx="600" cy="900" r="40" fill="none" stroke="#F6DA34" strokeWidth="8" className="ripple-2" />
                <circle cx="600" cy="900" r="40" fill="none" stroke="#F6DA34" strokeWidth="8" className="ripple-3" />

                <rect x="525" y="870" width="150" height="60" rx="8" fill="#F6DA34" />
                <text x="600" y="908" textAnchor="middle" fill="black" fontSize="20" fontWeight="bold">
                  Exit Blocked
                </text>

                <path
                  d="M350 500 L350 650 L500 650 L500 1050 L600 1050 L600 1250 L850 1250"
                  stroke="#F6DA34"
                  strokeWidth="12"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div
                className="absolute"
                style={{ top: "26%", left: "28%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
              >
                <LocationPin />
              </div>
              <div
                className="absolute"
                style={{ top: "56%", left: "49%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
              >
                <LocationPin />
              </div>
              <div
                className="absolute"
                style={{ top: "68%", left: "70%", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))" }}
              >
                <LocationPin />
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
            onClick={handleZoomOut}
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
                FAMILY STATUS
              </h1>
            </div>
          </div>
          <div className="absolute top-10 right-6 flex items-center gap-1 bg-white/90 backdrop-blur rounded-full p-1 shadow-sm pointer-events-auto">
            <button
              onClick={() => {
                setViewMode("map")
                setScale(0.7)
                setPosition({ x: 0, y: 0 })
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                viewMode === "map" ? "bg-black text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Map
            </button>
            <button
              onClick={() => {
                setViewMode("drone")
                setScale(1.1)
                setPosition({ x: 0, y: 0 })
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                viewMode === "drone" ? "bg-black text-white" : "text-gray-600 hover:text-black"
              }`}
            >
              Drone
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="bg-white px-6 pt-2 pb-4 rounded-t-3xl -mt-4 relative z-10 border-t border-gray-200">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex flex-col">
          {familyMembers.map((member, index) => (
            <div
              key={member.name}
              className={`flex items-center justify-between py-3 ${
                index < familyMembers.length - 1 ? "border-b border-gray-200" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="7" r="5" fill="#9ca3af" />
                    <path d="M3 21C3 16.5 7 13 12 13C17 13 21 16.5 21 21" fill="#9ca3af" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-foreground">{member.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-4 py-1.5 bg-[#22c55e] text-white text-sm font-medium rounded-full">
                  {member.status}
                </span>
                <button className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                  <Phone className="w-4 h-4 text-gray-600" strokeWidth={2} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function LocationPin() {
  return (
    <div className="relative">
      <svg width="48" height="60" viewBox="0 0 48 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 0C10.74 0 0 10.74 0 24C0 42 24 60 24 60C24 60 48 42 48 24C48 10.74 37.26 0 24 0Z" fill="white" />
        <circle cx="24" cy="18" r="8" fill="#9ca3af" />
        <path d="M10 40C10 32 15.5 26 24 26C32.5 26 38 32 38 40" fill="#9ca3af" />
      </svg>
    </div>
  )
}

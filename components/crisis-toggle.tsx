"use client"

import { useState } from "react"

export function CrisisToggle() {
  const [isOn, setIsOn] = useState(true)

  return (
    <button onClick={() => setIsOn(!isOn)} className="cursor-pointer" aria-label="Toggle crisis mode">
      <div
        className={`h-10 w-fit rounded-full transition-colors duration-300 flex items-center ${
          isOn ? "bg-[#F6DA34] pl-3 pr-1" : "bg-gray-300 pr-3 pl-1"
        }`}
      >
        {isOn ? (
          <>
            <span className="text-xs font-bold tracking-tight whitespace-nowrap pr-2 text-black">CRISIS MODE ON</span>
            <div className="w-8 h-8 bg-white rounded-full shadow-md flex-shrink-0" />
          </>
        ) : (
          <>
            <div className="w-8 h-8 bg-white rounded-full shadow-md flex-shrink-0" />
            <span className="text-xs font-bold tracking-tight whitespace-nowrap pl-2 text-gray-600">
              CRISIS MODE OFF
            </span>
          </>
        )}
      </div>
    </button>
  )
}

"use client"

import Link from "next/link"

export default function AlertScreen() {
  return (
    <Link href="/earthquake" className="block">
      <div className="min-h-screen bg-[#F6DA34] flex flex-col items-center justify-center p-4 cursor-pointer overflow-hidden">
        <div className="relative mb-16" style={{ marginTop: "-80px" }}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <div
              key={i}
              className="absolute w-[200px] h-[200px] rounded-full border-[10px] border-black/15 animate-seismic-wave pointer-events-none"
              style={{
                animationDelay: `${i * 0.75}s`,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Seismic icon */}
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="relative z-10"
          >
            <circle cx="100" cy="100" r="105" fill="#F6DA34" />
            {/* Inner ring */}
            <circle cx="100" cy="100" r="25" stroke="black" strokeWidth="10" fill="none" />
            {/* Middle ring */}
            <circle cx="100" cy="100" r="55" stroke="black" strokeWidth="10" fill="none" />
            {/* Outer ring */}
            <circle cx="100" cy="100" r="85" stroke="black" strokeWidth="10" fill="none" />
          </svg>
        </div>

        {/* Text */}
        <div className="text-center relative z-10">
          <h1 className="text-5xl font-bold tracking-tight text-black">EARTHQUAKE</h1>
          <p className="text-xl font-bold tracking-widest text-black mt-2">DETECTED</p>
        </div>
      </div>
    </Link>
  )
}

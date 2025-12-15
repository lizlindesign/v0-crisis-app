"use client"

import Link from "next/link"
import { ChevronLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ReportPage() {
  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-10 pb-4">
        <Link href="/family-status" className="inline-block">
          <ChevronLeft
            className="w-8 h-8 cursor-pointer hover:opacity-70 transition-opacity text-foreground"
            strokeWidth={2}
          />
        </Link>
        <h1 className="text-4xl font-bold tracking-tight text-foreground mt-4">SEE A PROBLEM?</h1>
      </div>

      {/* Illustration Section */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="relative w-full max-w-sm">
          <Image
            src="/images/exit-blocked.png"
            alt="Exit blocked by boxes"
            width={500}
            height={500}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Bottom Sheet - stays white */}
      <div className="bg-white px-6 pt-2 pb-8 rounded-t-3xl -mt-4 relative z-10">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex flex-col gap-2">
          {/* Report Option */}
          <Link href="#" className="flex items-center justify-between py-4 border-b border-gray-200 group">
            <div>
              <span className="text-2xl font-bold tracking-tight text-foreground">REPORT IT</span>
              <p className="text-sm text-gray-500 mt-1">report a problem may help others</p>
            </div>
            <ArrowRight
              className="w-8 h-8 text-foreground group-hover:translate-x-1 transition-transform"
              strokeWidth={2.5}
            />
          </Link>

          {/* Find a Detour Option */}
          <Link href="/safe-zone" className="flex items-center justify-between py-4 group">
            <div>
              <span className="text-2xl font-bold tracking-tight text-foreground leading-tight">TAKE A DETOUR</span>
              <p className="text-sm text-gray-500 mt-1">It takes 3 mins longer</p>
            </div>
            <ArrowRight
              className="w-8 h-8 text-foreground group-hover:translate-x-1 transition-transform"
              strokeWidth={2.5}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

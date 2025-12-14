import { CrisisToggle } from "@/components/crisis-toggle"
import { ActionButton } from "@/components/action-button"
import { AnimatedArrow } from "@/components/animated-arrow"
import { ArrowUp, Phone } from "lucide-react"
import Link from "next/link"

export default function EarthquakePage() {
  return (
    <div className="h-screen bg-[#f5f5f5] flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-[390px] h-[780px] max-h-full bg-[#f5f5f5] rounded-[40px] overflow-hidden relative flex flex-col">
        {/* Main Content */}
        <div className="flex-1 px-6 pt-12 pb-6 flex flex-col overflow-hidden">
          {/* Crisis Toggle */}
          <CrisisToggle />

          {/* Main Title Section */}
          <div className="mt-12 flex items-start justify-between">
            <div>
              <h1 className="text-6xl font-bold tracking-tight leading-none text-foreground">
                EARTH
                <br />
                QUAKE
              </h1>
              <div className="flex items-center gap-1 mt-3 text-muted-foreground">
                <svg
                  width="14"
                  height="18"
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
                <span className="text-sm">San Francisco, CA</span>
              </div>
            </div>
            <AnimatedArrow />
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          <div className="flex flex-col gap-3">
            <Link href="/risk-mapping" className="block">
              <ActionButton icon={<RiskIcon />} title="WHAT" subtitle="HAPPENED" variant="dark" focused={true} />
            </Link>
            <Link href="/evacuation" className="block">
              <ActionButton
                icon={<ArrowUp className="w-10 h-10" strokeWidth={2.5} />}
                title="WHAT"
                subtitle="TO DO"
                variant="light"
              />
            </Link>
            <Link href="/emergency" className="block">
              <ActionButton icon={<Phone className="w-10 h-10" strokeWidth={2} />} title="CONNECT" variant="light" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function RiskIcon() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="22" cy="22" r="4" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="11" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="22" cy="22" r="18" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  )
}

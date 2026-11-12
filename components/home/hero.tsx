import Image from "next/image"
import Link from "next/link"
import {
  BriefcaseBusinessIcon,
  ChartNoAxesColumnIcon,
  MapPinIcon,
  SearchIcon,
  StarIcon,
  UserRoundSearchIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import GlobeImage from "@/app/assets/globe.png"

const trendingRoles = ["Product Designer", "AI Engineering", "Dev-ops Engineer"]

const stats = [
  { icon: BriefcaseBusinessIcon, value: "50K", label: "Active Jobs" },
  { icon: ChartNoAxesColumnIcon, value: "12K", label: "Companies" },
  { icon: UserRoundSearchIcon, value: "2M", label: "Job Seekers" },
  { icon: StarIcon, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] text-white">
      {/* Globe backdrop */}
      <Image
        src={GlobeImage}
        alt=""
        aria-hidden
        priority
        sizes="(min-width: 640px) 100vw, 170vw"
        className="pointer-events-none absolute left-1/2 w-[170%] max-w-none -translate-x-1/2 select-none sm:w-full sm:max-w-[1400px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
        {/* Badge */}
        <div className="flex justify-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-[#151515] py-1.5 pr-4 pl-2 shadow-[0_0_24px_rgba(255,255,255,0.07)]">
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber-500/15 text-amber-400">
              <BriefcaseBusinessIcon className="size-3.5" />
            </span>
            <span className="text-sm font-semibold">98,000+</span>
            <span className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
              New jobs this month
            </span>
          </p>
        </div>

        {/* Heading */}
        <h1 className="mt-7 text-center text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-md text-center text-sm leading-relaxed text-balance text-neutral-400 sm:max-w-xl sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <form
          role="search"
          className="mx-auto mt-9 flex max-w-2xl items-center gap-2 rounded-xl border border-white/10 bg-[#141414] p-1.5"
        >
          <div className="flex min-w-0 flex-1 items-center gap-2 px-3">
            <SearchIcon className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="keyword"
              aria-label="Job title, skill, or company"
              placeholder="Job title, skill or company"
              className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>
          <div className="hidden h-6 w-px bg-white/10 sm:block" />
          <div className="hidden min-w-0 items-center gap-2 px-2 sm:flex sm:w-52">
            <MapPinIcon className="size-4 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="location"
              aria-label="Location or remote"
              placeholder="Location or Remote"
              className="h-9 w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </div>
          <Button
            type="submit"
            size="icon-lg"
            aria-label="Search jobs"
            className="shrink-0 rounded-lg bg-[#7a5af8] text-white hover:bg-[#6d4ff0]"
          >
            <SearchIcon />
          </Button>
        </form>

        {/* Trending positions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-neutral-500">Trending Position:</span>
          {trendingRoles.map((role) => (
            <Link
              key={role}
              href="/jobs"
              className="rounded-md border border-white/10 bg-[#151515] px-3 py-1.5 text-xs text-neutral-300 transition-colors hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              {role}
            </Link>
          ))}
        </div>

        {/* Globe overlay: headline + stats */}
        <div className="mt-24 flex flex-col items-center sm:mt-40 lg:mt-80 xl:mt-96">
          <p className="text-center text-xl leading-snug font-medium sm:text-2xl lg:text-[28px]">
            <span className="block text-white">
              Assisting over 15,000 job seekers
            </span>
            <span className="block text-white/60">
              find their dream positions.
            </span>
          </p>

          <div className="mt-10 grid w-full grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex h-40 flex-col justify-between rounded-xl border border-white/[0.08] bg-[#151515] p-4 sm:h-44 sm:p-5"
              >
                <stat.icon
                  className="size-5 text-neutral-400"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400 sm:text-sm">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

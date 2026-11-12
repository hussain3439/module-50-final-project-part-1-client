import Link from "next/link"
import {
  ArrowRightIcon,
  BriefcaseBusinessIcon,
  CircleEuroIcon,
  MapPinIcon,
} from "lucide-react"

const job = {
  title: "Frontend Developer",
  description:
    "Showcase your commitment to diversity and inclusion by highlighting initiatives",
  location: "New York, USA",
  type: "Hybrid",
  salary: "€25-€40/hour",
}

// Static mock data — six identical slots, swap for real listings later.
const jobs = Array.from({ length: 6 }, (_, index) => ({ ...job, id: index + 1 }))

const tagBase =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0f0f0f] px-3 py-1 text-[11px] text-neutral-300"

function JobCard() {
  return (
    <article className="flex flex-col rounded-xl border border-white/[0.06] bg-[#141414] p-5 sm:p-6">
      <h3 className="text-lg font-semibold tracking-tight sm:text-xl">
        {job.title}
      </h3>
      <p className="mt-2.5 text-xs leading-relaxed text-neutral-400 sm:text-[13px]">
        {job.description}
      </p>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className={tagBase}>
          <MapPinIcon className="size-3 text-[#9d8bff]" />
          {job.location}
        </span>
        <span className={tagBase}>
          <BriefcaseBusinessIcon className="size-3 text-[#9d8bff]" />
          {job.type}
        </span>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className={tagBase}>
          <CircleEuroIcon className="size-3 text-[#9d8bff]" />
          {job.salary}
        </span>
      </div>

      <div className="mt-auto pt-6">
        <Link
          href="/jobs"
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-[#9d8bff]"
        >
          Apply Now
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}

export function JobDiscovery() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dashed frame around badge + heading */}
        <div className="mx-auto w-fit border border-dashed border-white/20 px-8 py-7 text-center sm:px-16">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[#9d8bff] uppercase">
            <span aria-hidden>✦ </span>
            Smart Job Discovery
            <span aria-hidden> ✦</span>
          </p>
          <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-tight">
            The roles you&apos;d never find by searching
          </h2>
        </div>

        {/* Cards + CTA inside blueprint dashed guides */}
        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-px border-l border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-px border-l border-dashed border-white/15"
          />

          <div className="grid gap-5 px-2 pt-10 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job.id} />
            ))}
          </div>

          <div className="flex justify-center pt-8 pb-10">
            <Link
              href="/jobs"
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-neutral-900 transition-colors hover:bg-neutral-200"
            >
              View all job open
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

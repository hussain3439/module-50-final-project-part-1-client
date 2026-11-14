import Link from "next/link"
import {
  ArrowRightIcon,
  BanknoteIcon,
  BriefcaseBusinessIcon,
  MapPinIcon,
} from "lucide-react"

import type { JobPost } from "@/lib/types"

// Small pill/tag style, reused for every tag inside the card.
const tagClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0f0f0f] px-3 py-1 text-[11px] text-neutral-300"
const tagIconClass = "size-3 text-[#9d8bff]"

// Job listing card used by the Browse Jobs grid.
export function JobCard({ job }: { job: JobPost }) {
  return (
    <article className="flex flex-col rounded-xl border border-white/[0.06] bg-[#141414] p-5 sm:p-6">
      {/* Category chip */}
      <span className="inline-flex w-fit items-center rounded-full border border-[#7a5af8]/30 bg-[#7a5af8]/15 px-3 py-1 text-[11px] font-medium text-[#b3a5ff]">
        {job.category}
      </span>

      <h3 className="mt-4 text-lg font-semibold tracking-tight sm:text-xl">
        {job.title}
      </h3>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        {/* Location */}
        <span className={tagClass}>
          <MapPinIcon className={tagIconClass} />
          {job.location || "Remote"}
        </span>

        {/* Job type */}
        <span className={tagClass}>
          <BriefcaseBusinessIcon className={tagIconClass} />
          {job.type}
        </span>

        {/* Salary is optional — only show the tag when the post has one. */}
        {job.salaryMin && (
          <span className={tagClass}>
            <BanknoteIcon className={tagIconClass} />
            {job.currency} {job.salaryMin} - {job.salaryMax}
          </span>
        )}
      </div>

      <div className="mt-auto pt-6">
        {/* Every card leads to the job details page. */}
        <Link
          href={`/brows-jobs/${job._id}`}
          className="group inline-flex items-center gap-1.5 text-sm font-medium text-white transition-colors hover:text-[#9d8bff]"
        >
          View details
          <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  )
}

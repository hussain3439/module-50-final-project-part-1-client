import Link from "next/link"
import {
  ArrowLeftIcon,
  BanknoteIcon,
  BriefcaseBusinessIcon,

  MapPinIcon,
} from "lucide-react"

import { JobCard } from "@/components/jobs/job-card"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteNavbar } from "@/components/shared/site-navbar"
import { browsDetailJob, getJobs } from "@/lib/api/jobs"
import { JobPost } from "@/lib/types"
import JobApplyButton from "@/components/jobs/JobApplyButton"

export const metadata = {
  title: "Job Details",
}

const cardClass = "rounded-xl border border-white/[0.06] bg-[#141414]"

const tagClass =
  "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0f0f0f] px-3 py-1 text-[11px] text-neutral-300"
const tagIconClass = "size-3 text-[#9d8bff]"

const infoLabelClass = "text-[11px] font-medium uppercase tracking-wider text-neutral-400"
const infoValueClass = "mt-2 text-lg font-semibold tracking-tight text-white"

const bulletTextClass = "text-sm leading-relaxed text-neutral-300"

const JobDetailsPage = async ({params}: {params: Promise<{ jobId: string }>}) => {
  const { jobId } = await params

  const job = await browsDetailJob(jobId)

  //   similar jobs er jonnno getJobs() ke call kore filter kore max 3 job similar show kora holo: note
  const jobs: JobPost[] = await getJobs()
  const similarJobs = jobs
    .filter((other) => other.category === job.category && other._id !== job._id)
    .slice(0, 3)

  if (!job || !job.title) {
    return (
      <>
        <main className="bg-[#0a0a0a] text-white">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-dashed border-white/15 px-6 py-16 text-center">
              <p className="text-sm text-neutral-400">
                This job could not be found.
              </p>
              <Link
                href="/brows-jobs"
                className="mt-4 inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <ArrowLeftIcon className="size-4" />
                Back to Browse Jobs
              </Link>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <SiteNavbar />

      <main className="bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Hero header (same blurred-glow panel as the Figma header section) */}
          <div className="pt-8">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141414] p-6 sm:p-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(122,90,248,0.18),transparent)]"
              />

              <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <Link
                    href="/brows-jobs"
                    className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                  >
                    <ArrowLeftIcon className="size-4" />
                    Back to Browse Jobs
                  </Link>

                  {/* Category chip */}
                  <span className="mt-4 inline-flex w-fit items-center rounded-full border border-[#7a5af8]/30 bg-[#7a5af8]/15 px-3 py-1 text-[11px] font-medium text-[#b3a5ff]">
                    {job.category}
                  </span>

                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {job.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className={tagClass}>
                      <MapPinIcon className={tagIconClass} />
                      {job.location || "Remote"}
                    </span>
                    <span className={tagClass}>
                      <BriefcaseBusinessIcon className={tagIconClass} />
                      {job.type}
                    </span>
                    {job.salaryMin && (
                      <span className={tagClass}>
                        <BanknoteIcon className={tagIconClass} />
                        {job.currency} {job.salaryMin} - {job.salaryMax}
                      </span>
                    )}
                  </div>
                </div>

                <JobApplyButton job={job} />
              </div>
            </div>
          </div>

          {/* Bento info grid (salary / location / job type / deadline) */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className={cardClass + " p-5"}>
              <p className={infoLabelClass}>Salary Range</p>
              <p className={infoValueClass}>
                {job.salaryMin
                  ? `${job.currency} ${job.salaryMin} - ${job.salaryMax}`
                  : "—"}
              </p>
            </div>
            <div className={cardClass + " p-5"}>
              <p className={infoLabelClass}>Location</p>
              <p className={infoValueClass}>{job.location || "Remote"}</p>
            </div>
            <div className={cardClass + " p-5"}>
              <p className={infoLabelClass}>Job Type</p>
              <p className={infoValueClass}>{job.type}</p>
            </div>
            <div className={cardClass + " p-5"}>
              <p className={infoLabelClass}>Deadline</p>
              <p className={infoValueClass}>
                {job.deadline
                  ? new Date(job.deadline).toLocaleDateString()
                  : "—"}
              </p>
            </div>
          </div>

          {/* Content sections + sidebar */}

          <div className="mt-6 grid items-start gap-6 pb-12 lg:grid-cols-[1fr_320px]">
            {/* Content sections */}
            <div className={cardClass}>
              {/* Responsibilities */}
              {job.responsibilities && (
                <section className="border-b border-white/10 p-6 sm:p-8">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Responsibilities
                  </h2>
                  <p className={`${bulletTextClass} mt-4 whitespace-pre-line`}>
                    {job.responsibilities}
                  </p>
                </section>
              )}

              {/* Requirements */}
              {job.requirements && (
                <section className="border-b border-white/10 p-6 sm:p-8">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Requirements
                  </h2>
                  <p className={`${bulletTextClass} mt-4 whitespace-pre-line`}>
                    {job.requirements}
                  </p>
                </section>
              )}

              {/* Benefits */}
              {job.benefits && (
                <section className="p-6 sm:p-8">
                  <h2 className="text-lg font-semibold tracking-tight">
                    Benefits
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed whitespace-pre-line text-neutral-300">
                    {job.benefits}
                  </p>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <aside className={`${cardClass} p-6 lg:sticky lg:top-20`}>
              <h2 className="text-lg font-semibold tracking-tight">
                Job Overview
              </h2>

              <div className="mt-4">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-sm">
                  <span className="text-neutral-400">Category</span>
                  <span className="font-medium text-white">{job.category}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-sm">
                  <span className="text-neutral-400">Job Type</span>
                  <span className="font-medium text-white">{job.type}</span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-sm">
                  <span className="text-neutral-400">Location</span>
                  <span className="text-right font-medium text-white">
                    {job.location || "Remote"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 border-b border-white/10 py-3 text-sm">
                  <span className="text-neutral-400">Deadline</span>
                  <span className="font-medium text-white">
                    {job.deadline
                      ? new Date(job.deadline).toLocaleDateString()
                      : "—"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 py-3 text-sm">
                  <span className="text-neutral-400">Status</span>
                  <span className="font-medium text-white capitalize">
                    {job.status || "—"}
                  </span>
                </div>
              </div>

              <Link
                href="/brows-jobs"
                className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-white/10 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ArrowLeftIcon className="size-4" />
                Back to Browse Jobs
              </Link>
            </aside>
          </div>

          {/* Similar jobs from the same category */}
          {similarJobs.length > 0 && (
            <section className="border-t border-white/10 py-12">
              <h2 className="text-2xl font-semibold tracking-tight">
                Similar Jobs
              </h2>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {similarJobs.map((similar) => (
                  <JobCard key={similar._id} job={similar} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <SiteFooter />
    </>
  )
}

export default JobDetailsPage

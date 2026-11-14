import Link from "next/link"
import {
  BriefcaseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CodeIcon,
  DatabaseIcon,
  DownloadIcon,
  HandshakeIcon,
  HeadphonesIcon,
  MegaphoneIcon,
  PaletteIcon,
  UsersIcon,
  WalletIcon,
  type LucideIcon,
} from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import type { ApplicationStatus, JobApplication } from "@/lib/types"

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 1000 * 60 * 60 * 24).toISOString()

const applications: JobApplication[] = [
  {
    _id: "demo-app-1",
    jobId: "6af6f9fed698b681e41472b8",
    jobTitle: "Digital Marketting",
    jobCategory: "Marketing",
    company: "AdVantage Media",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    coverLetter: "I would love to grow your marketing team.",
    status: "applied",
    dateApplied: daysAgo(0.1), // a few hours ago
  },
  {
    _id: "demo-app-2",
    jobId: "6af6fee894837b847d6f6d0b",
    jobTitle: "UI/UX Designer",
    jobCategory: "Design & Creative",
    company: "CloudScale AI",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    status: "under review",
    dateApplied: daysAgo(2),
  },
  {
    _id: "demo-app-3",
    jobId: "6af6fee894837b847d6f6d0c",
    jobTitle: "Backend Developer (Node.js)",
    jobCategory: "Software Development",
    company: "ByteWorks",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    status: "offered",
    dateApplied: daysAgo(9),
  },
  {
    _id: "demo-app-4",
    jobId: "6af6fee894837b847d6f6d0e",
    jobTitle: "Data Analyst (Intern)",
    jobCategory: "Data & Analytics",
    company: "DataPulse",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    status: "rejected",
    dateApplied: daysAgo(6),
  },
  {
    _id: "demo-app-5",
    jobId: "6af71d9717e68b46286069f9",
    jobTitle: "A Backend Developer",
    jobCategory: "Software Development",
    company: "CloudScale AI",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    status: "shortlisted",
    dateApplied: daysAgo(14),
  },
  {
    _id: "demo-app-6",
    jobId: "6af73bb5673a02610addaf95",
    jobTitle: "Web Developer from Bangladesh",
    jobCategory: "Data & Analytics",
    company: "NexaSoft",
    userId: "demo-user-1",
    email: "seeker@hireloop.dev",
    userName: "Demo Seeker",
    status: "applied",
    dateApplied: daysAgo(40),
  },
]

// ── Small helpers ─────────────────────────────────────────────────────────────

// The spec wants relative dates in this table (e.g. "2 hours ago").
const timeAgo = (date: string) => {
  const minutes = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60)
  )
  if (minutes < 60) return "Just now"
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return hours === 1 ? "1 hour ago" : `${hours} hours ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return "Yesterday"
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

// Badge color for each status (same pattern as the Manage Jobs table).
const statusBadge: Record<ApplicationStatus, string> = {
  applied: "bg-white/10 text-neutral-300",
  "under review": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  shortlisted: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  rejected: "bg-red-500/10 text-red-600 dark:text-red-400",
  offered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

// Icon tile next to each job title, colored by the job's category.
const categoryIcons: Record<string, LucideIcon> = {
  "Software Development": CodeIcon,
  "Design & Creative": PaletteIcon,
  Marketing: MegaphoneIcon,
  "Data & Analytics": DatabaseIcon,
  "Customer Support": HeadphonesIcon,
  Finance: WalletIcon,
  "Human Resources": UsersIcon,
  Sales: HandshakeIcon,
  Other: BriefcaseIcon,
}

const categoryTileClass: Record<string, string> = {
  "Software Development": "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  "Design & Creative": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  Marketing: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Data & Analytics": "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "Customer Support": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  Finance: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "Human Resources": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  Sales: "bg-red-500/10 text-red-600 dark:text-red-400",
  Other: "bg-neutral-500/10 text-neutral-600 dark:text-neutral-400",
}

const MyApplicationsPage = () => {
  // Stats are computed from the same list, so they keep working with real data.
  const totalApplied = applications.length
  const shortlistedCount = applications.filter(
    (application) => application.status === "shortlisted"
  ).length
  const inReviewCount = applications.filter(
    (application) => application.status === "under review"
  ).length
  const offeredCount = applications.filter(
    (application) => application.status === "offered"
  ).length
  // Success rate = offers ÷ total applications, as a rounded percentage.
  const successRate =
    totalApplied === 0 ? 0 : Math.round((offeredCount / totalApplied) * 100)

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header: title + view toggle + export */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Applications</h1>
          <p className="text-sm text-muted-foreground">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* TODO: make these two buttons filter the table once archived
              applications exist. For now they are just visuals. */}
          <div className="inline-flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
            <span className="inline-flex h-7 items-center rounded-md bg-white/10 px-3 text-sm font-medium text-white">
              Active
            </span>
            <span className="inline-flex h-7 items-center rounded-md px-3 text-sm text-muted-foreground">
              Archived
            </span>
          </div>

          {/* TODO: generate + download a PDF of the applications. */}
          <button type="button" className={cn(buttonVariants())}>
            <DownloadIcon />
            Export PDF
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Applied</p>
          <p className="mt-1 text-2xl font-semibold">{totalApplied}</p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Shortlisted</p>
          <p className="mt-1 text-2xl font-semibold">{shortlistedCount}</p>
        </div>
        {/* Our status list has no "interview" state, so this card counts the
            applications currently under review. */}
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">In Review</p>
          <p className="mt-1 text-2xl font-semibold text-amber-500 dark:text-amber-400">
            {inReviewCount}
          </p>
        </div>
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Success Rate</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-500 dark:text-emerald-400">
            {successRate}%
          </p>
        </div>
      </div>

      {/* Applications table */}
      <div className="overflow-x-auto rounded-xl border bg-card">
        {/* min-w keeps columns readable; the wrapper scrolls horizontally on small screens */}
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Applied</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              const Icon =
                categoryIcons[application.jobCategory] ?? BriefcaseIcon
              return (
                <tr
                  key={application._id}
                  className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          categoryTileClass[application.jobCategory] ??
                            categoryTileClass.Other
                        )}
                      >
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <div className="font-medium">
                          {application.jobTitle}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {application.jobCategory}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">{application.company}</td>

                  <td className="px-4 py-3 whitespace-nowrap">
                    {timeAgo(application.dateApplied)}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        statusBadge[application.status]
                      )}
                    >
                      {application.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    {/* Links to the public job details page */}
                    <Link
                      href={`/brows-jobs/${application.jobId}`}
                      className="text-sm font-medium transition-colors hover:underline"
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Footer: summary + pager */}
        {applications.length > 0 && (
          <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing 1-{applications.length} of {applications.length}{" "}
              applications
            </p>

            {/* TODO: real pagination when the applications endpoint
                returns pages — for now there is only page 1. */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                })}
              >
                <ChevronLeftIcon />
              </button>
              <button
                type="button"
                className={buttonVariants({ size: "icon-sm" })}
              >
                1
              </button>
              <button
                type="button"
                disabled
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                })}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        )}

        {applications.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No applications yet — apply to jobs from the Browse Jobs page.
          </div>
        )}
      </div>
    </div>
  )
}

export default MyApplicationsPage

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
import { getApplication } from "@/lib/actions/application"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

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

const MyApplicationsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  const applications: JobApplication[] = await getApplication(`applicantId=${session?.user.id}`)

  // Application statistics
  const totalApplied = applications.length

  const shortlistedCount = applications.filter(
    (app) => app.status === "shortlisted"
  ).length

  const inReviewCount = applications.filter(
    (app) => app.status === "under review"
  ).length

  const offeredCount = applications.filter(
    (app) => app.status === "offered"
  ).length

  const successRate = totalApplied
    ? Math.round((offeredCount / totalApplied) * 100)
    : 0

  // Stats data
  const stats = [
    { title: "Total Applied", value: totalApplied },
    { title: "Shortlisted", value: shortlistedCount },
    {
      title: "In Review",
      value: inReviewCount,
      color: "text-amber-500 dark:text-amber-400",
    },
    {
      title: "Success Rate",
      value: `${successRate}%`,
      color: "text-emerald-500 dark:text-emerald-400",
    },
  ]

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">My Applications</h1>
          <p className="text-sm text-muted-foreground">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1 rounded-lg border bg-muted/30 p-1">
            <span className="inline-flex h-7 items-center rounded-md bg-white/10 px-3 text-sm font-medium text-white">
              Active
            </span>
            <span className="inline-flex h-7 items-center rounded-md px-3 text-sm text-muted-foreground">
              Archived
            </span>
          </div>

          <button type="button" className={cn(buttonVariants())}>
            <DownloadIcon />
            Export PDF
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="rounded-xl border bg-card p-5">
            <p className="text-sm text-muted-foreground">{stat.title}</p>
            <p className={cn("mt-1 text-2xl font-semibold", stat.color)}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Applications Table */}
      <div className="overflow-x-auto rounded-xl border bg-card">
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
            {applications.map((app) => {
              const Icon = categoryIcons[app.jobCategory] || BriefcaseIcon

              return (
                <tr
                  key={app._id}
                  className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
                >
                  {/* Job Title */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex size-9 shrink-0 items-center justify-center rounded-lg",
                          categoryTileClass[app.jobCategory] ||
                            categoryTileClass.Other
                        )}
                      >
                        <Icon className="size-4" />
                      </span>

                      <div>
                        <p className="font-medium">{app.jobTitle}</p>
                        <p className="text-xs text-muted-foreground">
                          {app.jobCategory}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="px-4 py-3">{app.company}</td>

                  {/* Applied Date */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {timeAgo(app.dateApplied)}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                        statusBadge[app.status]
                      )}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/brows-jobs/${app.jobId}`}
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

        {/* Table Footer */}
        {applications.length > 0 && (
          <div className="flex items-center justify-between gap-4 border-t px-4 py-3">
            <p className="text-xs text-muted-foreground">
              Showing 1-{applications.length} of {applications.length}{" "}
              applications
            </p>

            <div className="flex items-center gap-1">
              <button
                disabled
                className={buttonVariants({
                  variant: "outline",
                  size: "icon-sm",
                })}
              >
                <ChevronLeftIcon />
              </button>

              <button className={buttonVariants({ size: "icon-sm" })}>1</button>

              <button
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

        {/* Empty State */}
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

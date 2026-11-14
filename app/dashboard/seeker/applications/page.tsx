import Link from "next/link"
import { Eye } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import type { ApplicationStatus, JobApplication } from "@/lib/types"

// Dummy data for now — swap it for a getApplications() call once the
// backend applications endpoint is ready.
const daysAgo = (days: number) =>
  new Date(Date.now() - days * 1000 * 60 * 60 * 24).toISOString()

// The spec wants relative dates in this table (e.g. "5 days ago").
const timeAgo = (date: string) => {
  const diffInDays = Math.floor(
    (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  )
  if (diffInDays <= 0) return "Today"
  if (diffInDays === 1) return "Yesterday"
  if (diffInDays < 30) return `${diffInDays} days ago`
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`
  return `${Math.floor(diffInDays / 365)} years ago`
}

// Badge color for each status (same pattern as the Manage Jobs table).
const statusBadge: Record<ApplicationStatus, string> = {
  applied: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  "under review": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  shortlisted: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  rejected: "bg-red-500/10 text-red-600 dark:text-red-400",
  offered: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
}

// Placeholder applications until real data is wired up. The jobIds point to
// real job posts, so "View Details" already lands on a working page.
const applications: JobApplication[] = [
  {
    _id: "demo-app-1",
    jobId: "6af6f9fed698b681e41472b8",
    jobTitle: "Digital Marketting",
    company: "AdVantage Media",
    coverLetter: "I would love to grow your marketing team.",
    status: "applied",
    dateApplied: daysAgo(1),
  },
  {
    _id: "demo-app-2",
    jobId: "6af6fee894837b847d6f6d0b",
    jobTitle: "UI/UX Designer",
    company: "CloudScale AI",
    coverLetter: "Designing clean interfaces is what I do best.",
    status: "under review",
    dateApplied: daysAgo(2),
  },
  {
    _id: "demo-app-3",
    jobId: "6af6fee894837b847d6f6d0c",
    jobTitle: "Backend Developer (Node.js)",
    company: "ByteWorks",
    coverLetter: "Five years of Node.js and REST APIs.",
    status: "offered",
    dateApplied: daysAgo(9),
  },
  {
    _id: "demo-app-4",
    jobId: "6af6fee894837b847d6f6d0e",
    jobTitle: "Data Analyst (Intern)",
    company: "DataPulse",
    coverLetter: "Eager to learn analytics on real data.",
    status: "rejected",
    dateApplied: daysAgo(6),
  },
  {
    _id: "demo-app-5",
    jobId: "6af71d9717e68b46286069f9",
    jobTitle: "A Backend Developer",
    company: "CloudScale AI",
    coverLetter: "APIs, databases and clean code.",
    status: "shortlisted",
    dateApplied: daysAgo(14),
  },
  {
    _id: "demo-app-6",
    jobId: "6af73bb5673a02610addaf95",
    jobTitle: "Web Developer from Bangladesh",
    company: "NexaSoft",
    coverLetter: "Full-stack React and Next.js projects.",
    status: "applied",
    dateApplied: daysAgo(40),
  },
]

const MyApplicationsPage = () => {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">My Applications</h1>
        <p className="text-sm text-muted-foreground">
          Every job you applied to and where it stands.
        </p>
      </div>

      {/* Applications table */}
      <div className="overflow-x-auto rounded-xl border">
        {/* min-w keeps columns readable; the wrapper scrolls horizontally on small screens */}
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="px-4 py-3 font-medium">Job Title</th>
              <th className="px-4 py-3 font-medium">Company</th>
              <th className="px-4 py-3 font-medium">Date Applied</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr
                key={application._id}
                className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
              >
                <td className="px-4 py-3 font-medium">
                  {application.jobTitle}
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
                    className={buttonVariants({
                      variant: "outline",
                      size: "sm",
                    })}
                  >
                    <Eye />
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

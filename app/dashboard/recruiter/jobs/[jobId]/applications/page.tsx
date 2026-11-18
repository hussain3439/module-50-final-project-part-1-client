import Link from "next/link"
import { ArrowLeft, Users } from "lucide-react"
import { cn } from "cn"

import { buttonVariants } from "@/components/ui/button"
import type { ApplicationStatus, JobApplication, JobPost } from "@/lib/types"
import { getApplication } from "@/lib/actions/application"
import { detailJob } from "@/lib/api/jobs"
import { StatusUpdateSelect } from "../../../../_components/StatusUpdateSelect"

// Relative dates in the table (e.g. "2 hours ago").
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

// Badge color for each status (matches the redesign pill colors).


// Older application documents were saved before the backend added a
// status, so fall back to "applied" for those.
const getStatus = (app: JobApplication): ApplicationStatus => app.status ?? "applied"

const ApplicationsPage = async ({
  params,
}: { params: Promise<{ jobId: string }> }) => {
  const { jobId } = await params

  // Load the job (for the header) and all of its applications in parallel.
  const [job, applications] = await Promise.all([
    detailJob(jobId) as Promise<JobPost>,
    getApplication(`jobId=${jobId}`) as Promise<JobApplication[]>,
  ])




  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header: breadcrumb + job title + back link */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
            <Link
              href="/dashboard/recruiter/jobs"
              className="transition-colors hover:text-white"
            >
              Manage Jobs
            </Link>
            <span className="mx-1 opacity-50">/</span>
            <Link
              href={`/dashboard/recruiter/jobs/${jobId}`}
              className="transition-colors hover:text-white"
            >
              {job?.title || "Job"}
            </Link>
            <span className="mx-1 opacity-50">/</span>
            <span className="font-medium text-foreground">Applications</span>
          </div>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            Job Applications
          </h1>
          <p className="text-sm text-muted-foreground">
            Review applicants for{" "}
            {job?.title ? job.title : "this job"}{" "}
            at{" "}
            {job?.companyId ? job.companyId : "AuthBD"} and update their hiring
            status.
          </p>
        </div>

        <Link
          href="/dashboard/recruiter/jobs"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <ArrowLeft className="mr-2 size-4" />
          Back to Jobs
        </Link>
      </div>



      {/* Applications table */}
      <div className="rounded-xl border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Applicant
              </th>
              <th className="px-4 py-3 font-medium text-muted-foreground">
                Applied
              </th>
             
              <th className="px-4 py-3 font-medium text-muted-foreground text-right">
                Update status
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => {
              const status = getStatus(app)

              return (
                <tr
                  key={app._id}
                  className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
                >
                  {/* Applicant: email */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-semibold uppercase text-primary">
                        {(app.email || "??").slice(0, 2).toUpperCase()}
                      </span>

                      <div>
                        <p className="font-medium text-foreground">
                          {app.email}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {app.userName}
                               </p>
                      </div>
                    </div>
                  </td>

                  {/* Applied date */}
                  <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                    {timeAgo(app.dateApplied)}
                  </td>

                

                  {/* Recruiter updates the status (saves to DB) */}
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end">
                      <StatusUpdateSelect applicationId={app._id} status={status} />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        {/* Empty State */}
        {applications.length === 0 && (
          <div className="flex flex-col items-center gap-3 px-4 py-10 text-center">
            <span className="flex size-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Users className="size-6" />
            </span>
            <p className="text-sm text-muted-foreground">
              No applications yet for this job — applicants will appear here
              once they apply.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ApplicationsPage

import Link from "next/link"
import { cn } from "cn"
import {

  Eye,
  Pencil,

  SquarePlus,

} from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { getJobs } from "@/lib/api/jobs"
import { DeleteJobDialogue } from "../../_components/DeleteJobDialogue"
import { JobPost } from "@/lib/types"

export type JobStatus = "active" | "closed" | "draft"

const formatDate = (date: string) => {
  if (!date) return "Not specified";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const statusBadge: Record<JobStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  closed: "bg-red-500/10 text-red-600 dark:text-red-400",
  draft: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
}

const ManageJobPage = async () => {
  const jobs: JobPost[] = await getJobs()
//   console.log(jobs)

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      {/* Header: title + plan usage + Post New Job */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Manage Jobs</h1>
          <p className="text-sm text-muted-foreground">
            All job posts created by your company.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Plan usage indicator: active posts used vs. allowed */}

          <Link
            href="/dashboard/recruiter/jobs/new"

            className={cn(buttonVariants())}
          >
            <SquarePlus />
            Post New Job
          </Link>
        </div>
      </div>

      {/* Job posts table */}
      <div className="overflow-x-auto rounded-xl border">
        {/* min-w keeps columns readable; the wrapper scrolls horizontally on small screens */}
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b bg-muted/50 text-left">
              <th className="px-4 py-3 font-medium">Job</th>
              <th className="px-4 py-3 font-medium">Applicants</th>
              <th className="hidden px-4 py-3 font-medium md:table-cell">
                Salary
              </th>
              <th className="hidden px-4 py-3 font-medium lg:table-cell">
                Location
              </th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="hidden px-4 py-3 font-medium sm:table-cell">
                DeadLine
              </th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job._id}
                className="border-b transition-colors last:border-b-0 hover:bg-muted/40"
              >
                <td className="px-4 py-3">
                  <div className="font-medium">{job.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {job.category} · {job.type}
                  </div>
                </td>

                <td className="px-4 py-3">{job.applicantsCount}</td>

                <td className="hidden px-4 py-3 whitespace-nowrap md:table-cell">
                  {job.currency} {Number(job.salaryMin).toLocaleString()} –{" "}
                  {Number(job.salaryMax).toLocaleString()}
                </td>

                <td className="hidden px-4 py-3 lg:table-cell">
                  {job.location}
                </td>

                <td className="px-4 py-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize",
                      statusBadge[job.status]
                    )}
                  >
                    {job.status}
                  </span>
                </td>

                <td className="hidden px-4 py-3 whitespace-nowrap sm:table-cell">
                  {formatDate(job.deadline)}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">

                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}/edit-job`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon-sm",
                      })}
                      title="Edit"
                    >
                      <Pencil />
                    </Link>

                    {/* view detail job link */}
                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}`}
                      className={buttonVariants({
                        variant: "ghost",
                        size: "icon-sm",
                      })}
                      title="View applicants"
                    >
                      <Eye />
                    </Link>

                    <DeleteJobDialogue job={job} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {jobs.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-muted-foreground">
            No job posts yet — post your first job.
          </div>
        )}
      </div>
    </div>
  )
}

export default ManageJobPage

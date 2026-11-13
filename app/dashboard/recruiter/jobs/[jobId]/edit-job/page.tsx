"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { detailJob } from "@/lib/api/jobs"
import { updateJob } from "@/lib/actions/job"
import type { JobPost } from "@/lib/types"

const jobCategories = [
  "Software Development",
  "Design & Creative",
  "Marketing",
  "Data & Analytics",
  "Customer Support",
  "Finance",
  "Human Resources",
  "Sales",
  "Other",
]

const jobTypes = ["Full-time", "Part-time", "Remote", "Contract", "Internship"]

const currencies = ["USD", "BDT", "EUR", "GBP", "INR"]

// Same visual language as components/ui/input.tsx
const selectClass =
  "h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
const textareaClass =
  "w-full min-h-24 rounded-lg border border-input bg-transparent px-2.5 py-2 text-base outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
const labelClass = "text-sm font-medium"

const EditJobPage = () => {
  const { jobId } = useParams<{ jobId: string }>()
  const router = useRouter()
  const [job, setJob] = useState<JobPost | null>(null)

  // Load the job once — inputs are uncontrolled, so we only need it for defaultValue.
  useEffect(() => {
    const loadJob = async () => {
      const data = await detailJob(jobId)
      setJob(data)
    }
    loadJob()
  }, [jobId])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // One FormData collects every named field of the form in a single call.
    // Object.fromEntries turns the [name, value] pairs into a plain object —
    // no per-field state or onChange handlers needed at all.
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as unknown as JobPost
    await updateJob(jobId, data)
    toast.success("Job updated successfully!")
    router.push("/dashboard/recruiter/jobs")
  }

  // Don't render the form until the job data is loaded (defaultValue needs it).
  if (!job) {
    return <p className="p-6 text-sm text-muted-foreground">Loading job…</p>
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Edit Job</h1>
        <p className="text-sm text-muted-foreground">
          Update the details of this job post.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* status travels with the payload but is normally changed
            via Close/Reopen on the Manage Jobs table */}
        <input type="hidden" name="status" value={job.status} />

        {/* Company — auto-filled, read-only */}
        <div className="space-y-1.5">
          <label className={labelClass}>Company</label>
          <Input
            placeholder="Auto-filled from your registered company"
            disabled
          />
        </div>

        {/* Job Info */}
        <section className="space-y-4 rounded-xl border p-5">
          <h2 className="font-medium">Job Info</h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="title" className={labelClass}>
                Job Title
              </label>
              <Input
                id="title"
                name="title"
                defaultValue={job.title}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="type" className={labelClass}>
                Job Type
              </label>
              <select
                id="type"
                name="type"
                defaultValue={job.type}
                className={selectClass}
                required
              >
                <option value="" disabled>
                  Select job type
                </option>
                {jobTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="category" className={labelClass}>
              Job Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={job.category}
              className={selectClass}
              required
            >
              <option value="" disabled>
                Select category
              </option>
              {jobCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="salaryMin" className={labelClass}>
                Salary Min
              </label>
              <Input
                id="salaryMin"
                name="salaryMin"
                type="number"
                min={0}
                defaultValue={job.salaryMin}
                placeholder="30000"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="salaryMax" className={labelClass}>
                Salary Max
              </label>
              <Input
                id="salaryMax"
                name="salaryMax"
                type="number"
                min={0}
                defaultValue={job.salaryMax}
                placeholder="60000"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="currency" className={labelClass}>
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                defaultValue={job.currency}
                className={selectClass}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="location" className={labelClass}>
                Location (City, Country)
              </label>
              <Input
                id="location"
                name="location"
                defaultValue={job.location}
                placeholder="e.g. Dhaka, Bangladesh — or leave empty for Remote type"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="deadline" className={labelClass}>
                Application Deadline
              </label>
              <Input
                id="deadline"
                name="deadline"
                type="date"
                defaultValue={job.deadline}
                required
              />
            </div>
          </div>
        </section>

        {/* Job Description */}
        <section className="space-y-4 rounded-xl border p-5">
          <h2 className="font-medium">Job Description</h2>

          <div className="space-y-1.5">
            <label htmlFor="responsibilities" className={labelClass}>
              Responsibilities
            </label>
            <textarea
              id="responsibilities"
              name="responsibilities"
              defaultValue={job.responsibilities}
              className={textareaClass}
              placeholder="One responsibility per line…"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="requirements" className={labelClass}>
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              defaultValue={job.requirements}
              className={textareaClass}
              placeholder="One requirement per line…"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="benefits" className={labelClass}>
              Benefits (optional)
            </label>
            <textarea
              id="benefits"
              name="benefits"
              defaultValue={job.benefits}
              className={textareaClass}
              placeholder="Health insurance, flexible hours…"
            />
          </div>
        </section>

        <div className="flex justify-end gap-2">
          <Link
            href="/dashboard/recruiter/jobs"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Cancel
          </Link>
          <Button type="submit" size="lg">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  )
}

export default EditJobPage

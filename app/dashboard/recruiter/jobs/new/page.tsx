"use client"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createJob } from "@/lib/actions/job"
import type { JobFormData } from "@/lib/types"

const initialJobForm: JobFormData = {
  title: "",
  category: "",
  type: "",
  salaryMin: "",
  salaryMax: "",
  currency: "USD",
  location: "",
  deadline: "",
  responsibilities: "",
  requirements: "",
  benefits: "",
  status: "active",
}

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

const NewJobPage = () => {
  const [formData, setFormData] = useState<JobFormData>(initialJobForm)

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // TODO: POST `formData` to the backend. The server attaches status: "active"
    // and the company from the logged-in recruiter's session.

    // console.log("New job:", formData)

    const result = await createJob(formData)
    // console.log(result, 'result is fine')
    if (result) {
      toast.success("Job posted successfully!")
    }

    setFormData(initialJobForm)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold">Post a Job</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below — your job goes live right after submitting.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                value={formData.title}
                onChange={handleChange}
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
                value={formData.type}
                onChange={handleChange}
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
              value={formData.category}
              onChange={handleChange}
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
                value={formData.salaryMin}
                onChange={handleChange}
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
                value={formData.salaryMax}
                onChange={handleChange}
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
                value={formData.currency}
                onChange={handleChange}
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

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label htmlFor="location" className={labelClass}>
                Location (City, Country)
              </label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
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
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="status" className={labelClass}>
                Job Status
              </label>

              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className={selectClass}
                required
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
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
              value={formData.responsibilities}
              onChange={handleChange}
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
              value={formData.requirements}
              onChange={handleChange}
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
              value={formData.benefits}
              onChange={handleChange}
              className={textareaClass}
              placeholder="Health insurance, flexible hours…"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" size="lg">
            Post Job
          </Button>
        </div>
      </form>
    </div>
  )
}

export default NewJobPage

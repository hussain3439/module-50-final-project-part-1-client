// Shared shape of the data collected by the Post a Job form (dashboard/recruiter/jobs/new).
// Flat state — every field is a plain string, so ONE generic handler covers all inputs.
export type JobFormData = {
  title: string
  category: string
  type: string
  salaryMin: string
  salaryMax: string
  currency: string
  location: string
  deadline: string
  responsibilities: string
  requirements: string
  benefits: string
  status: JobStatus;
}

export type JobStatus = "active" | "closed" | "draft"

// A stored job post = the form data + the fields the backend adds when saving.
export type JobPost = JobFormData & {
  _id: string
  status: JobStatus
  applicantsCount: number
  datePosted: string
}

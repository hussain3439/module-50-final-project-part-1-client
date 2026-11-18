import type { ApplicationCount, ApplicationFormData, ApplicationStatus, JobApplication } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL //http://localhost:5000

// Saves a new job application. Fired by the Apply Now button (JobApplyButton) —
// the seeker must be signed in first. The backend stores the payload and adds
// status ("applied") + dateApplied; it should answer with `insertedId`.
export const applyToJob = async (data: ApplicationFormData): Promise<{ insertedId: string }> => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

export const getApplication = async (query = ""): Promise<JobApplication[]> => {
  const res = await fetch(`${BASE_URL}/applications?${query}`)
  return res.json()
}
// application count related get api:count
export const getApplicationCount = async (query = ""): Promise<ApplicationCount> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)
  return res.json()
}

// Recruiter updates an applicant's status from the job applications page
// (dashboard/recruiter/jobs/[jobId]/applications). The backend needs a
// PATCH /applications/:id route that runs updateOne({ _id }, { $set: { status } }).
export const updateApplicationStatus = async (applicationId: string,status: ApplicationStatus): Promise<{ modifiedCount?: number }> => {
  const res = await fetch(`${BASE_URL}/applications/${applicationId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  })
  return res.json()
}

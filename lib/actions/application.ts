import type { ApplicationCount, ApplicationFormData, JobApplication } from "@/lib/types"

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

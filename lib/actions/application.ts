import type { ApplicationFormData } from "@/lib/types"

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL //http://localhost:5000

// Saves a new job application. Fired by the apply flow on the job details page —
// the seeker must be signed in, and jobId/jobTitle/company come from the job
// post being applied to.
export const createApplication = async (data: ApplicationFormData) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}

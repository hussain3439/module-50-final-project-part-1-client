import { getJobs } from "@/lib/api/jobs"
import { JobPost } from "@/lib/types"

const BrowsJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  console.log(search)
  const urlSearch = new URLSearchParams(search as Record<string, string>)
  const query = urlSearch.toString()

  console.log(query)

  const jobs: JobPost[] = await getJobs(query)
  return (
    <div>
      Brows jobs page
      <div>
        {jobs.map((job) => {
          return (
            <div key={job._id}>
              <h3>{job.title}</h3>
              <h3>{job.currency}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default BrowsJobsPage

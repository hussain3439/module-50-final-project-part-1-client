import { JobCard } from "@/components/jobs/job-card"
import { JobFilters } from "@/components/jobs/job-filters"
import { JobSearch } from "@/components/jobs/job-search"
import { SiteFooter } from "@/components/shared/site-footer"
import { SiteNavbar } from "@/components/shared/site-navbar"
import { getJobs } from "@/lib/api/jobs"
import type { JobPost } from "@/lib/types"

export const metadata = {
  title: "Browse Jobs",
}

const BrowseJobsPage = async ({searchParams}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams

  // Turn the URL params (?search=react&location=dhaka...) into "search=react&location=dhaka..."
  const query = new URLSearchParams(search as Record<string, string>).toString()

  // The API returns a plain list; fall back to [] on failures so the page
  // renders the empty state instead of crashing.
  const data = await getJobs(query)
  const jobs: JobPost[] = Array.isArray(data) ? data : []

  return (
    <>
      <SiteNavbar />

      <section className="bg-[#0a0a0a] py-12 text-white sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center">
            <p className="font-mono text-[11px] tracking-[0.35em] text-[#9d8bff] uppercase">
              <span aria-hidden>✦ </span>
              Browse Jobs
              <span aria-hidden> ✦</span>
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[40px]">
              Find your next opportunity
            </h1>
          </div>

          {/* Search bar */}
          <div className="mt-8">
            <JobSearch />
          </div>

          {/* Filters on the left, results on the right */}
          <div className="mt-10 grid items-start gap-6 lg:grid-cols-[280px_1fr]">
            <JobFilters />

            <div>
              <p className="text-sm text-neutral-400">
                {jobs.length} jobs found
              </p>

              {jobs.length === 0 ? (
                <div className="mt-4 rounded-xl border border-dashed border-white/15 px-6 py-16 text-center">
                  <p className="text-sm text-neutral-400">
                    No jobs found — check back soon or adjust your filters.
                  </p>
                </div>
              ) : (
                <div className="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </>
  )
}

export default BrowseJobsPage

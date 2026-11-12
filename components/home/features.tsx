import {
  BookmarkIcon,
  Building2Icon,
  ChartColumnIcon,
  FileTextIcon,
  SearchIcon,
  TrendingUpIcon,
  WandSparklesIcon,
  WaypointsIcon,
} from "lucide-react"

const features = [
  {
    icon: SearchIcon,
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
  },
  {
    icon: ChartColumnIcon,
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
  },
  {
    icon: Building2Icon,
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
  },
  {
    icon: BookmarkIcon,
    title: "Saved Jobs",
    description: "Manage jobs & favorites on your dashboard.",
  },
  {
    icon: WandSparklesIcon,
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process.",
  },
  {
    icon: FileTextIcon,
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
  },
  {
    icon: WaypointsIcon,
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
  },
  {
    icon: TrendingUpIcon,
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
  },
]

export function Features() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white sm:py-20 lg:py-24">
      {/* Decorative vertical dashed line through the center */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 w-px "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Dashed frame around badge + heading */}
        <div className="mx-auto w-fit border border-dashed border-white/20 px-8 py-7 text-center sm:px-16">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[#9d8bff] uppercase">
            <span aria-hidden>✦ </span>
            Features Job
            <span aria-hidden> ✦</span>
          </p>
          <h2 className="mt-4 max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-tight">
            Everything you need to succeed
          </h2>
        </div>

        {/* Feature grid with blueprint dashed guides */}
        <div className="relative mt-12 sm:mt-16">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 border-t border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-px border-l border-dashed border-white/15"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-px border-l border-dashed border-white/15"
          />

          <div className="grid grid-cols-1 gap-x-10 gap-y-10 px-2 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="flex items-start gap-4">
                <div className="grid size-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#151515]">
                  <feature.icon
                    className="size-5 text-[#9d8bff]"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-medium">{feature.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Shared option lists. The job forms (dashboard/recruiter/jobs/new + edit-job)
// and the Browse Jobs filters must offer the same values, so they live here.

export const JOB_CATEGORIES = [
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

export const JOB_TYPES = [
  "Full-time",
  "Part-time",
  "Remote",
  "Contract",
  "Internship",
]

export const JOB_CURRENCIES = ["USD", "BDT", "EUR", "GBP", "INR"]

// Subscription plans (prices in USD per month) — used by the payment page.
export type Plan = {
  id: string
  name: string
  price: number
  role: "seeker" | "recruiter"
  features: string[]
}

export const PLANS: Plan[] = [
  // For Job Seekers
  {
    id: "free",
    name: "Free",
    price: 0,
    role: "seeker",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile",
      "Email alerts",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    role: "seeker",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking",
      "Salary insights",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 39,
    role: "seeker",
    features: [
      "Everything in Pro",
      "Unlimited applications",
      "Profile boost to recruiters",
      "Early access to new jobs",
      "Priority support",
    ],
  },
  // For Recruiters
  {
    id: "growth",
    name: "Growth",
    price: 49,
    role: "recruiter",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking",
      "Basic analytics",
      "Email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 149,
    role: "recruiter",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
]

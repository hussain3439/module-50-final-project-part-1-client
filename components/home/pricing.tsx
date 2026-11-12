import Link from "next/link"
import {
  ArrowRightIcon,
  ChartColumnIcon,
  CrownIcon,
  PlusIcon,
  ZapIcon,
} from "lucide-react"

import { cn } from "cn"

const plans = [
  {
    id: "starter",
    icon: CrownIcon,
    name: "Starter",
    price: "$0",
    highlight: false,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "growth",
    icon: ChartColumnIcon,
    name: "Growth",
    price: "$17",
    highlight: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "premium",
    icon: ZapIcon,
    name: "Premium",
    price: "$99",
    highlight: false,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

export function Pricing() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-16 text-white sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Badge + heading */}
        <div className="text-center">
          <p className="font-mono text-[11px] tracking-[0.35em] text-[#9d8bff] uppercase">
            <span aria-hidden>✦ </span>
            Pricing
            <span aria-hidden> ✦</span>
          </p>
          <h2 className="mx-auto mt-4 max-w-md text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[40px] lg:leading-tight">
            <span className="block">Pay for the leverage,</span>
            <span className="block">not the listings</span>
          </h2>
        </div>

        {/* Static billing toggle (Monthly active) */}
        <div className="mt-9 flex justify-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-[#141414] p-1">
            <span className="rounded-full bg-white px-4 py-1.5 text-xs font-medium text-neutral-900">
              Monthly
            </span>
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs text-neutral-400">
              Yearly
              <span className="rounded-full bg-[#ec4899] px-1.5 py-0.5 text-[9px] font-semibold text-white">
                20%
              </span>
            </span>
          </div>
        </div>

        {/* Plan cards */}
        <div className="mt-10 grid items-center gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className={cn(
                "flex flex-col rounded-2xl border p-5 sm:p-6",
                plan.highlight
                  ? "border-white/20 bg-[#181818] shadow-[0_0_40px_rgba(255,255,255,0.07)] lg:py-8"
                  : "border-white/10 bg-[#141414]"
              )}
            >
              <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-[#101010]">
                    <plan.icon
                      className="size-4 text-[#9d8bff]"
                      strokeWidth={1.75}
                    />
                  </span>
                  <h3 className="text-base font-medium">{plan.name}</h3>
                </div>
                <p className="flex items-baseline gap-0.5">
                  <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {plan.price}
                  </span>
                  <span className="text-[10px] text-neutral-500">/month</span>
                </p>
              </div>

              <p className="mt-5 text-xs text-neutral-200">
                Start building your insights hub:
              </p>
              <ul className="mt-3.5 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-xs text-neutral-400"
                  >
                    <PlusIcon
                      className="mt-0.5 size-3.5 shrink-0 text-neutral-500"
                      strokeWidth={2}
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Link
                  href="/sign-up"
                  className={cn(
                    "flex h-10 items-center justify-between rounded-lg px-4 text-sm font-medium transition-colors",
                    plan.highlight
                      ? "bg-white text-neutral-900 hover:bg-neutral-200"
                      : "border border-white/10 bg-[#1f1f1f] text-white hover:bg-white/10"
                  )}
                >
                  Choose This Plan
                  <ArrowRightIcon className="size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

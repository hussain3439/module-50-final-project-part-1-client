"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { Check, CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/lib/constants"

const roleLabel = {
  seeker: "For Job Seekers",
  recruiter: "For Recruiters",
}

// Section heading style shared by both cards
const sectionTitle =
  "text-muted-foreground text-xs font-medium uppercase tracking-wide"

const PaymentContent = () => {
  const searchParams = useSearchParams()

  // /payment?plan=pro — falls back to Pro when no plan is in the URL
  const planId = searchParams.get("plan")
  const plan = PLANS.find((p) => p.id === planId) ?? PLANS.find((p) => p.id === "pro")!
  const isFree = plan.price === 0

  const handlePay = () => {
    // TODO: Stripe Checkout —
    // 1. POST the plan id to the backend (e.g. /api/checkout)
    // 2. The backend creates a Stripe Checkout Session and returns its url
    // 3. window.location.assign(sessionUrl) sends the user to Stripe's page
    toast.success("Redirecting to Stripe Checkout… (coming soon)")
  }

  return (
    // `dark` class forces this checkout page to always render in dark mode,
    // independent of the theme toggle — all tokens below flip to the dark palette.
    <main className="dark relative min-h-dvh overflow-hidden bg-background">
      {/* Ambient glow — purely decorative */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="bg-emerald-500/10 absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-sky-500/10 absolute right-[-10rem] bottom-[-10rem] size-[28rem] rounded-full blur-3xl" />
      </div>

      {/* Top bar */}
      <header className="relative border-b">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3.5 sm:px-6">
          <span className="text-lg font-semibold tracking-tight text-gray-200">
            Hire<span className="text-emerald-500">Loop</span>
          </span>
          <span className="text-muted-foreground flex items-center gap-1.5 text-xs">
            <ShieldCheck className="size-3.5 text-emerald-500" />
            Secured by Stripe
          </span>
        </div>
      </header>

      <div className="relative mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="mb-8 text-center">
          <h1 className="text-2xl text-gray-200 font-semibold tracking-tight">
            Complete your payment
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            You&apos;re one step away from the {plan.name} plan.
          </p>
        </div>

        {/* Summary (left) + payment (right) on desktop, stacked on mobile */}
        <div className="grid gap-4 lg:grid-cols-5 lg:gap-6">
          {/* Order summary */}
          <section className="bg-card rounded-2xl border p-6 shadow-sm lg:col-span-3">
            <span className={sectionTitle}>Order summary</span>

            <div className="mt-3 flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-semibold text-gray-300">{plan.name} plan</h2>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-500">
                    {roleLabel[plan.role]}
                  </span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">
                  Billed monthly · cancel anytime
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl text-gray-200 font-semibold tracking-tight">
                  ${plan.price}
                </div>
                <div className="text-muted-foreground text-xs text-gray-300">per month</div>
              </div>
            </div>

            <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <span className="bg-emerald-500/10 mt-0.5 rounded-full p-1">
                    <Check className="size-3 text-emerald-500" />
                  </span>
                  <span className="text-foreground/90">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between border-t pt-4">
              <span className="text-sm font-medium text-gray-300">Due today</span>
              <span className="text-xl font-semibold text-gray-300">
                ${plan.price.toFixed(2)}
              </span>
            </div>
          </section>

          {/* Payment */}
          <section className="bg-card h-fit rounded-2xl border p-6 shadow-sm lg:col-span-2">
            <span className={sectionTitle}>Payment</span>

            <div className="bg-muted/40 mt-4 rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary rounded-lg p-2">
                  <CreditCard className="size-5" />
                </span>
                <div>
                  <p className="text-sm text-gray-200 font-medium">Card payment</p>
                  <p className="text-muted-foreground text-xs">
                    via Stripe Checkout
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-3 text-xs leading-relaxed">
                You&apos;ll be redirected to Stripe&apos;s secure page to enter
                your card details. We never see your card info.
              </p>
            </div>

            {/* Pay button — redirects to Stripe Checkout later */}
            {isFree ? (
              <p className="text-muted-foreground mt-5 rounded-xl bg-muted p-4 text-center text-sm">
                The {plan.name} plan is free — no payment needed.
              </p>
            ) : (
              <Button
                size="lg"
                className="mt-5 h-11 w-full text-base"
                onClick={handlePay}
              >
                Pay ${plan.price.toFixed(2)}
              </Button>
            )}

            <p className="text-muted-foreground mt-4 flex items-center justify-center gap-1.5 text-xs">
              <ShieldCheck className="size-3.5 text-emerald-500" />
              14-day money-back guarantee
            </p>
          </section>
        </div>
      </div>
    </main>
  )
}

// Suspense boundary required by Next.js — useSearchParams needs it during prerender
const PaymentPage = () => (
  <Suspense
    fallback={
      <div className="dark bg-background flex min-h-dvh items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading payment…</p>
      </div>
    }
  >
    <PaymentContent />
  </Suspense>
)

export default PaymentPage

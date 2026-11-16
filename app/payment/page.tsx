import { Check, CreditCard, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

const roleLabel = {
  seeker: "Job Seeker",
  recruiter: "Recruiter",
  amount: "$20.00",
}

type PaymentPageProps = {
  searchParams: Promise<{
    plan?: string
    canceled?: string
  }>
}

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you're ready."
    )
  }

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-4xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">
            Complete Your Payment
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Review your plan details before proceeding.
          </p>
        </div>

        {/* Payment Card */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Plan Summary */}
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Plan Summary</h2>

            <div className="mt-5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold"> Plan</h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  {/* {roleLabel[plan.role]} */}
                </p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold">{roleLabel.amount}</p>
                <p className="text-xs text-muted-foreground">/ month</p>
              </div>
            </div>

            {/* Features */}
            <div className="mt-6 border-t pt-5">
              <h3 className="mb-4 font-medium">Whats included?</h3>

              <ul className="space-y-3">
                {/* {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="size-4 text-emerald-500" />
                    {feature}
                  </li>
                ))} */}
              </ul>
            </div>

            {/* Total */}
            <div className="mt-6 flex justify-between border-t pt-5">
              <span className="font-semibold">Total Amount</span>

              <span className="text-xl font-bold">${roleLabel.amount}</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="h-fit rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Payment Method</h2>

            <div className="mt-5 rounded-lg border p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="size-6 text-emerald-500" />

                <div>
                  <p className="font-medium">Credit / Debit Card</p>
                  <p className="text-xs text-muted-foreground">
                    Secure payment via Stripe
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}

            <div className="mt-6 rounded-lg bg-muted p-4 text-center">
              <p className="text-sm font-medium">
                This plan is completely free!
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                No payment is required.
              </p>
            </div>
            <form action="/api/checkout_sessions" method="POST">
              <section>
                <button
                  type="submit"
                  role="link"
                  className="h-[60px] w-full rounded-lg bg-[#0070E0] text-lg font-bold text-white shadow-[0_4px_6px_-4px_rgba(94,158,246,0.3),0_10px_15px_-3px_rgba(94,158,246,0.3)] transition-colors hover:bg-[#3F90E5]"
                >
                  Payment {roleLabel.amount}
                </button>
              </section>
            </form>

            {/* Security Info */}
            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-emerald-500" />
              Secure payment protected by Stripe
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PaymentPage

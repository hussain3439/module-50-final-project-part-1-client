import Link from "next/link"
import { redirect } from "next/navigation"
import type { ReactNode } from "react"
import {
  AlertTriangleIcon,
  ArrowRightIcon,
  BadgeCheckIcon,
  CheckIcon,
  CreditCardIcon,
} from "lucide-react"

import { CopyButton } from "../_components/CopyButton"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "cn"
import { paymentVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"

export const metadata = {
  title: "Payment Successful",
}

// One "label — value" line inside the receipt card.
const InfoRow = ({ label, value }: { label: string; value: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 border-b border-dashed pb-3 last:border-b-0 last:pb-0">
    <span className="shrink-0 text-muted-foreground">{label}</span>
    <span className="min-w-0 text-right font-medium">{value}</span>
  </div>
)

const PaidBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
    <CheckIcon className="size-3" />
    Paid
  </span>
)

// Checkout exists but Stripe never confirmed a payment (abandoned or expired
// session) — shown instead of an empty page.
const PaymentIssue = () => (
  <main className="min-h-screen bg-muted/30 px-4 py-12">
    <div className="mx-auto max-w-lg rounded-2xl border bg-card p-8 text-center shadow-sm">
      <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-amber-500/10 ring-8 ring-amber-500/5">
        <AlertTriangleIcon className="size-8 text-amber-500" />
      </div>

      <h1 className="mt-5 text-2xl font-bold tracking-tight">
        Payment not completed
      </h1>

      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        We couldn&apos;t confirm your payment. If you believe you were charged,
        contact support before trying again.
      </p>

      <Link
        href="/payment"
        className={cn(buttonVariants({ size: "lg" }), "mt-6")}
      >
        Back to Payment
      </Link>
    </div>
  </main>
)

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>
}

const SuccessPage = async ({ searchParams }: SuccessPageProps) => {
  const { session_id } = await searchParams

  // Landed here without a checkout session — nothing to confirm.
  if (!session_id) {
    return redirect("/")
  }

  const {
    amount_total,
    created,
    currency,
    customer_email,
    line_items,
    payment_intent,
    payment_status,
    status,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  // Session still open = checkout was never finished.
  if (status === "open") {
    return redirect("/")
  }

  if (status !== "complete" || payment_status !== "paid") {
    return <PaymentIssue />
  }

  // Register the payment in the backend so the plan gets activated.
  await paymentVerify(session_id)

  // With the expand above, `payment_intent` is the full PaymentIntent object
  // (not just an id string). Its `id` (pi_…) is the transaction id.
  const intent =
    payment_intent && typeof payment_intent === "object" ? payment_intent : null
  const transactionId = intent?.id ?? "Not available"

  // Stripe amounts are integers in the smallest currency unit (cents).
  const amount = amount_total === null ? null : (amount_total / 100).toFixed(2)
  const currencyCode = currency?.toUpperCase() ?? "USD"
  const formattedAmount =
    amount === null
      ? "—"
      : currencyCode === "USD"
        ? `$${amount}`
        : `${amount} ${currencyCode}`

  const planName = line_items?.data[0]?.description ?? "HireLoop subscription"

  const paidAt = new Date(created * 1000).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  })

  return (
    <main className="min-h-screen bg-muted/30 px-4 py-12">
      <div className="mx-auto max-w-lg">
        {/* Success banner */}
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/5">
            <BadgeCheckIcon className="size-9 text-emerald-500" />
          </div>

          <h1 className="mt-5 text-2xl font-bold tracking-tight">
            Payment Successful!
          </h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Your subscription is now active. A confirmation email has been sent
            to{" "}
            <span className="font-medium text-foreground">
              {customer_email ?? "your email"}
            </span>
            .
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
            <CheckIcon className="size-3.5" />
            Payment completed
          </span>
        </div>

        {/* Receipt */}
        <div className="mt-6 overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b bg-muted/40 px-6 py-4">
            <CreditCardIcon className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Payment Receipt</h2>
          </div>

          <div className="space-y-5 p-6">
            {/* Transaction ID = payment_intent.id — prominent + one-click copy */}
            <div className="rounded-xl border border-dashed bg-muted/30 p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Transaction ID
              </p>
              <div className="mt-2 flex items-center justify-between gap-3">
                <code className="min-w-0 truncate font-mono text-sm font-medium tracking-tight">
                  {transactionId}
                </code>
                <CopyButton value={transactionId} />
              </div>
            </div>

            <div className="space-y-3">
              <InfoRow label="Plan" value={planName} />
              <InfoRow label="Amount" value={formattedAmount} />
              <InfoRow label="Status" value={<PaidBadge />} />
              <InfoRow label="Billed to" value={customer_email ?? "—"} />
              <InfoRow label="Date" value={paidAt} />
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <Link
            href="/brows-jobs"
            className={cn(buttonVariants({ size: "lg" }), "flex-1")}
          >
            Browse Jobs
            <ArrowRightIcon />
          </Link>
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "flex-1"
            )}
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Questions about this payment?{" "}
          <a
            href="mailto:orders@example.com"
            className="font-medium underline underline-offset-2"
          >
            orders@example.com
          </a>
        </p>
      </div>
    </main>
  )
}

export default SuccessPage

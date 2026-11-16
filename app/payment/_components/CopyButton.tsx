"use client"
import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"

// Copies the transaction ID to the clipboard. Needs to be a client component —
// the success page itself stays a server component.
export function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context) — nothing to do.
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy transaction ID"}
      className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {copied ? (
        <CheckIcon className="size-4 text-emerald-500" />
      ) : (
        <CopyIcon className="size-4" />
      )}
    </button>
  )
}

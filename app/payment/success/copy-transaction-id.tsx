"use client"

import { useEffect, useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

const CopyTransactionId = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const timeout = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
    } catch {
      // Clipboard not available — silently ignore
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleCopy}
      aria-label="Copy transaction ID"
    >
      {copied ? (
        <Check className="text-emerald-500" />
      ) : (
        <Copy />
      )}
      {copied ? "Copied!" : "Copy"}
    </Button>
  )
}

export default CopyTransactionId

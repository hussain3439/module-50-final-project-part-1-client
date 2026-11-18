
"use client"

import { useState } from "react"
import { toast } from "sonner"
import { updateApplicationStatus } from "@/lib/actions/application"
import type { ApplicationStatus } from "@/lib/types"

const statusOptions: ApplicationStatus[] = [
  "applied",
  "under review",
  "shortlisted",
  "offered",
  "rejected",
]

const statusBadge: Record<ApplicationStatus, string> = {
  applied: "bg-white/10 text-neutral-500",
  "under review": "bg-amber-500/10 text-amber-600",
  shortlisted: "bg-sky-500/10 text-sky-600",
  rejected: "bg-red-500/10 text-red-600",
  offered: "bg-emerald-500/10 text-emerald-600",
}

type Props = {
  applicationId: string
  status: ApplicationStatus
}

const StatusUpdateSelect = ({ applicationId, status }: Props) => {
  const [value, setValue] = useState(status)

  const handleChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newStatus = e.target.value as ApplicationStatus
    const previousStatus = value

    setValue(newStatus)

    try {
      await updateApplicationStatus(applicationId, newStatus)
      toast.success("Status updated successfully!")
    } catch {
      setValue(previousStatus)
      toast.error("Failed to update status!")
    }
  }

  return (
    <div className="flex items-center gap-3">
      {/* Status Badge */}
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${statusBadge[value]}`}
      >
        {value}
      </span>

      {/* Update Dropdown */}
      <select
        value={value}
        onChange={handleChange}
        className="h-9 rounded-lg border bg-background px-3 text-sm capitalize"
      >
        {statusOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export { StatusUpdateSelect }

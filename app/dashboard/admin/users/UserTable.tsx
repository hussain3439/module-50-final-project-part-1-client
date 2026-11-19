"use client"

import { useEffect } from "react"
import { useState } from "react"
import { cn } from "cn"
import { ChevronDown } from "lucide-react"
import { toast } from "sonner"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { updateUserRole } from "@/lib/api/updateUser"

type UserRole = "seeker" | "recruiter" | "admin"
type UserStatus = "active" | "suspended"

interface AdminUserRow {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  joined: Date | string
}

interface UserTableProps {
  users: AdminUserRow[]
}

const ROLE_BADGE: Record<UserRole, string> = {
  seeker: "bg-slate-500/20 text-slate-400 border-slate-500/50",
  recruiter: "bg-blue-500/20 text-blue-400 border-blue-500/50",
  admin: "bg-amber-500/20 text-amber-400 border-amber-500/50",
}

const ROLE_LABEL: Record<UserRole, string> = {
  seeker: "Seeker",
  recruiter: "Recruiter",
  admin: "Admin",
}

const ROLE_OPTIONS: Record<UserRole, UserRole[]> = {
  seeker: ["recruiter", "admin"],
  recruiter: ["seeker", "admin"],
  admin: ["seeker", "recruiter"],
}

const formatJoinDate = (date: Date | string) => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  })
}

export function UserTable({ users }: UserTableProps) {
  const [localUsers, setLocalUsers] = useState(users)
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  // Keep local data in sync with updated props
  useEffect(() => {
    setLocalUsers(users)
  }, [users])

  // Change User Role
  const handleRoleChange = async (userId: string, nextRole: UserRole) => {
    setUpdatingId(userId)

    try {
      const result = await updateUserRole(userId, nextRole)

      if (result.matchedCount === 0) {
        toast.error("User not found!")
        return
      }

      if (result.modifiedCount === 0) {
        toast.info("User already has this role!")
        return
      }

      // Update frontend immediately after API success
      setLocalUsers((previousUsers) =>
        previousUsers.map((user) =>
          user.id === userId ? { ...user, role: nextRole } : user
        )
      )

      toast.success(`Role changed to ${ROLE_LABEL[nextRole]}`)
    } catch (error) {
      console.error("Role update error:", error)
      toast.error("Failed to update user role!")
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <>
      {localUsers.map((user) => {
        const isUpdating = updatingId === user.id
        const roleOptions = ROLE_OPTIONS[user.role]

        return (
          <tr
            key={user.id}
            className="border-b border-foreground/5 transition-colors last:border-b-0 hover:bg-muted/40"
          >
            {/* User Name + Avatar */}
            <td className="px-4 py-3">
              <div className="flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>
                    {user.name.slice(0, 1).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <span className="font-medium whitespace-nowrap text-foreground">
                  {user.name}
                </span>
              </div>
            </td>

            {/* Email */}
            <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
              {user.email}
            </td>

            {/* Role Badge */}
            <td className="px-4 py-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
                  ROLE_BADGE[user.role]
                )}
              >
                <span className="size-1.5 rounded-full bg-current" />
                {ROLE_LABEL[user.role]}
              </span>
            </td>

            {/* Join Date */}
            <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
              {formatJoinDate(user.joined)}
            </td>

            {/* Status */}
            <td className="px-4 py-3">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-medium text-emerald-400">
                <span className="size-1.5 rounded-full bg-current" />
                {user.status === "active" ? "Active" : "Suspended"}
              </span>
            </td>

            {/* Role Action Dropdown */}
            <td className="px-4 py-3 text-right">
             
<DropdownMenu>
  <DropdownMenuTrigger
    disabled={isUpdating}
    className="inline-flex min-w-[125px] items-center justify-between gap-2 rounded-md bg-muted/70 px-3 py-2 text-xs font-medium text-foreground hover:bg-muted disabled:opacity-50"
  >
    {isUpdating
      ? "Updating..."
      : `Make ${ROLE_LABEL[user.role]}`}

    <ChevronDown className="size-3.5" />
  </DropdownMenuTrigger>

  <DropdownMenuContent
    align="end"
    side="bottom"
    sideOffset={6}
    className="z-50 min-w-[140px]"
  >
    {roleOptions.map((role) => (
      <DropdownMenuItem
        key={role}
        onClick={() => handleRoleChange(user.id, role)}
        disabled={isUpdating}
        className="cursor-pointer"
      >
        Make {ROLE_LABEL[role]}
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
</DropdownMenu>

            </td>
          </tr>
        )
      })}
    </>
  )
}

import { getAdminUsers } from "@/lib/api/userAdmin"
import { UserTable } from "./UserTable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type RoleStat = {
  title: string
  value: number
  subtitle: string
  color: string
}

const ROLE_STATS: RoleStat[] = [
  {
    title: "Total Active Users",
    value: 12_842,
    subtitle: "+12% vs last month",
    color: "text-emerald-400",
  },
  {
    title: "Recruiter Growth",
    value: 843,
    subtitle: "High demand",
    color: "text-blue-400",
  },
  {
    title: "Suspended Accounts",
    value: 124,
    subtitle: "0.8% of total",
    color: "text-red-400",
  },
  {
    title: "New Signups (24h)",
    value: 42,
    subtitle: "Steady activity",
    color: "text-amber-400",
  },
]

type RawUser = {
  id: string
  name: string | null
  email: string
  image: string | null
  createdAt: Date | string
  role?: string
  additionalFields?: {
    role?: string
  }
}

type UserRole = "seeker" | "recruiter" | "admin"
type UserStatus = "active" | "suspended"

interface AdminUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  status: UserStatus
  joined: Date | string
}

export default async function AdminUsersPage() {
  // better-auth's listUsers returns { users, total }.
  const { users: rawUsers } = (await getAdminUsers()) as {
    users: RawUser[]
    total: number
  }

  // Normalise into the shape the table expects.
  const users: AdminUser[] = rawUsers.map((user) => ({
    id: user.id,
    name: user.name ?? "Unknown User",
    email: user.email,
    avatar: user.image ?? undefined,
    role: (user.role ?? user.additionalFields?.role ?? "seeker") as UserRole,
    status: "active",
    joined: user.createdAt,
  }))

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs tracking-wider text-muted-foreground uppercase">
            Dashboard / Admin / Users
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight">
            User Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-input bg-input/30 px-3 py-1.5 text-sm">
            <span className="text-muted-foreground">All Roles</span>
            <svg
              className="size-4 text-muted-foreground"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>
          <button className="flex items-center gap-2 rounded-lg border border-input bg-input/30 px-3 py-1.5 text-sm text-foreground transition-colors hover:bg-input/50">
            <svg
              className="size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export List
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ROLE_STATS.map((stat) => (
          <Card key={stat.title} className="border border-foreground/10">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">{stat.value}</span>
                <span className="{stat.color} text-xs">{stat.subtitle}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Users table */}
      <Card className="border border-foreground/10">
        <div className="overflow-x-auto">
          <table className="w-full caption-top text-sm">
            <thead>
              <tr className="border-b border-foreground/10 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  User Name
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Email Address
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Join Date
                </th>
                <th className="px-4 py-3 font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <UserTable users={users} />
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-sm text-muted-foreground">No users found.</p>
          </div>
        )}
      </Card>
    </div>
  )
}

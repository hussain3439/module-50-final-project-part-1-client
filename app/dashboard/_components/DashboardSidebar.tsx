"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"
import type { LucideIcon } from "lucide-react"
import {
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  FileText,
  LayoutDashboard,
  Search,
  Settings,
  SquarePlus,
  Users,
  Wallet,
} from "lucide-react"
import Link from "next/link"

export type Role = "seeker" | "recruiter" | "admin"

export type MenuItem = {
  id: string
  name: string
  url: string
  icon: LucideIcon
}

const menuItemsByRole: Record<Role, MenuItem[]> = {
  seeker: [
    {
      id: "seeker-dashboard",
      name: "Dashboard",
      url: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      id: "seeker-browse-jobs",
      name: "Browse & Apply",
      url: "/dashboard/seeker/jobs",
      icon: Search,
    },
    {
      id: "seeker-saved-jobs",
      name: "Saved Jobs",
      url: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      id: "seeker-applications",
      name: "My Applications",
      url: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      id: "seeker-billing",
      name: "Subscription & Billing",
      url: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      id: "seeker-settings",
      name: "Settings",
      url: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      id: "recruiter-dashboard",
      name: "Dashboard",
      url: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      id: "recruiter-company",
      name: "My Company",
      url: "/dashboard/recruiter/company",
      icon: Building,
    },
    {
      id: "recruiter-manage-jobs",
      name: "Manage Jobs",
      url: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      id: "recruiter-add-job",
      name: "Add Job",
      url: "/dashboard/recruiter/jobs/new",
      icon: SquarePlus,
    },
    {
      id: "recruiter-application",
      name: "Application",
      url: "/dashboard/recruiter/application",
      icon: CreditCard,
    },
    {
      id: "recruiter-settings",
      name: "Settings",
      url: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      id: "admin-dashboard",
      name: "Dashboard",
      url: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      id: "admin-users",
      name: "Users",
      url: "/dashboard/admin/users",
      icon: Users,
    },
    {
      id: "admin-companies",
      name: "Companies",
      url: "/dashboard/admin/companies",
      icon: Building,
    },
    {
      id: "admin-jobs",
      name: "Jobs",
      url: "/dashboard/admin/jobs",
      icon: Briefcase,
    },
    {
      id: "admin-payments",
      name: "Payments & Subscriptions",
      url: "/dashboard/admin/payments",
      icon: Wallet,
    },
    {
      id: "admin-settings",
      name: "Settings",
      url: "/dashboard/admin/settings",
      icon: Settings,
    },
  ],
}

export function DashboardSidebar() {
  const { data: session, isPending } = useSession()
  const role = (session?.user?.role || "seeker") as Role
  const menuItems = menuItemsByRole[role]

  return (
    <div className="">
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
          <SidebarGroup>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton render={<Link href={item.url} />}>
                    <item.icon />
                    <span>{item.name}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Link href={"/"}>Home</Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    </div>
  )
}

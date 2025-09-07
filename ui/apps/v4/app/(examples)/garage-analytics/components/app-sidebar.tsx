"use client"

import * as React from "react"
import {
  BarChart3,
  Building2,
  CircleDollarSign,
  PieChart,
  Settings,
  TrendingUp,
} from "lucide-react"

import { NavMain } from "@/app/(examples)/garage-analytics/components/nav-main"
import { NavUser } from "@/app/(examples)/garage-analytics/components/nav-user"
import { TeamSwitcher } from "@/app/(examples)/garage-analytics/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/registry/new-york-v4/ui/sidebar"

const data = {
  user: {
    name: "Garage Analytics",
    email: "analytics@garage.bako.global",
    avatar: "/avatars/garage-logo.jpg",
  },
  teams: [
    {
      name: "Garage Analytics",
      logo: Building2,
      plan: "NFT Marketplace",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: BarChart3,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Collections",
          url: "#",
        },
        {
          title: "Market Analysis",
          url: "#",
        },
        {
          title: "Trends",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: TrendingUp,
      items: [
        {
          title: "Volume Tracking",
          url: "#",
        },
        {
          title: "Floor Price Monitor",
          url: "#",
        },
        {
          title: "Sales Analytics",
          url: "#",
        },
        {
          title: "Collection Rankings",
          url: "#",
        },
      ],
    },
    {
      title: "Financial",
      url: "#",
      icon: CircleDollarSign,
      items: [
        {
          title: "Revenue Reports",
          url: "#",
        },
        {
          title: "Fee Analysis",
          url: "#",
        },
        {
          title: "Profit & Loss",
          url: "#",
        },
        {
          title: "Token Metrics",
          url: "#",
        },
      ],
    },
    {
      title: "Reports",
      url: "#",
      icon: PieChart,
      items: [
        {
          title: "Daily Reports",
          url: "#",
        },
        {
          title: "Weekly Summaries",
          url: "#",
        },
        {
          title: "Monthly Analysis",
          url: "#",
        },
        {
          title: "Custom Reports",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      items: [
        {
          title: "API Configuration",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Data Sources",
          url: "#",
        },
        {
          title: "Export Settings",
          url: "#",
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
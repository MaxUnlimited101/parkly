import * as React from "react"
import { Link } from "react-router"
import {
  LifeBuoy,
  UsersRound,
  BookCopy,
  CircleParking,
  LandPlot
} from "lucide-react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useSelector } from "react-redux"
import { RootState } from "@/store"


const data = {
  navMain: [
    {
      title: "Users",
      url: "/dashboard/users",
      icon: UsersRound,
      isActive: true,
    },
    {
      title: "Reservations",
      url: "/dashboard/reservations",
      icon: BookCopy,
      isActive: true,
    },
    {
      title: "Parking Spots",
      url: "/dashboard/parking-spots",
      icon: CircleParking,
      isActive: true,
    },
    {
      title: "Parking Area",
      url: "/dashboard/parking-areas",
      icon: LandPlot,
      isActive: true,
    }
  ],
  navSecondary: [
    {
      title: "Support",
      url: "mailto:support@parkly.com",
      icon: LifeBuoy,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Sidebar
      className="top-[--header-height] !h-[calc(100svh-var(--header-height))]"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="#">
                <div className="">
                  <img src="/parkly.png" className="size-8" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Parkly 2025</span>
                  <span className="truncate text-xs">Enterprise LLC Corp</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} /> }
      </SidebarFooter>
    </Sidebar>
  )
}

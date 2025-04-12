"use client";

import * as React from "react";
import {
  AudioWaveform,
  Blocks,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  LayoutDashboardIcon,
  Map,
  PieChart,
  Settings2,
  User,
  Landmark,
  Camera,
  Contact
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";


import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./navMain";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "District",
      url: "#",
      icon: Landmark,
      isActive: false,
      items: [
        {
          title: "Create",
          url: "/district/create",
        },
        {
          title: "Alter",
          url: "/district/alter",
        },
      ],
    },
    {
      title: "Supervisor",
      url: "#",
      icon: Contact,
      isActive: false,
      items: [
        {
          title: "Create",
          url: "/supervisor/create",
        },
        {
          title: "Alter",
          url: "/supervisor/alter",
        },
      ],
    },
    {
      title: "Farmers",
      url: "#",
      icon: Contact,
      isActive: false,
      items: [
        {
          title: "Create",
          url: "/farmer/create",
        },
        {
          title: "Alter",
          url: "/farmer/alter",
        },
      ],
    },
    
  ],
  
};


export function AppSidebar({ ...props }) {
  

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className={"h-16"}>
        {/* <WorkspaceSwitcher teams={data.teams} /> */}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <LayoutDashboardIcon />
                <Link href={"/dashboard"}>Dashboard</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <NavMain items={data.navMain} />
          {/* <NavProjects projects={data.projects} /> */}
        </SidebarGroup>
      </SidebarContent>
      <div className="flex justify-end">
            <Button onClick={() => signOut()}>Sign out</Button>
          </div>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
      
    </Sidebar>
  );
}
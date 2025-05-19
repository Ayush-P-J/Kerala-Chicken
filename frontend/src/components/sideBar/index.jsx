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
  Contact,
  LogOutIcon,
} from "lucide-react";
import Link from "next/link";
import logo from "../../../public/chick_go.jpg";

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
import { NavUser } from "./NavUser";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { DropdownMenuItem } from "../ui/dropdown-menu";

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
    {
      title: "Credentials",
      url: "#",
      icon: Contact,
      isActive: false,
      items: [
        {
          title: "Create",
          url: "/credentials/create",
        },
        {
          title: "Alter",
          url: "/credentials/alter",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader
        className={"h-16 border-b flex justify-center items-center"}
      >
        <Link href={"/dashboard"}>
          <div className="flex justify-center ">
            <Image
              className="dark:invert object-cover"
              src="/chick go(2).png"
              alt="Chick Go"
              width={115}
              height={115}
            />
          </div>
        </Link>

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
        <Button
          variant="ghost"
          className="w-40 gap-2 px-4 py-2 text-sm bg-destructive hover:bg-destructive/80 border text-white hover:text-white justify-center mx-auto cursor-pointer"
          onClick={() =>
            signOut({
              callbackUrl: "/", // redirect to home after logout
            })
          }
        >
          <LogOutIcon className="h-4 w-4" />
          Sign out
        </Button>
      </div>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

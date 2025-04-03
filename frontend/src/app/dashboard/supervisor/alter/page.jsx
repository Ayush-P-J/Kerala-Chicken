"use client";
import { AppSidebar } from "@/components/sideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AlterDistrict from "@/components/forms/district/AlterDistrict";
import AlterSupervisor from "@/components/forms/supervisor/AlterSupervisor";
export default function Layout() {

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page 2</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AlterSupervisor />
      </CardContent>
    </Card>
  );
}

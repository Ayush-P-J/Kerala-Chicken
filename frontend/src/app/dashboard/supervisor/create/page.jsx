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
import CreateSupervisor from "@/components/forms/supervisor/CreateSupervisor";
export default function Layout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Supervisor</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <CreateSupervisor />
      </CardContent>
    </Card>
  );
}

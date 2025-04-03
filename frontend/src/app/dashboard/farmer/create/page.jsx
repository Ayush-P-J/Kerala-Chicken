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
import { CreateDistrict } from "@/components/forms/district/CreateDistrict";
export default function Layout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Farmer</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <CreateDistrict />
      </CardContent>
    </Card>
  );
}

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
import { CreateFarmer } from "@/components/forms/farmer/CreateFarmer";
export default function Layout() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Farmer</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <CreateFarmer />
      </CardContent>
    </Card>
  );
}

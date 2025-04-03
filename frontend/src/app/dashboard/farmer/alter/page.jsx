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
export default function Layout() {

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmers</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AlterDistrict />
      </CardContent>
    </Card>
  );
}

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
import AlterFarmer from "@/components/forms/farmer/AlterFarmer";
export default function Layout() {

  

  return (
    <Card>
      <CardHeader>
        <CardTitle>Farmers</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AlterFarmer />
      </CardContent>
    </Card>
  );
}

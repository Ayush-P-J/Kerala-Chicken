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
import SearchBar from "@/components/SearchBar";
export default function Layout() {
  return (
    <Card className="h-[80vh] overflow-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Farmers</CardTitle>
          <SearchBar />
        </div>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AlterFarmer />
      </CardContent>
    </Card>
  );
}

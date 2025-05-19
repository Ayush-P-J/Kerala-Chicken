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
import SearchBar from "@/components/SearchBar";
import AlterCredentials from "@/components/forms/credentials/AlterCredentials";
export default function Layout() {
  return (
    <Card className="h-[80vh] overflow-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Credentials</CardTitle>
          <SearchBar className="mt-1" />
        </div>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <AlterCredentials />
      </CardContent>
    </Card>
  );
}

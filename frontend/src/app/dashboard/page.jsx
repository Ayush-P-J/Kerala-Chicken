"use client";
import {  PieDiagram } from "@/components/diagrams/PieDiagram";
import { AppSidebar } from "@/components/sideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashBoard({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <PieDiagram />
        <PieDiagram />
        <PieDiagram />
        <PieDiagram />
    </div>
  );
}

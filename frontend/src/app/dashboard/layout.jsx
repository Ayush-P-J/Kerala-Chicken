"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

import { AppSidebar } from "@/components/sideBar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "@/components/loadingSpinner/loadingSpinner";
import { SearchProvider } from "@/contexts/SearchContext";
import { AuthProvider } from "@/providers/authProvider";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {

    
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      <LoadingSpinner />;
      return router.push("/");
    }
  }, [status, session, router]);


  return (
      <SearchProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="h-screen">
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
              </div>
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 h-[calc(100vh-64px)] overflow-y-scroll scrollbar-hidden">
              <ToastContainer />
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
                {children}
              </div>
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SearchProvider>
  );
}

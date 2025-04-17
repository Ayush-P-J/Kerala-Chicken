"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export function AuthProvider({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.replace("/login");
    if (status === "authenticated" && session?.user?.role !== "admin") {
      router.replace("/");
    }
  }, [status, session, router]);

  if (status !== "authenticated" || session?.user?.role !== "admin") {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
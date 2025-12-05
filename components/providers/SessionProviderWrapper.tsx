"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect } from "react";

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    const hasError = (session as any)?.error;
    if (status === "authenticated" && hasError) {
      // Auto sign out when backend indicates an invalid/expired session
      signOut({ callbackUrl: "/signin" });
    }
  }, [status, session]);

  // Refresh session when tab becomes visible (user returns to tab)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && status === "authenticated") {
        // Manually trigger session update when tab becomes visible
        // This ensures token refresh happens even if tab was inactive for a long time
        try {
          await update();
        } catch (error) {
          console.error("[SessionProvider] Failed to update session on visibility change:", error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [status, update]);

  return <>{children}</>;
}

export default function SessionProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider 
      // Refetch session every 5 minutes (more frequent for inactive tabs)
      // This ensures tokens are refreshed before expiry even in background tabs
      refetchInterval={5 * 60}
      // Also refetch when window regains focus to catch any changes
      refetchOnWindowFocus={true}
    >
      <SessionErrorWatcher>{children}</SessionErrorWatcher>
    </SessionProvider>
  );
}

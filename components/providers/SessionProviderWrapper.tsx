"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { AuthHydrationGate } from "./AuthHydrationGate";

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();

  // Auto-logout if backend reports invalid session
  useEffect(() => {
    if (status === "authenticated" && (session as any)?.error) {
      signOut({ callbackUrl: "/signin" });
    }
  }, [status, session]);

  // Refresh when tab becomes visible
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && status === "authenticated") {
        update();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [status, update]);

  // 🔥 THE REAL FIX: keep-alive ping even in background tabs
  // Persistent keep-alive to refresh tokens even in inactive tabs
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/auth/session");
    }, 2 * 60 * 1000); // every 2 minutes

    return () => clearInterval(interval);
  }, []);

  return <>{children}</>;
}

export default function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider
      refetchOnWindowFocus={false}
      refetchInterval={0}
    >
      <AuthHydrationGate>
        <SessionErrorWatcher>{children}</SessionErrorWatcher>
      </AuthHydrationGate>
    </SessionProvider>
  );
}

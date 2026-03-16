"use client";

import { usePathname } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect, useRef } from "react";
import { AuthHydrationGate } from "./AuthHydrationGate";

const FATAL_AUTH_ERRORS = new Set([
  "ProfileNotFound",
  "UserDeletedOrInvalid",
  "RefreshTokenInvalid",
]);

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const signOutInProgress = useRef(false);
  const lastRetriedFatalError = useRef<string | null>(null);
  const lastSessionUpdateAt = useRef(0);
  const MIN_SESSION_UPDATE_INTERVAL = 30_000;
  const authError = (session as any)?.error as string | undefined;

  useEffect(() => {
    if (!authError) {
      lastRetriedFatalError.current = null;
    }
  }, [authError]);

  // For fatal auth states, retry session update once before forcing sign out.
  useEffect(() => {
    if (status !== "authenticated" || !authError || signOutInProgress.current) return;
    if (!FATAL_AUTH_ERRORS.has(authError)) return;

    const onAuthPage = pathname?.includes("/signin") || pathname?.includes("/signout");
    if (onAuthPage) return;

    if (lastRetriedFatalError.current !== authError) {
      lastRetriedFatalError.current = authError;
      void update();
      return;
    }

    signOutInProgress.current = true;
    void signOut({ callbackUrl: "/signin" });
  }, [status, authError, pathname, update]);

  // Refresh session on visibility/focus with throttling to avoid refresh races.
  useEffect(() => {
    const maybeUpdateSession = () => {
      if (status !== "authenticated") return;
      const now = Date.now();
      if (now - lastSessionUpdateAt.current < MIN_SESSION_UPDATE_INTERVAL) return;
      lastSessionUpdateAt.current = now;
      void update();
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        maybeUpdateSession();
      }
    };

    const handleFocus = () => {
      maybeUpdateSession();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("focus", handleFocus);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("focus", handleFocus);
    };
  }, [status, update]);

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

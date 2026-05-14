"use client";

import { usePathname } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AuthHydrationGate } from "./AuthHydrationGate";
import TopToast from "@/components/shared/TopToast";

const FATAL_AUTH_ERRORS = new Set([
  "ProfileNotFound",
  "RefreshTokenInvalid",
]);

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const signOutInProgress = useRef(false);
  const lastRetriedFatalError = useRef<string | null>(null);
  const authError = (session as any)?.error as string | undefined;
  const [showRefreshWarning, setShowRefreshWarning] = useState(false);

  useEffect(() => {
    if (!authError) {
      lastRetriedFatalError.current = null;
      setShowRefreshWarning(false);
      return;
    }

    if (authError === "RefreshTokenInvalid") {
      setShowRefreshWarning(true);
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

  return (
    <>
      {showRefreshWarning ? (
        <TopToast
          tone="info"
          message="Reconnecting your session. Some data may be temporarily unavailable."
          onClose={() => setShowRefreshWarning(false)}
        />
      ) : null}
      {children}
    </>
  );
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

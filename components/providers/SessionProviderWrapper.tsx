"use client";

import { usePathname, useRouter } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect, useRef, useState } from "react";
import { AuthHydrationGate } from "./AuthHydrationGate";
import TopToast from "@/components/shared/TopToast";
import {
  getLocalizedSignInPath,
  isAuthPage,
  requiresAuthenticatedSession,
} from "@/lib/authRedirect";

const FATAL_AUTH_ERRORS = new Set([
  "ProfileNotFound",
  "RefreshTokenInvalid",
]);

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status, update } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const signOutInProgress = useRef(false);
  const lastRetriedFatalError = useRef<string | null>(null);
  const authError = (session as any)?.error as string | undefined;
  const [showRefreshWarning, setShowRefreshWarning] = useState(false);
  const signInPath = getLocalizedSignInPath(pathname);

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

  useEffect(() => {
    if (status !== "unauthenticated" || signOutInProgress.current) return;
    if (!requiresAuthenticatedSession(pathname) || isAuthPage(pathname)) return;

    router.replace(signInPath);
  }, [pathname, router, signInPath, status]);

  // For fatal auth states, retry session update once before forcing sign out.
  useEffect(() => {
    if (status !== "authenticated" || !authError || signOutInProgress.current) return;
    if (!FATAL_AUTH_ERRORS.has(authError)) return;

    const onAuthPage = isAuthPage(pathname);
    if (onAuthPage) return;

    if (lastRetriedFatalError.current !== authError) {
      lastRetriedFatalError.current = authError;
      void update();
      return;
    }

    signOutInProgress.current = true;
    void signOut({ callbackUrl: signInPath });
  }, [authError, pathname, signInPath, status, update]);

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

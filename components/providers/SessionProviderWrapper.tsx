"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import { ReactNode, useEffect } from "react";

function SessionErrorWatcher({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    const hasError = (session as any)?.error;
    if (status === "authenticated" && hasError) {
      // Auto sign out when backend indicates an invalid/expired session
      signOut({ callbackUrl: "/signin" });
    }
  }, [status, session]);

  return <>{children}</>;
}

export default function SessionProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <SessionProvider 
      // Refetch session every 10 minutes to sync with JWT callback updateAge
      // This ensures client and server stay synchronized
      refetchInterval={10 * 60}
      // Also refetch when window regains focus to catch any changes
      refetchOnWindowFocus={true}
    >
      <SessionErrorWatcher>{children}</SessionErrorWatcher>
    </SessionProvider>
  );
}

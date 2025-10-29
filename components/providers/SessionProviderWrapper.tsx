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
    <SessionProvider refetchInterval={10 * 60}>
      <SessionErrorWatcher>{children}</SessionErrorWatcher>
    </SessionProvider>
  );
}

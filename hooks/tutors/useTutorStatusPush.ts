"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import {
  connectAdminSocket,
  disconnectAdminSocket,
  onTutorStatusUpdated,
} from "@/services/admin/socketClient";

export function useTutorStatusPush() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const locale = pathname?.split("/")?.[1] ?? "en";
  const accessToken = (session as any)?.access_token as string | undefined;

  useEffect(() => {
    if (!accessToken) return;

    const socket = connectAdminSocket(accessToken);

    const cleanup = onTutorStatusUpdated(async (payload) => {
      // Force NextAuth to re-fetch /v1/me so onboardingStatus is fresh
      await update();

      if (payload.status === "APPROVED") {
        router.replace(`/${locale}/tutor/dashboard`);
      }
      // For REJECTED the session revalidation is enough — middleware will keep
      // the tutor on the onboarding page showing their updated status.
    });

    return () => {
      cleanup();
      disconnectAdminSocket();
    };
    // Re-connect only when the access token changes (e.g. after refresh)
  }, [accessToken]); // eslint-disable-line react-hooks/exhaustive-deps
}

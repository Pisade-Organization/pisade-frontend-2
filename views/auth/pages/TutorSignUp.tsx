"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { AUTH_TYPES } from "../types/auth.enum";
import LoadingPage from "@/components/LoadingPage";
import { getPostAuthPath } from "@/lib/getPostAuthPath";

export default function TutorSignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(
        getPostAuthPath(pathname ?? "/", session?.user?.role, session?.user?.onboardingStatus),
      );
    }
  }, [status, session?.user?.role, pathname, router]);

  // While loading session, render nothing (or a spinner)
  if (status === "loading") {
    return (
      <LoadingPage />
    );
  }

  // If not authenticated → show login
  if (status === "unauthenticated") {
    return <AuthLayout type={AUTH_TYPES.TUTOR_SIGNUP} />;
  }

  // Optional: return null when redirecting
  return null;
}

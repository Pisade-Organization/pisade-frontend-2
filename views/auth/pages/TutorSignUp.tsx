"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import { AUTH_TYPES } from "../types/auth.enum";
import LoadingPage from "@/components/LoadingPage";

export default function TutorSignUpPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If already logged in → redirect to home
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

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

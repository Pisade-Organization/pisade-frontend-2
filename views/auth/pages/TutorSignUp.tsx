"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLayout from "../components/AuthLayout";
import Loading from "@/components/Loading";
import { AUTH_TYPES } from "../types/auth.enum";

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
      <div className="flex items-center justify-center min-h-screen">
        <Loading />
      </div>
    );
  }

  // If not authenticated → show login
  if (status === "unauthenticated") {
    return <AuthLayout type={AUTH_TYPES.TUTOR_SIGNUP} />;
  }

  // Optional: return null when redirecting
  return null;
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthLayout from "../components/AuthLayout";

export default function SigninPage() {
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
        <p className="text-neutral-500">Loading...</p>
      </div>
    );
  }

  // If not authenticated → show login
  if (status === "unauthenticated") {
    return <AuthLayout />;
  }

  // Optional: return null when redirecting
  return null;
}

"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
      if (!token) return setStatus("error");

      try {
        const result = await signIn("magicLink", {
          token,
          redirect: false,
        });

        if (result?.error) throw new Error(result.error);
        setStatus("success");
        router.replace("/");
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verify();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && <p>✅ Verified! Redirecting...</p>}
      {status === "error" && <p>❌ Invalid or expired link</p>}
    </div>
  );
}

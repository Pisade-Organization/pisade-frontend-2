"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getSession, signIn } from "next-auth/react";
import { getPostAuthPath } from "@/lib/getPostAuthPath";

export default function VerifyPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const router = useRouter();
  const pathname = usePathname();
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
        const session = await getSession();
        router.replace(
          getPostAuthPath(pathname ?? "/", session?.user?.role, session?.user?.onboardingStatus),
        );
      } catch (err) {
        console.error(err);
        setStatus("error");
      }
    };

    verify();
  }, [token, pathname, router]);

  return (
    <div className="flex items-center justify-center min-h-screen text-center">
      {status === "loading" && <p>Verifying your email...</p>}
      {status === "success" && <p>✅ Verified! Redirecting...</p>}
      {status === "error" && <p>❌ Invalid or expired link</p>}
    </div>
  );
}

"use client"
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import BaseButton from "@/components/base/BaseButton";
import { getLocalizedSignInPath } from "@/lib/authRedirect";

export default function SignOutPage() {
  const t = useTranslations("signout")
  const pathname = usePathname();
  const signInPath = getLocalizedSignInPath(pathname);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (hasTriggeredRef.current) {
      return;
    }

    hasTriggeredRef.current = true;
    void signOut({ callbackUrl: signInPath });
  }, [signInPath]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <BaseButton onClick={() => signOut({ callbackUrl: signInPath })}>
        {t("logOut")}
      </BaseButton>
    </div>
  )
}

"use client";
import Image from "next/image";
import { GoogleIcon } from "@/components/icons";
import BaseButton from "@/components/base/BaseButton";

export default function GoogleButton() {
  const handleGoogleRedirect = () => {
    // ✅ Redirect user to backend OAuth entry
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/signin`;
  };

  return (
    <BaseButton

      disabled
      variant="secondary"
      typeStyle="outline"
      type="button"
      onClick={handleGoogleRedirect}
      iconLeft={<GoogleIcon width={20} height={20}/>}

    >
        Continue with Google
    </BaseButton>
  );
}

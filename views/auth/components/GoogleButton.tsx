"use client";
import { useCallback, useMemo, useState } from "react";
import Script from "next/script";
import { getSession, signIn } from "next-auth/react";
import { usePathname } from "next/navigation";
import { GoogleIcon } from "@/components/icons";
import BaseButton from "@/components/base/BaseButton";
import { getPostAuthPath } from "@/lib/getPostAuthPath";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: {
              access_token?: string;
              error?: string;
              error_description?: string;
            }) => void;
            error_callback?: (response: { type: string }) => void;
          }) => {
            requestAccessToken: (options?: { prompt?: string }) => void;
          };
        };
      };
    };
  }
}

export default function GoogleButton() {
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const pathname = usePathname();

  const isDisabled = useMemo(() => {
    return isLoading || !isScriptReady || !clientId;
  }, [isLoading, isScriptReady, clientId]);

  const handleGooglePopup = useCallback(() => {
    if (!clientId) {
      console.error("Google login is not configured: missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      return;
    }
    if (!window.google?.accounts?.oauth2) {
      console.error("Google login script is not ready");
      return;
    }

    setIsLoading(true);

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (response) => {
        try {
          if (response.error || !response.access_token) {
            throw new Error(response.error_description || response.error || "Google access token was not returned");
          }

          const result = await signIn("google", {
            googleToken: response.access_token,
            redirect: false,
          });

          if (result?.error) {
            throw new Error(result.error);
          }

          const session = await getSession();
          window.location.assign(getPostAuthPath(pathname ?? "/", session?.user?.role));
        } catch (error) {
          console.error("Google sign-in failed", error);
        } finally {
          setIsLoading(false);
        }
      },
      error_callback: (response) => {
        console.error("Google popup failed", response);
        setIsLoading(false);
      },
    });

    tokenClient.requestAccessToken({ prompt: "select_account" });
  }, [clientId, pathname]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
        onError={() => {
          console.error("Failed to load Google Identity Services script");
          setIsScriptReady(false);
        }}
      />

      <BaseButton
        disabled={isDisabled}
        variant="secondary"
        typeStyle="outline"
        type="button"
        onClick={handleGooglePopup}
        iconLeft={<GoogleIcon width={20} height={20} />}
        className="w-full"
      >
        {isLoading ? "Connecting..." : "Continue with Google"}
      </BaseButton>
    </>
  );
}

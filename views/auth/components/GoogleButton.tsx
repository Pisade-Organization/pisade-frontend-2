"use client";
import { useCallback, useState } from "react";
import Script from "next/script";
import { getSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { GoogleIcon } from "@/components/icons";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";
import { getPostAuthPath } from "@/lib/getPostAuthPath";
import { useGoogleIdentityScriptReady } from "@/hooks/useGoogleIdentityScriptReady";
import { Role } from "@/types/role.enum";
import { AUTH_TYPES } from "../types/auth.enum";

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

interface GoogleButtonProps {
  authType?: AUTH_TYPES;
}

export default function GoogleButton({ authType = AUTH_TYPES.SIGNIN }: GoogleButtonProps) {
  const t = useTranslations("auth.google");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const pathname = usePathname();
  const isTutorSignup = authType === AUTH_TYPES.TUTOR_SIGNUP;
  const { isScriptReady, syncScriptReady, setScriptLoadFailed } = useGoogleIdentityScriptReady();

  const handleGooglePopup = useCallback(() => {
    setErrorMessage(null);

    if (!clientId) {
      console.error("Google login is not configured: missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");
      setErrorMessage(t("errors.notConfigured"));
      return;
    }
    if (!window.google?.accounts?.oauth2) {
      console.error("Google login script is not ready");
      setErrorMessage(t("errors.notReady"));
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
            intent: isTutorSignup ? "TUTOR_SIGNUP" : undefined,
            redirect: false,
          });

          if (result?.error) {
            console.error("[GoogleButton] NextAuth signIn returned error", {
              error: result.error,
              status: result.status,
              ok: result.ok,
              url: result.url,
            });
            throw new Error(result.error);
          }

          const session = await getSession();

          if (isTutorSignup && session?.user?.role === Role.STUDENT) {
            setErrorMessage(t("errors.roleMismatch"));
            await signOut({ redirect: false });
            return;
          }

          window.location.assign(
            getPostAuthPath(pathname ?? "/", session?.user?.role, session?.user?.onboardingStatus),
          );
        } catch (error) {
          console.error("Google sign-in failed", error);

          const message = error instanceof Error ? error.message : "Google sign-in failed";
          if (message.includes("ROLE_CONFLICT_STUDENT_EXISTS")) {
            setErrorMessage(t("errors.roleConflict"));
          } else {
            setErrorMessage(t("errors.unable"));
          }

          console.error("[GoogleButton] Google sign-in context", {
            pathname,
            isTutorSignup,
            intent: isTutorSignup ? "TUTOR_SIGNUP" : undefined,
            rawError: error,
            message,
          });
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
  }, [clientId, isTutorSignup, pathname]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={syncScriptReady}
        onReady={syncScriptReady}
        onError={() => {
          console.error("Failed to load Google Identity Services script");
          setScriptLoadFailed();
          setErrorMessage(t("errors.notReady"));
        }}
      />

      <BaseButton
        disabled={isLoading || !isScriptReady || !clientId}
        variant="secondary"
        typeStyle="outline"
        type="button"
        onClick={handleGooglePopup}
        iconLeft={<GoogleIcon width={20} height={20} />}
        className="w-full"
      >
        {isLoading ? t("connecting") : t("continueWith")}
      </BaseButton>

      {errorMessage ? (
        <Typography variant="body-3" color="red-normal" className="w-full text-left">
          {errorMessage}
        </Typography>
      ) : null}
    </>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";

const GOOGLE_IDENTITY_SCRIPT_SRC = "https://accounts.google.com/gsi/client";

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

function hasGoogleIdentityClient() {
  return typeof window !== "undefined" && Boolean(window.google?.accounts?.oauth2);
}

export function useGoogleIdentityScriptReady() {
  const [isScriptReady, setIsScriptReady] = useState(hasGoogleIdentityClient);

  const syncScriptReady = useCallback(() => {
    setIsScriptReady(hasGoogleIdentityClient());
  }, []);

  useEffect(() => {
    syncScriptReady();

    if (hasGoogleIdentityClient()) {
      return;
    }

    const script = document.querySelector<HTMLScriptElement>(
      `script[src="${GOOGLE_IDENTITY_SCRIPT_SRC}"]`,
    );

    if (!script) {
      return;
    }

    const handleLoad = () => syncScriptReady();
    const handleError = () => setIsScriptReady(false);

    script.addEventListener("load", handleLoad);
    script.addEventListener("error", handleError);

    return () => {
      script.removeEventListener("load", handleLoad);
      script.removeEventListener("error", handleError);
    };
  }, [syncScriptReady]);

  return {
    isScriptReady,
    syncScriptReady,
    setScriptLoadFailed: () => setIsScriptReady(false),
  };
}

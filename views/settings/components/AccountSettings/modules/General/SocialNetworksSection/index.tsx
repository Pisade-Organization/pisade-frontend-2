"use client"

import { useMemo, useState } from "react"
import Script from "next/script"
import { AxiosError } from "axios"
import { getSession, useSession } from "next-auth/react"
import SocialNetworkRow from "./SocialNetworkRow"
import SocialNetworkHeader from "./SocialNetworksHeader";
import {
  useLinkGoogleProvider,
  useUnlinkProvider,
} from "@/hooks/settings/mutations"
import { useMyProfile, useMyProviders } from "@/hooks/settings/queries"
import Typography from "@/components/base/Typography"

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

export default function SocialNetworkSection() {
  const [isScriptReady, setIsScriptReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const { data: session, update: updateSession } = useSession()
  const { data: providers = [] } = useMyProviders()
  const { data: profileData } = useMyProfile()

  const linkGoogleProvider = useLinkGoogleProvider()
  const unlinkProvider = useUnlinkProvider()

  const googleProvider = providers.find((provider) => provider.provider === "GOOGLE")
  const isGoogleConnected = Boolean(googleProvider)

  const fullName = useMemo(() => {
    return (
      session?.user?.fullName ||
      profileData?.profile?.fullName ||
      profileData?.email ||
      "User"
    )
  }, [profileData?.email, profileData?.profile?.fullName, session?.user?.fullName])

  const displayName = isGoogleConnected ? `Connected as ${fullName}` : undefined

  const handleGoogleConnect = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

    if (!clientId) {
      setErrorMessage("Google login is not configured.")
      return
    }

    if (!window.google?.accounts?.oauth2 || !isScriptReady) {
      setErrorMessage("Google login script is not ready.")
      return
    }

    setErrorMessage("")

    const tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: "openid email profile",
      callback: async (response) => {
        try {
          if (response.error || !response.access_token) {
            throw new Error(response.error_description || response.error || "Google access token was not returned")
          }

          await linkGoogleProvider.mutateAsync({ googleToken: response.access_token })
          await updateSession()
          await getSession()
        } catch (error) {
          const message = getErrorMessage(error, "Failed to connect Google account.")
          setErrorMessage(message)
        }
      },
      error_callback: () => {
        setErrorMessage("Failed to open Google popup.")
      },
    })

    tokenClient.requestAccessToken({ prompt: "select_account" })
  }

  const handleGoogleDisconnect = async () => {
    if (!googleProvider?.id) {
      return
    }

    setErrorMessage("")

    try {
      await unlinkProvider.mutateAsync(googleProvider.id)
      await updateSession()
      await getSession()
    } catch (error) {
      const message = getErrorMessage(error, "Failed to disconnect Google account.")

      if (message.toLowerCase().includes("only login provider")) {
        setErrorMessage("You need another login method before disconnecting Google.")
        return
      }

      setErrorMessage(message)
    }
  }

  const isLoading = linkGoogleProvider.isPending || unlinkProvider.isPending

  return (
    <div className="w-full flex flex-col gap-2 lg:gap-4 lg:py-8 lg:px-12 bg-white">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={() => setIsScriptReady(true)}
        onError={() => {
          setIsScriptReady(false)
          setErrorMessage("Failed to load Google Identity Services script.")
        }}
      />

      <SocialNetworkHeader />

      <div className="w-full flex flex-col gap-3 lg:gap-4">
        <SocialNetworkRow
          provider="google"
          connected={isGoogleConnected}
          displayName={displayName}
          loading={isLoading}
          onConnect={handleGoogleConnect}
          onDisconnect={handleGoogleDisconnect}
        />

        {errorMessage ? (
          <Typography variant="body-3" color="red-normal">
            {errorMessage}
          </Typography>
        ) : null}
      </div>
    </div>
  )
}
  const getErrorMessage = (error: unknown, fallback: string) => {
    if (error instanceof AxiosError) {
      const data = error.response?.data as any
      if (typeof data?.error?.message === "string") {
        return data.error.message
      }
      if (typeof data?.message === "string") {
        return data.message
      }
    }

    if (error instanceof Error && error.message) {
      return error.message
    }

    return fallback
  }

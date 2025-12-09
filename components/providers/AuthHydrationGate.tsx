"use client"

import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export function AuthHydrationGate({ children }: { children: React.ReactNode }) {
  const { status } = useSession()
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (status !== "loading") {
      setHydrated(true)
    }
  }, [status])

  if (!hydrated) return null

  return <>{children}</>
}


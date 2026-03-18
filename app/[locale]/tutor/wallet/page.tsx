"use client"

import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function TutorWalletPageRedirect() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const locale = pathname?.split("/")?.[1] || ""
    const localePrefix = locale ? `/${locale}` : ""
    router.replace(`${localePrefix}/tutor/earnings-and-withdrawals`)
  }, [pathname, router])

  return null
}

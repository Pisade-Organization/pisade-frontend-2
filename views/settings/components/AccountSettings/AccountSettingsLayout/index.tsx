"use client"
import Typography from "@/components/base/Typography"
import SettingsSidebar from "../SettingsSidebar"
import SettingsTab from "../SettingsTab"
import { ChevronLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import type { SettingsSidebarItemI } from "../SettingsSidebar/SettingsSidebarItem/types"
import AccountSettingsHeader from "../AccountSettingsHeader"

interface AccountSettingsLayoutProps {
  items: SettingsSidebarItemI[]
  children: React.ReactNode
}

export default function AccountSettingsLayout({ items, children }: AccountSettingsLayoutProps) {
  const pathname = usePathname()

  // Remove locale prefix from pathname for comparison (e.g., /en/settings/student/general -> /settings/student/general)
  const pathnameWithoutLocale = pathname.replace(/^\/(en|th)/, "")

  // Map items for SettingsTab - combine payment-method and payment-history into single "Payment" tab
  const tabItems = items
    .filter((item) => {
      // Remove payment-history from mobile tab
      return !item.href.includes("/payment-history")
    })
    .map(({ label, href }) => {
      // Combine payment-method into "Payment" for mobile tab
      if (href.includes("/payment-method")) {
        // Check if current path is payment-method or payment-history to mark as active
        const isActive = pathnameWithoutLocale.includes("/payment-method") || pathnameWithoutLocale.includes("/payment-history")
        return { label: "Payment", href, isActive }
      }
      // For other items, check if current path matches
      const isActive = pathnameWithoutLocale === href || pathnameWithoutLocale.startsWith(href + "/")
      return { label, href, isActive }
    })

  return (
    <div className="
      w-full
      border-t border-neutral-25 lg:border-none
      py-3 px-4
      flex flex-col gap-2
    ">

      <AccountSettingsHeader />

      <div className="w-full flex flex-col lg:flex-row lg:items-start gap-5 lg:gap-10">
        {/* Mobile: SettingsTab */}
        <div className="lg:hidden">
          <SettingsTab items={tabItems} currentPath={pathnameWithoutLocale} />
        </div>

        {/* Desktop: SettingsSidebar */}
        <div className="hidden lg:block">
          <SettingsSidebar items={items} currentPath={pathnameWithoutLocale} />
        </div>

        {/* Main content */}
        <main className="flex-1">{children}</main>
      </div>



    </div>
  )
}
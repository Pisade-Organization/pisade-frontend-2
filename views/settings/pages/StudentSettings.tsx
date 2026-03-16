"use client"
import Navbar from "@/components/Navbar"
import AccountSettingsLayout from "@/views/settings/components/AccountSettings/AccountSettingsLayout"
import { Settings, CreditCard, Clock, Bell } from "lucide-react"
import SettingsContent, { SettingsContentType } from "../components/AccountSettings/SettingsContent"
import { usePathname } from "next/navigation"
import { useMemo } from "react"
import { useMyNotificationPreferences, useMyProfile } from "@/hooks/settings/queries"
import { useUpdateMyNotificationPreferences } from "@/hooks/settings/mutations"

const studentSidebarItems = [
  {
    label: "General",
    href: "/settings/student/general",
    icon: <Settings />,
  },
  {
    label: "Payment Method",
    href: "/settings/student/payment-method",
    icon: <CreditCard />,
  },
  {
    label: "Payment History",
    href: "/settings/student/payment-history",
    icon: <Clock />,
  },
  {
    label: "Notifications",
    href: "/settings/student/notifications",
    icon: <Bell />,
  },
]

export default function StudentSettingsPage() {
  const pathname = usePathname()
  const { data: profileData } = useMyProfile()
  const { data: notificationPreferences } = useMyNotificationPreferences()
  const updateNotificationPreferences = useUpdateMyNotificationPreferences()

  // Map pathname to settings type
  const settingsType = useMemo<SettingsContentType>(() => {
    if (pathname?.includes("/payment-method")) return "payment-method"
    if (pathname?.includes("/payment-history")) return "payment-history"
    if (pathname?.includes("/notifications")) return "notifications"
    return "general" // default to general
  }, [pathname])

  const generalProps = {
    fullName: profileData?.profile?.fullName ?? "",
    countryOfBirth: profileData?.profile?.countryOfBirth ?? "TH",
    nationality: profileData?.profile?.nationality ?? "TH",
    phoneNumber: profileData?.phoneNumber ?? "",
    email: profileData?.email ?? "",
    emailVerified: profileData?.emailVerified ?? false,
    avatarUrl: profileData?.profile?.avatarUrl ?? "https://ui-avatars.com/api/?name=User",
    timezone: profileData?.profile?.timezone ?? "Asia/Bangkok",
  }

  const notificationsProps = {
    isReceivedEmailNotification:
      notificationPreferences?.isReceivedEmailNotification ?? true,
    isReceivedSMSNotification:
      notificationPreferences?.isReceivedSMSNotification ?? false,
    isUpdating: updateNotificationPreferences.isPending,
    onEmailToggle: (checked: boolean) => {
      updateNotificationPreferences.mutate({
        isReceivedEmailNotification: checked,
      })
    },
    onSMSToggle: (checked: boolean) => {
      updateNotificationPreferences.mutate({
        isReceivedSMSNotification: checked,
      })
    },
  }

  return (
    <div className="lg:bg-neutral-25 lg:min-h-screen">
      <Navbar variant="student_dashboard" />
      <div className="bg-white lg:bg-transparent border-t border-neutral-25 py-3 px-4 flex flex-col gap-2 lg:gap-0 lg:px-20 lg:pb-8">
        <AccountSettingsLayout items={studentSidebarItems}>
          <SettingsContent
            type={settingsType}
            generalProps={generalProps}
            notificationsProps={notificationsProps}
          />
        </AccountSettingsLayout>
      </div>
    </div>
  )
}

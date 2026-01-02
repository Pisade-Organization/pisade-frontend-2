"use client"
import Navbar from "@/components/Navbar"
import AccountSettingsLayout from "@/views/settings/components/AccountSettings/AccountSettingsLayout"
import { Settings, CreditCard, Clock, Bell } from "lucide-react"
import SettingsContent, { SettingsContentType } from "../components/AccountSettings/SettingsContent"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

const tutorSidebarItems = [
  {
    label: "General",
    href: "/settings/tutor/general",
    icon: <Settings />,
  },
  {
    label: "Billing Methods",
    href: "/settings/tutor/billing-methods",
    icon: <CreditCard />,
  },
  {
    label: "Notifications",
    href: "/settings/tutor/notifications",
    icon: <Bell />,
  },
]

export default function TutorSettingsPage() {
  const pathname = usePathname()

  // Map pathname to settings type
  const settingsType = useMemo<SettingsContentType>(() => {
    if (pathname?.includes("/billing-methods")) return "billing-methods"
    if (pathname?.includes("/notifications")) return "notifications"
    return "general" // default to general
  }, [pathname])

  // Mock data - replace with actual data from API/state
  const generalProps = {
    fullName: "John Doe",
    countryOfBirth: "TH",
    nationality: "TH",
    countryCode: 66,
    phoneNumber: "123456789",
    email: "john@example.com",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    teachingInfoProps: {
      subject: "Mathematics",
      languages: "English, Thai",
    },
  }

  const notificationsProps = {
    isReceivedEmailNotification: true,
    isReceivedSMSNotification: false,
  }

  return (
    <div className="lg:bg-neutral-25 lg:min-h-screen">
      <Navbar variant="tutor_dashboard" />
      <div className="bg-white lg:bg-transparent border-t border-neutral-25 py-3 px-4 flex flex-col gap-2 lg:gap-0 lg:px-20 lg:pb-8">
        <AccountSettingsLayout items={tutorSidebarItems}>
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
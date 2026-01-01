"use client"
import Navbar from "@/components/Navbar"
import AccountSettingsLayout from "@/views/settings/components/AccountSettings/AccountSettingsLayout"
import { Settings, CreditCard, Clock, Bell } from "lucide-react"
import SettingsContent, { SettingsContentType } from "../components/AccountSettings/SettingsContent"
import { usePathname } from "next/navigation"
import { useMemo } from "react"

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

  // Map pathname to settings type
  const settingsType = useMemo<SettingsContentType>(() => {
    if (pathname?.includes("/payment-method")) return "payment-method"
    if (pathname?.includes("/payment-history")) return "payment-history"
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
  }

  const notificationsProps = {
    isReceivedEmailNotification: true,
    isReceivedSMSNotification: false,
  }

  return (
    <>
      <Navbar variant="student_dashboard" />
      <div className="bg-white lg:bg-neutral-25 border-t border-neutral-25 py-3 px-4 flex flex-col gap-2 lg:gap-0 lg:px-20 lg:pb-8">
        <AccountSettingsLayout items={studentSidebarItems}>
          <SettingsContent
            type={settingsType}
            generalProps={generalProps}
            notificationsProps={notificationsProps}
          />
        </AccountSettingsLayout>
      </div>
    </>
  )
}
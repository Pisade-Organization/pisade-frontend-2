import type { DashboardNavItem } from "./types"

export const getStudentDashboardNavItems = (localePrefix: string): DashboardNavItem[] => [
  {
    label: "Home",
    path: `${localePrefix}/student/dashboard`,
    isActive: (pathname) => pathname?.endsWith("/student/dashboard") ?? false,
  },
  {
    label: "Tutors",
    path: `${localePrefix}/student/tutors`,
    isActive: (pathname) => pathname?.includes("/student/tutors") ?? false,
  },
  {
    label: "Class",
    path: `${localePrefix}/class-management`,
    isActive: (pathname) => pathname?.includes("/class-management") ?? false,
  },
  {
    label: "Schedule",
    path: `${localePrefix}/student/schedule`,
    isActive: (pathname) => pathname?.includes("/student/schedule") ?? false,
  },
]

export const getTutorDashboardNavItems = (localePrefix: string): DashboardNavItem[] => [
  {
    label: "Home",
    path: `${localePrefix}/tutor/dashboard`,
    isActive: (pathname) => pathname?.endsWith("/tutor/dashboard") ?? false,
  },
  {
    label: "Students",
    path: `${localePrefix}/tutor/students`,
    isActive: (pathname) => pathname?.includes("/tutor/students") ?? false,
  },
  {
    label: "Schedule",
    path: `${localePrefix}/tutor/schedule`,
    isActive: (pathname) => pathname?.includes("/tutor/schedule") ?? false,
  },
  {
    label: "Earnings & Withdrawals",
    path: `${localePrefix}/tutor/wallet`,
    isActive: (pathname) => pathname?.includes("/tutor/wallet") ?? false,
  },
]

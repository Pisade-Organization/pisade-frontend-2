import type { DashboardNavItem } from "./types"

type GetNavItemsFn = (key: string) => string

export const getStudentDashboardNavItems = (localePrefix: string, t: GetNavItemsFn): DashboardNavItem[] => [
  {
    label: t("student.home"),
    path: `${localePrefix}/student/dashboard`,
    isActive: (pathname) => pathname?.endsWith("/student/dashboard") ?? false,
  },
  {
    label: t("student.tutors"),
    path: `${localePrefix}/student/tutors`,
    isActive: (pathname) => pathname?.includes("/student/tutors") ?? false,
  },
  {
    label: t("student.class"),
    path: `${localePrefix}/class-management`,
    isActive: (pathname) => pathname?.includes("/class-management") ?? false,
  },
  {
    label: t("student.schedule"),
    path: `${localePrefix}/student/schedule`,
    isActive: (pathname) => pathname?.includes("/student/schedule") ?? false,
  },
]

export const getTutorDashboardNavItems = (localePrefix: string, t: GetNavItemsFn): DashboardNavItem[] => [
  {
    label: t("tutor.home"),
    path: `${localePrefix}/tutor/dashboard`,
    isActive: (pathname) => pathname?.endsWith("/tutor/dashboard") ?? false,
  },
  {
    label: t("tutor.students"),
    path: `${localePrefix}/tutor/students/active`,
    isActive: (pathname) => pathname?.includes("/tutor/students") ?? false,
  },
  {
    label: t("tutor.schedule"),
    path: `${localePrefix}/tutor/schedule`,
    isActive: (pathname) => pathname?.includes("/tutor/schedule") ?? false,
  },
  {
    label: t("tutor.earnings"),
    path: `${localePrefix}/tutor/earnings-and-withdrawals`,
    isActive: (pathname) =>
      Boolean(pathname?.includes("/tutor/earnings-and-withdrawals")) ||
      Boolean(pathname?.includes("/tutor/wallet")),
  },
]

export type NavbarVariant = "search" | "tutor_detail" | "student_dashboard" | "tutor_dashboard"

export type DashboardNavbarVariant = "student_dashboard" | "tutor_dashboard"

export type DashboardNavItem = {
  label: string
  path: string
  isActive: (pathname?: string | null) => boolean
}

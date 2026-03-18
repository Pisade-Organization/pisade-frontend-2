import Navbar from "@/components/Navbar"

export default function TutorEarningsAndWithdrawalsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen ">
      <Navbar variant="tutor_dashboard" />
      {children}
    </div>
  )
}

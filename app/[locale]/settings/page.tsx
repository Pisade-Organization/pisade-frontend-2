// app/settings/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Role } from "@/types/role.enum"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/signin")
  }

  const role = session.user.role

  switch (role) {
    case Role.STUDENT:
      redirect("/settings/student")
    case Role.TUTOR:
      redirect("/settings/tutor")
    default:
      redirect("/")
  }
}

// app/settings/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import { Role } from "@/types/role.enum"

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect(`/${locale}/signin`)
  }

  const role = session.user.role

  switch (role) {
    case Role.STUDENT:
      redirect(`/${locale}/settings/student`)
    case Role.TUTOR:
      redirect(`/${locale}/settings/tutor`)
    default:
      redirect(`/${locale}`)
  }
}

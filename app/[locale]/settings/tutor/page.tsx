import { redirect } from "next/navigation"

export default async function TutorSettings({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  redirect(`/${locale}/settings/tutor/general`)
}

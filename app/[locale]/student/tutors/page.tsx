import { redirect } from "next/navigation"

export default async function TutorsPageRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/student/tutors/favorites`)
}

import { redirect } from "next/navigation"

export default async function TutorStudentsPageRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/tutor/students/active`)
}

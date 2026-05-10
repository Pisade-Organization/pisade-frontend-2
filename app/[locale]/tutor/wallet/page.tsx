import { redirect } from "next/navigation"

export default async function TutorWalletPageRedirect({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  redirect(`/${locale}/tutor/earnings-and-withdrawals`)
}

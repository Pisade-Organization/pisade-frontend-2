import { redirect } from "next/navigation"

export default async function TutorPaymentMethodSettings({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  redirect(`/${locale}/settings/tutor/billing-methods`)
}

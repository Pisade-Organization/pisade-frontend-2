interface PersonalInfoSectionProps {
  fullName: string
  countryOfBirth: string
  nationality: string
  phoneNumber: string
  email: string
  emailVerified: boolean
  avatarUrl: string
  timezone: string
}

const fields = [
  { key: "fullName", label: "Full name" },
  { key: "email", label: "Email" },
  { key: "phoneNumber", label: "Phone number" },
  { key: "countryOfBirth", label: "Country of birth" },
  { key: "nationality", label: "Nationality" },
  { key: "timezone", label: "Timezone" },
] as const

export default function PersonalInfoSection({
  fullName,
  countryOfBirth,
  nationality,
  phoneNumber,
  email,
  emailVerified,
  avatarUrl,
  timezone,
}: PersonalInfoSectionProps) {
  const values = {
    fullName,
    email,
    phoneNumber,
    countryOfBirth,
    nationality,
    timezone,
  }

  return (
    <section className="w-full rounded-t-2xl bg-white lg:px-12 lg:py-8">
      <div className="flex flex-col gap-5 lg:gap-6">
        <div className="flex items-center gap-4">
          <img
            src={avatarUrl}
            alt={fullName || "User avatar"}
            className="h-16 w-16 rounded-full object-cover"
          />

          <div className="min-w-0">
            <h2 className="text-title-1 text-neutral-900">Personal information</h2>
            <p className="text-body-3 text-neutral-500">
              {emailVerified ? "Email verified" : "Email not verified"}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((field) => (
            <div key={field.key} className="rounded-2xl border border-neutral-50 p-4">
              <p className="text-body-4 text-neutral-400">{field.label}</p>
              <p className="mt-1 break-words text-body-3 text-neutral-900">
                {values[field.key] || "-"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

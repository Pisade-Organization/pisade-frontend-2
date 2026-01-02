import PersonalInfoSection from "./PersonalInfoSection"
import SocialNetworkSection from "./SocialNetworksSection"
import TeachingInfoSection from "./TeachingInfoSection"
import DeleteAccountSection from "./DeleteAccountSection"

interface GeneralProps {
  fullName: string
  countryOfBirth: string
  nationality: string
  countryCode: number
  phoneNumber: string
  email: string
  avatarUrl: string
  teachingInfoProps?: {
    subject: string
    languages: string
  }
}

export default function General({
  fullName,
  countryOfBirth,
  nationality,
  countryCode,
  phoneNumber,
  email,
  avatarUrl,
  teachingInfoProps,
}: GeneralProps) {
  return (
    <div className="w-full flex flex-col gap-5 lg:gap-0">
      <PersonalInfoSection
        fullName={fullName}
        countryOfBirth={countryOfBirth}
        nationality={nationality}
        countryCode={countryCode}
        phoneNumber={phoneNumber}
        email={email}
        avatarUrl={avatarUrl}
      />

      <div className="lg:hidden w-screen border-b border-neutral-50 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]" />

      {teachingInfoProps ? (
        <TeachingInfoSection
          subject={teachingInfoProps.subject}
          languages={teachingInfoProps.languages}
        />
      ) : (
        <SocialNetworkSection />
      )}

      <div className="lg:hidden w-screen border-b border-neutral-50 ml-[calc(-50vw+50%)] mr-[calc(-50vw+50%)]" />

      <DeleteAccountSection />
    </div>
  )
}

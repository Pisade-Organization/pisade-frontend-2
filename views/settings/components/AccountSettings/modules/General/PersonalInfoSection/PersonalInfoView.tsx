import InfoRow from "../../../fields/InfoRow"

interface PersonalInfoViewI {
  firstName: string;
  lastName: string;
  fullName: string;
  countryOfBirth: string;
  nationality: string;
  phoneDisplay: string;
  email: string;
}

export default function PersonalInfoView({
  firstName,
  lastName,
  fullName,
  countryOfBirth,
  nationality,
  phoneDisplay,
  email
}: PersonalInfoViewI) {
  const displayName = `${firstName} ${lastName}`.trim() || fullName;

  return (
    <>
      <InfoRow label="Name" value={displayName} />

      <div className="w-full flex justify-between items-center">
        <InfoRow label="Country of birth" value={countryOfBirth} />
        <InfoRow label="Nationality" value={nationality} />
      </div>

      <div className="w-full flex justify-between items-center">
        <InfoRow label="Phone Number" value={phoneDisplay} />
        <InfoRow label="Email" value={email} />
      </div>
    </>
  )
}
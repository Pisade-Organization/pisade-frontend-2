import InfoRow from "../../../fields/InfoRow"

interface TeachingInfoViewI {
  subject: string;
  languages: string;
}

export default function TeachingInfoView({
  subject,
  languages,
}: TeachingInfoViewI) {
  return (
    <>
      <InfoRow label="Subject you teach" value={subject} />
      <InfoRow label="Language" value={languages} />
    </>
  )
}


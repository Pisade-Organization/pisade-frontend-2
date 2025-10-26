import Typography from "@/components/base/Typography"
import { BaseCheckbox } from "@/components/base/Checkbox"
export default function NoCertificateCheckbox({
  hasTeachingCertificate,
  setHasTeachingCertificate
}: {
  hasTeachingCertificate: boolean
  setHasTeachingCertificate: (hasTeachingCertificate: boolean) => void
}) {
  return (
    <div className="w-full rounded-t-[20px] bg-white flex justify-start items-center pt-4 pb-5 px-4 lg:py-5 lg:px-8 gap-2">
      <BaseCheckbox defaultChecked={hasTeachingCertificate} onChange={setHasTeachingCertificate} />
      <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-800">
        I don't have a teaching certificate
      </Typography>
    </div>
  )
}
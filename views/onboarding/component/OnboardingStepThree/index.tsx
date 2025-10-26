import { useState } from "react"
import NoCertificateCheckbox from "./NoCertificateCheckbox"
export default function OnboardingStepThree() {
  const [hasTeachingCertificate, setHasTeachingCertificate] = useState<boolean>(false)
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <NoCertificateCheckbox hasTeachingCertificate={hasTeachingCertificate} setHasTeachingCertificate={setHasTeachingCertificate} />
    </div>   
  )
}
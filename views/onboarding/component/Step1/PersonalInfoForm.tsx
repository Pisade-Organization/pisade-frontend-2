import { useState } from "react"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import PhoneNumberInput from "@/components/base/PhoneNumberInput"

export default function PersonalInfoForm() {
  const [countryOfBirth, setCountryOfBirth] = useState<string>("")
  const [nationality, setNationality] = useState<string>("")
  return (
    <div className="w-full flex flex-col justify-center items-start gap-[18px] py-4 lg:py-6 px-5 lg:px-8">
        <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
          1. Personal Info
        </Typography>
        <div className="w-full border-t border-t-electric-violet-50 border-0 h-px" />

        <div className="w-full flex flex-col justify-center items-center gap-5">

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <BaseInput 
              title="First name"
              placeholder="Enter your first name..."
              required
            />
            <BaseInput
              title="Last name"
              placeholder="Enter your last name..."
              required
            />
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <BaseSelect 
              title="Country of birth"
              options={[
                { value: "TH", label: "Thailand"}
              ]}
              placeholder="Choose a country"
              required
              value={countryOfBirth}
              onChange={setCountryOfBirth}
            />
            <BaseSelect 
              title="Nationality"
              options={[
                { value: "TH", label: "Thailand" }
              ]}
              placeholder="Choose a country"
              required
              value={nationality}
              onChange={setNationality}
            />
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <BaseInput
              title="Email"
              placeholder="Enter your email..."
            />
            <PhoneNumberInput />
          </div>

        </div>
    </div>
  )
}
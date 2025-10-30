"use client"
import { Controller, useFormContext } from "react-hook-form"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import PhoneNumberInput from "@/components/base/PhoneNumberInput"
import { CountryOption, countryOptions } from "@/data/countryOptions"
import { useSession } from "next-auth/react"
export default function PersonalInfoForm() {
  const { control } = useFormContext()
  const { data } = useSession()
  return (
    <div className="w-full flex flex-col justify-center items-start gap-[18px] py-4 lg:py-6 px-5 lg:px-8 rounded-t-[20px] bg-white">
        <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
          1. Personal Info
        </Typography>
        <div className="w-full border-t border-t-electric-violet-50 border-0 h-px" />

        <div className="w-full flex flex-col justify-center items-center gap-5">

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <BaseInput 
                  title="First name"
                  placeholder="Enter your first name..."
                  required
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <BaseInput
                  title="Last name"
                  placeholder="Enter your last name..."
                  required
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <Controller
              name="countryOfBirth"
              control={control}
              render={({ field }) => (
                <BaseSelect 
                  title="Country of birth"
                  options={[
                    { value: "TH", label: "Thailand"}
                  ]}
                  placeholder="Choose a country"
                  required
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <BaseSelect 
                  title="Nationality"
                  options={[
                    { value: "TH", label: "Thailand" }
                  ]}
                  placeholder="Choose a country"
                  required
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-0 lg:gap-4">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <PhoneNumberInput 
                  phoneNumber={field.value}
                  setPhoneNumber={field.onChange}
                  country={countryOptions.find((c) => c.code === "TH") as CountryOption}
                  setCountry={() => {}}
                />
              )}
            />

            <BaseInput 
              title="Email"
              placeholder="Enter your email..."
              required
              value={data?.user.email}
              disabled
              readOnly
            />


          </div>

          

        </div>
    </div>
  )
}
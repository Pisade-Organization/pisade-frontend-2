"use client"
import { Controller, useFormContext } from "react-hook-form"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import { BaseCheckbox } from "@/components/base/Checkbox"
import PhoneNumberInput from "@/components/base/PhoneNumberInput"
import { CountryOption, countryOptions } from "@/data/countryOptions"
import { useSession } from "next-auth/react"

const DEFAULT_COUNTRY =
  countryOptions.find((country) => country.code === "TH") ?? countryOptions[0]

export default function PersonalInfoForm() {
  const { control, setValue, watch } = useFormContext()
  const { data } = useSession()
  const selectedCountryCode = watch("countryCode")
  const selectedCountry =
    countryOptions.find((country) => country.dialCode === selectedCountryCode) ??
    DEFAULT_COUNTRY

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
                  country={selectedCountry as CountryOption}
                  setCountry={(country) =>
                    setValue("countryCode", country.dialCode, { shouldDirty: true })
                  }
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

          <Controller
            name="isOver18"
            control={control}
            render={({ field }) => (
              <div className="w-full flex items-center gap-3">
                <BaseCheckbox
                  checked={Boolean(field.value)}
                  onChange={field.onChange}
                />
                <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-800">
                  I confirm that I am over 18 years old
                </Typography>
              </div>
            )}
          />

        </div>
    </div>
  )
}

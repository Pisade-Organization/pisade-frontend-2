"use client"
import { useState } from "react"

import PhoneNumberInput from "@/components/base/PhoneNumberInput";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
import AvatarField from "../../../fields/AvatarField";
import InfoRow from "../../../fields/InfoRow";
import SectionHeader from "../../../fields/SectionHeader";
import { countryOptions, CountryOption } from "@/data/countryOptions";
import { Pencil } from "lucide-react";

interface PersonalInfoSectionI {
  fullName: string;
  countryOfBirth: string;
  nationality: string;
  countryCode: number;
  phoneNumber: string;
  email: string;
  avatarUrl: string;
}

export default function PersonalInfoSection({
  fullName,
  countryOfBirth,
  nationality,
  countryCode,
  phoneNumber,
  email,
  avatarUrl,
}: PersonalInfoSectionI) {
  
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>(fullName);
  const [selectedCountryOfBirth, setSelectedCountryOfBirth] = useState<string>(countryOfBirth);
  const [selectedNationality, setSelectedNationality] = useState<string>(nationality);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>(phoneNumber);
  const [phoneCountry, setPhoneCountry] = useState<CountryOption>(
    countryOptions.find(c => c.dialCode === `+${countryCode}`) || 
    countryOptions.find(c => c.code === countryOfBirth) || 
    countryOptions.find(c => c.code === "TH") || 
    countryOptions[0]
  );
  const [emailValue, setEmailValue] = useState<string>(email);

  const countrySelectOptions = countryOptions.map(country => ({
    value: country.code,
    label: country.name
  }));

  // Helper functions to get country names for display
  const getCountryName = (code: string) => {
    return countryOptions.find(c => c.code === code)?.name || code;
  };

  const getPhoneDisplay = () => {
    return `${phoneCountry.dialCode} ${phoneNumberValue}`;
  };

  const handleSave = () => {
    // Mock save function - replace with actual API call
    console.log("Saving personal info:", {
      fullName: name,
      countryOfBirth: selectedCountryOfBirth,
      nationality: selectedNationality,
      phoneNumber: phoneNumberValue,
      phoneCountryCode: phoneCountry.dialCode,
      email: emailValue,
    });

    // Here you would typically call an API to save the data
    // Example:
    // await updatePersonalInfo({
    //   fullName: name,
    //   countryOfBirth: selectedCountryOfBirth,
    //   nationality: selectedNationality,
    //   phoneNumber: phoneNumberValue,
    //   countryCode: parseInt(phoneCountry.dialCode.replace('+', '')),
    //   email: emailValue,
    // });

    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  return (
    <div className="w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8">
      <SectionHeader
        title="Personal Info"
        action={
          isEditing ? (
            <BaseButton variant="primary" onClick={handleSave}>
              Save Changes
            </BaseButton>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-full flex justify-center items-center bg-white w-10 h-10 border-[1.5px] border-neutral-50"
            >
              <Pencil className="w-5 h-5 text-neutral-600" />
            </button>
          )
        }
      />


      <AvatarField src={avatarUrl} />

      {isEditing ? (
        <BaseInput 
          title="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      ) : (
        <InfoRow label="Name" value={name} />
      )}

      <div className="w-full flex justify-between items-center">
        {isEditing ? (
          <>
            <BaseSelect
              title="Country of birth"
              options={countrySelectOptions}
              value={selectedCountryOfBirth}
              onChange={(value) => setSelectedCountryOfBirth(value)}
              placeholder="Choose a country"
            />
            <BaseSelect
              title="Nationality"
              options={countrySelectOptions}
              value={selectedNationality}
              onChange={(value) => setSelectedNationality(value)}
              placeholder="Choose a country"
            />
          </>
        ) : (
          <>
            <InfoRow label="Country of birth" value={getCountryName(selectedCountryOfBirth)} />
            <InfoRow label="Nationality" value={getCountryName(selectedNationality)} />
          </>
        )}
      </div>

      <div className="w-full flex justify-between items-center">
        {isEditing ? (
          <>
            <PhoneNumberInput
              phoneNumber={phoneNumberValue}
              setPhoneNumber={setPhoneNumberValue}
              country={phoneCountry}
              setCountry={setPhoneCountry}
            />
            <BaseInput
              title="Email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Enter your email"
            />
          </>
        ) : (
          <>
            <InfoRow label="Phone Number" value={getPhoneDisplay()} />
            <InfoRow label="Email" value={emailValue} />
          </>
        )}
      </div>

    </div>
  )
}
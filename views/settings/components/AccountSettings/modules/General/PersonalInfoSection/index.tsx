"use client"
import { useState } from "react"

import AvatarField from "../../../fields/AvatarField";
import { countryOptions, CountryOption } from "@/data/countryOptions";
import { getTimezones } from "@/lib/getTimezones";
import PersonalInfoHeader from "./PersonalInfoHeader";
import PersonalInfoView from "./PersonalInfoView";
import PersonalInfoEdit from "./PersonalInfoEdit";

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
  // Parse fullName to extract firstName and lastName
  const [firstName, setFirstName] = useState<string>(() => {
    const nameParts = fullName.trim().split(/\s+/);
    return nameParts[0] || '';
  });
  const [lastName, setLastName] = useState<string>(() => {
    const nameParts = fullName.trim().split(/\s+/);
    return nameParts.slice(1).join(' ') || '';
  });
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
  const [timezone, setTimezone] = useState<string>("Asia/Bangkok");

  const timezoneOptions = getTimezones();

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
      firstName: firstName,
      lastName: lastName,
      fullName: `${firstName} ${lastName}`.trim(),
      phoneNumber: phoneNumberValue,
      phoneCountryCode: phoneCountry.dialCode,
      email: emailValue,
      timezone: timezone,
    });

    // Here you would typically call an API to save the data
    // Example:
    // await updatePersonalInfo({
    //   firstName: firstName,
    //   lastName: lastName,
    //   phoneNumber: phoneNumberValue,
    //   countryCode: parseInt(phoneCountry.dialCode.replace('+', '')),
    //   email: emailValue,
    //   timezone: timezone,
    // });

    // For now, just toggle editing mode off
    setIsEditing(false);
  };

  return (
    <div className="bg-white w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8 rounded-t-2xl">

      <PersonalInfoHeader 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        onSave={handleSave}
      />

      <AvatarField src={avatarUrl} />

      {isEditing ? (
        <PersonalInfoEdit
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumberValue={phoneNumberValue}
          setPhoneNumberValue={setPhoneNumberValue}
          phoneCountry={phoneCountry}
          setPhoneCountry={setPhoneCountry}
          emailValue={emailValue}
          setEmailValue={setEmailValue}
          isEmailVerified={true}
          timezone={timezone}
          setTimezone={setTimezone}
          timezoneOptions={timezoneOptions}
          onSave={handleSave}
        />
      ) : (
        <PersonalInfoView
          firstName={firstName}
          lastName={lastName}
          fullName={fullName}
          countryOfBirth={getCountryName(selectedCountryOfBirth)}
          nationality={getCountryName(selectedNationality)}
          phoneDisplay={getPhoneDisplay()}
          email={emailValue}
        />
      )}

    </div>
  )
}
"use client"
import { ChangeEvent, useEffect, useMemo, useRef, useState } from "react"

import AvatarField from "../../../fields/AvatarField";
import { countryOptions, CountryOption } from "@/data/countryOptions";
import { getTimezones } from "@/lib/getTimezones";
import PersonalInfoHeader from "./PersonalInfoHeader";
import PersonalInfoView from "./PersonalInfoView";
import PersonalInfoEdit from "./PersonalInfoEdit";
import Typography from "@/components/base/Typography";
import { useUpdateMyPhoneNumber, useUpdateMyProfile } from "@/hooks/settings/mutations";
import { getPresignedUrl, uploadFileToPresignedUrl } from "@/services/upload";
import type { UpdateMyProfileDto } from "@/services/profile/types";

interface PersonalInfoSectionI {
  fullName: string;
  countryOfBirth: string;
  nationality: string;
  phoneNumber: string;
  email: string;
  emailVerified: boolean;
  avatarUrl: string;
  timezone: string;
}

const defaultCountry = countryOptions.find((country) => country.code === "TH") || countryOptions[0];

function splitName(fullName: string) {
  const trimmed = fullName.trim();
  if (!trimmed) {
    return { firstName: "", lastName: "" };
  }

  const parts = trimmed.split(/\s+/);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
}

function parsePhoneNumber(phoneNumber: string, fallbackCountryCode: string) {
  const fallbackCountry =
    countryOptions.find((country) => country.code === fallbackCountryCode) || defaultCountry;

  if (!phoneNumber?.trim()) {
    return {
      country: fallbackCountry,
      phoneWithoutDialCode: "",
    };
  }

  const normalizedPhone = phoneNumber.trim();
  if (!normalizedPhone.startsWith("+")) {
    return {
      country: fallbackCountry,
      phoneWithoutDialCode: normalizedPhone.replace(/\D/g, ""),
    };
  }

  const sortedCountries = [...countryOptions].sort(
    (first, second) => second.dialCode.length - first.dialCode.length,
  );
  const matchedCountry = sortedCountries.find((country) =>
    normalizedPhone.startsWith(country.dialCode),
  );

  if (!matchedCountry) {
    return {
      country: fallbackCountry,
      phoneWithoutDialCode: normalizedPhone.replace(/\D/g, ""),
    };
  }

  return {
    country: matchedCountry,
    phoneWithoutDialCode: normalizedPhone
      .slice(matchedCountry.dialCode.length)
      .replace(/\D/g, ""),
  };
}

export default function PersonalInfoSection({
  fullName,
  countryOfBirth,
  nationality,
  phoneNumber,
  email,
  emailVerified,
  avatarUrl,
  timezone,
}: PersonalInfoSectionI) {
  const updateMyProfile = useUpdateMyProfile();
  const updateMyPhoneNumber = useUpdateMyPhoneNumber();
  const avatarInputRef = useRef<HTMLInputElement | null>(null);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveError, setSaveError] = useState<string>("");
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const initialName = splitName(fullName);
  const initialPhone = parsePhoneNumber(phoneNumber, countryOfBirth);

  const [firstName, setFirstName] = useState<string>(initialName.firstName);
  const [lastName, setLastName] = useState<string>(initialName.lastName);
  const [selectedCountryOfBirth, setSelectedCountryOfBirth] = useState<string>(countryOfBirth);
  const [selectedNationality, setSelectedNationality] = useState<string>(nationality);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>(initialPhone.phoneWithoutDialCode);
  const [phoneCountry, setPhoneCountry] = useState<CountryOption>(initialPhone.country);
  const [timezoneValue, setTimezoneValue] = useState<string>(timezone);
  const [avatarUrlValue, setAvatarUrlValue] = useState<string>(avatarUrl);

  const isSaving =
    updateMyProfile.isPending ||
    updateMyPhoneNumber.isPending ||
    isUploadingAvatar;

  const timezoneOptions = getTimezones();
  const countrySelectOptions = useMemo(
    () => countryOptions.map((country) => ({ value: country.code, label: country.name })),
    [],
  );

  useEffect(() => {
    if (isEditing) {
      return;
    }

    const name = splitName(fullName);
    const parsedPhone = parsePhoneNumber(phoneNumber, countryOfBirth);

    setFirstName(name.firstName);
    setLastName(name.lastName);
    setSelectedCountryOfBirth(countryOfBirth);
    setSelectedNationality(nationality);
    setPhoneCountry(parsedPhone.country);
    setPhoneNumberValue(parsedPhone.phoneWithoutDialCode);
    setTimezoneValue(timezone);
    setAvatarUrlValue(avatarUrl);
  }, [
    avatarUrl,
    countryOfBirth,
    fullName,
    isEditing,
    nationality,
    phoneNumber,
    timezone,
  ]);

  // Helper functions to get country names for display
  const getCountryName = (code: string) => {
    return countryOptions.find((country) => country.code === code)?.name || code;
  };

  const getPhoneDisplay = () => {
    return `${phoneCountry.dialCode} ${phoneNumberValue}`.trim();
  };

  const handleAvatarClick = () => {
    if (!isEditing || isSaving) {
      return;
    }

    avatarInputRef.current?.click();
  };

  const handleAvatarUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setSaveError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    setSaveError("");
    setIsUploadingAvatar(true);

    try {
      const presigned = await getPresignedUrl(file.name, file.type, "profile");
      if (!presigned) {
        throw new Error("Failed to get upload URL for avatar.");
      }

      const isUploaded = await uploadFileToPresignedUrl(presigned.uploadUrl, file);
      if (!isUploaded) {
        throw new Error("Failed to upload avatar image.");
      }

      setAvatarUrlValue(presigned.publicUrl);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to upload avatar image.";
      setSaveError(message);
    } finally {
      setIsUploadingAvatar(false);
      event.target.value = "";
    }
  };

  const handleSave = async () => {
    const trimmedFirstName = firstName.trim();
    if (!trimmedFirstName) {
      setSaveError("First name is required.");
      return;
    }

    const normalizedPhoneNumber = phoneNumberValue.replace(/\D/g, "");
    if (!normalizedPhoneNumber) {
      setSaveError("Phone number is required.");
      return;
    }

    if (!selectedCountryOfBirth || !selectedNationality || !timezoneValue) {
      setSaveError("Country, nationality, and timezone are required.");
      return;
    }

    const nextFullName = `${trimmedFirstName} ${lastName.trim()}`.trim();
    const nextPhoneNumber = `${phoneCountry.dialCode}${normalizedPhoneNumber}`;
    const profilePayload: UpdateMyProfileDto = {};

    if (nextFullName !== fullName) {
      profilePayload.fullName = nextFullName;
    }
    if (timezoneValue !== timezone) {
      profilePayload.timezone = timezoneValue;
    }
    if (selectedCountryOfBirth !== countryOfBirth) {
      profilePayload.countryOfBirth = selectedCountryOfBirth;
    }
    if (selectedNationality !== nationality) {
      profilePayload.nationality = selectedNationality;
    }
    if (avatarUrlValue !== avatarUrl) {
      profilePayload.avatarUrl = avatarUrlValue;
    }

    setSaveError("");

    try {
      if (Object.keys(profilePayload).length > 0) {
        await updateMyProfile.mutateAsync(profilePayload);
      }

      if (nextPhoneNumber !== phoneNumber) {
        await updateMyPhoneNumber.mutateAsync({
          phoneNumber: nextPhoneNumber,
        });
      }

      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error ? error.message : "Failed to save personal information.",
      );
    }
  };

  return (
    <div className="bg-white w-full flex flex-col gap-5 lg:gap-4 lg:px-12 lg:py-8 rounded-t-2xl">

      <input
        ref={avatarInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleAvatarUpload}
      />

      <PersonalInfoHeader 
        isEditing={isEditing}
        isSaving={isSaving}
        setIsEditing={setIsEditing}
        onSave={handleSave}
      />

      <AvatarField src={avatarUrlValue} onClick={isEditing ? handleAvatarClick : undefined} disabled={isSaving} />

      {saveError ? (
        <Typography variant="body-3" color="red-normal">
          {saveError}
        </Typography>
      ) : null}

      {isEditing ? (
        <PersonalInfoEdit
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          phoneNumberValue={phoneNumberValue}
          setPhoneNumberValue={setPhoneNumberValue}
          selectedCountryOfBirth={selectedCountryOfBirth}
          setSelectedCountryOfBirth={setSelectedCountryOfBirth}
          selectedNationality={selectedNationality}
          setSelectedNationality={setSelectedNationality}
          countryOptions={countrySelectOptions}
          phoneCountry={phoneCountry}
          setPhoneCountry={setPhoneCountry}
          emailValue={email}
          isEmailVerified={emailVerified}
          timezone={timezoneValue}
          setTimezone={setTimezoneValue}
          timezoneOptions={timezoneOptions}
          isSaving={isSaving}
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
          email={email}
          timezone={timezoneValue}
        />
      )}

    </div>
  )
}

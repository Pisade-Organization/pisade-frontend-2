import PhoneNumberInput from "@/components/base/PhoneNumberInput";
import BaseInput from "@/components/base/BaseInput";
import BaseSelect from "@/components/base/BaseSelect";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";
import { CountryOption } from "@/data/countryOptions";
import { Check } from "lucide-react";

interface PersonalInfoEditI {
  firstName: string;
  setFirstName: (value: string) => void;
  lastName: string;
  setLastName: (value: string) => void;
  phoneNumberValue: string;
  setPhoneNumberValue: (value: string) => void;
  selectedCountryOfBirth: string;
  setSelectedCountryOfBirth: (value: string) => void;
  selectedNationality: string;
  setSelectedNationality: (value: string) => void;
  countryOptions: { value: string; label: string }[];
  phoneCountry: CountryOption;
  setPhoneCountry: (country: CountryOption) => void;
  emailValue: string;
  isEmailVerified: boolean;
  timezone: string;
  setTimezone: (value: string) => void;
  timezoneOptions: { value: string; label: string }[];
  isSaving?: boolean;
  onSave: () => void;
}

export default function PersonalInfoEdit({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  phoneNumberValue,
  setPhoneNumberValue,
  selectedCountryOfBirth,
  setSelectedCountryOfBirth,
  selectedNationality,
  setSelectedNationality,
  countryOptions,
  phoneCountry,
  setPhoneCountry,
  emailValue,
  isEmailVerified,
  timezone,
  setTimezone,
  timezoneOptions,
  isSaving,
  onSave,
}: PersonalInfoEditI) {
  return (
    <div className="w-full flex flex-col gap-4">

      <div className="w-full flex flex-col gap-4 lg:flex-row">
        <BaseInput 
          title="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        
        <BaseInput 
          title="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Enter your last name"
        />
      </div>

      <div className="w-full flex flex-col gap-3">
        <BaseInput
          title="Email"
          value={emailValue}
          disabled
          readOnly
        />
        {isEmailVerified && (
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-lg">
            <Check className="w-4 h-4 text-green-600" />
            <Typography variant="body-3" color="green-600">
              Your email has been verified
            </Typography>
          </div>
        )}
      </div>

      <div className="w-full flex flex-col gap-4 lg:grid lg:grid-cols-2">
        <BaseSelect
          title="Country of birth"
          options={countryOptions}
          value={selectedCountryOfBirth}
          onChange={(value) => setSelectedCountryOfBirth(value)}
          placeholder="Choose a country"
          required
        />

        <BaseSelect
          title="Nationality"
          options={countryOptions}
          value={selectedNationality}
          onChange={(value) => setSelectedNationality(value)}
          placeholder="Choose a country"
          required
        />

        <PhoneNumberInput
          phoneNumber={phoneNumberValue}
          setPhoneNumber={setPhoneNumberValue}
          country={phoneCountry}
          setCountry={setPhoneCountry}
          required
        />

        <BaseSelect
          title="Timezone"
          options={timezoneOptions}
          value={timezone}
          onChange={(value) => setTimezone(value)}
          placeholder="Choose a timezone"
        />
      </div>


      <BaseButton
        variant="primary"
        onClick={onSave}
        disabled={isSaving}
        className="lg:hidden w-full"
      >
        {isSaving ? "Saving..." : "Save Changes"}
      </BaseButton>
    </div>
  )
}

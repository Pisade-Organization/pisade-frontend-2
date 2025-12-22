import { useState } from "react"
import { z } from "zod"
import Typography from "@/components/base/Typography"
import BaseInput from "@/components/base/BaseInput"

const phoneNumberSchema = z.string()
  .regex(/^[0-9]*$/, "Phone number must contain only numbers")
  .max(10, "Phone number must be at most 10 digits")

export default function PromptPayForm({
  phoneNumber,
  setPhoneNumber
}: {
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}) {
  const [error, setError] = useState<string>("")

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and limit to 10 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 10);
    setPhoneNumber(numericValue);
    
    // Validate with Zod
    const result = phoneNumberSchema.safeParse(numericValue);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid phone number");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    // Remove leading 0 when user finishes typing
    if (phoneNumber.startsWith('0')) {
      const trimmedValue = phoneNumber.substring(1);
      setPhoneNumber(trimmedValue);
      
      // Re-validate after removing leading 0
      const result = phoneNumberSchema.safeParse(trimmedValue);
      if (!result.success) {
        setError(result.error.errors[0]?.message || "Invalid phone number");
      } else {
        setError("");
      }
    }
  };

  return (
    <BaseInput 
      title="Phone number"
      leftIcon={
        <Typography variant="body-2" color="neutral-300">
          +66
        </Typography>
      }
      value={phoneNumber}
      onChange={handlePhoneNumberChange}
      onBlur={handleBlur}
      errorMessage={error}
      state={error ? "error" : "default"}
    />
  )
}
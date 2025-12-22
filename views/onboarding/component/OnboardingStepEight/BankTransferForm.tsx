import { useState } from "react"
import { z } from "zod"
import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import { BANKS_OPTIONS } from "../../data/banks"

const accountNumberSchema = z.string()
  .regex(/^[0-9]*$/, "Account number must contain only numbers")
  .min(8, "Account number must be at least 8 characters")
  .max(17, "Account number must be at most 17 characters")

export default function BankTransferForm({
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber,
}: {
  bankName: string;
  setBankName: (bankName: string) => void;
  accountNumber: string;
  setAccountNumber: (accountNumber: string) => void;
}) {
  const [error, setError] = useState<string>("")

  const handleAccountNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '');
    setAccountNumber(numericValue);
    
    // Validate with Zod
    const result = accountNumberSchema.safeParse(numericValue);
    if (!result.success) {
      setError(result.error.errors[0]?.message || "Invalid account number");
    } else {
      setError("");
    }
  };

  return (
    <>
      <BaseSelect 
        title="Your bank"
        placeholder="Bank name"
        options={BANKS_OPTIONS}
        value={bankName}
        onChange={setBankName}
      />
      <BaseInput 
        title="Account Number"
        placeholder="121-3-56911-9"
        value={accountNumber}
        onChange={handleAccountNumberChange}
        errorMessage={error}
        state={error ? "error" : "default"}
      />
    </>
  )
}
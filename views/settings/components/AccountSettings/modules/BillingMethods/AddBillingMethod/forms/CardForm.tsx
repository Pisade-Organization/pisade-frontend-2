import { useState } from "react"
import { z } from "zod"
import BaseInput from "@/components/base/BaseInput"

const cardholderNameSchema = z.string()
  .regex(/^[A-Za-z\s]*$/, "Cardholder's name can only contain alphabets")
  .min(1, "Cardholder's name is required")

const cardNumberSchema = z.string()
  .regex(/^[0-9]*$/, "Card number must contain only numbers")
  .min(13, "Card number must be at least 13 digits")
  .max(19, "Card number must be at most 19 digits")

const expiredSchema = z.string()
  .regex(/^[0-9]{2}\/[0-9]{2}$/, "Expired date must be in MM/YY format")
  .refine((val) => {
    const [month] = val.split('/')
    const monthNum = parseInt(month, 10)
    return monthNum >= 1 && monthNum <= 12
  }, "Month must be between 01 and 12")

const cvcSchema = z.string()
  .regex(/^[0-9]*$/, "CVC must contain only numbers")
  .min(3, "CVC must be at least 3 digits")
  .max(4, "CVC must be at most 4 digits")

export default function CardForm() {
  const [cardholderName, setCardholderName] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expired, setExpired] = useState("")
  const [cvc, setCvc] = useState("")

  const [cardholderNameError, setCardholderNameError] = useState("")
  const [cardNumberError, setCardNumberError] = useState("")
  const [expiredError, setExpiredError] = useState("")
  const [cvcError, setCvcError] = useState("")

  const handleCardholderNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow alphabets and spaces
    const alphabeticValue = value.replace(/[^A-Za-z\s]/g, '')
    setCardholderName(alphabeticValue)
    
    // Validate with Zod
    const result = cardholderNameSchema.safeParse(alphabeticValue)
    if (!result.success) {
      setCardholderNameError(result.error.issues[0]?.message || "Invalid cardholder name")
    } else {
      setCardholderNameError("")
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers
    const numericValue = value.replace(/[^0-9]/g, '')
    setCardNumber(numericValue)
    
    // Validate with Zod
    const result = cardNumberSchema.safeParse(numericValue)
    if (!result.success) {
      setCardNumberError(result.error.issues[0]?.message || "Invalid card number")
    } else {
      setCardNumberError("")
    }
  }

  const handleExpiredChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Remove all non-numeric characters
    const numericValue = value.replace(/[^0-9]/g, '')
    
    // Format as MM/YY
    let formattedValue = numericValue
    if (numericValue.length >= 2) {
      formattedValue = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4)
    }
    
    // Limit to 4 digits (MM/YY = 5 characters including /)
    if (formattedValue.length > 5) {
      formattedValue = formattedValue.slice(0, 5)
    }
    
    setExpired(formattedValue)
    
    // Validate with Zod
    const result = expiredSchema.safeParse(formattedValue)
    if (!result.success && formattedValue.length === 5) {
      setExpiredError(result.error.issues[0]?.message || "Invalid expired date")
    } else {
      setExpiredError("")
    }
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Only allow numbers, max 4 digits
    const numericValue = value.replace(/[^0-9]/g, '').slice(0, 4)
    setCvc(numericValue)
    
    // Validate with Zod
    const result = cvcSchema.safeParse(numericValue)
    if (!result.success && numericValue.length > 0) {
      setCvcError(result.error.issues[0]?.message || "Invalid CVC")
    } else {
      setCvcError("")
    }
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <BaseInput 
        title="Cardholder's name"
        required
        placeholder="Your name"
        value={cardholderName}
        onChange={handleCardholderNameChange}
        errorMessage={cardholderNameError}
        state={cardholderNameError ? "error" : "default"}
      />

      <BaseInput
        title="Card number"
        required
        placeholder="XXXX XXXX XXXX XXXX"
        value={cardNumber}
        onChange={handleCardNumberChange}
        errorMessage={cardNumberError}
        state={cardNumberError ? "error" : "default"}
      />

      <div className="w-full grid grid-cols-2 gap-3">
        <BaseInput 
          title="Expired"
          required
          placeholder="MM/YY"
          value={expired}
          onChange={handleExpiredChange}
          errorMessage={expiredError}
          state={expiredError ? "error" : "default"}
        />

        <BaseInput 
          title="CVC"
          required
          placeholder="XXX"
          value={cvc}
          onChange={handleCvcChange}
          errorMessage={cvcError}
          state={cvcError ? "error" : "default"}
        />
      </div>
    </div>
  )
}
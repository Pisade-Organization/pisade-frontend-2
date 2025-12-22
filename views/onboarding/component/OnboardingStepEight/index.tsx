"use client"

import { useState, useEffect, useRef } from "react"
import { useStepEight } from "@/hooks/tutors/onboarding/queries/useStepEight"
import { useSaveStepEight } from "@/hooks/tutors/onboarding/mutations/useUpdateStepEight"
import { useOnboardingNavigation } from "../../hooks/useOnboardingNavigation"
import SetPrice from "./SetPrice"
import Commission from "./Commission"
import WithdrawalMethodComponent from "./WithdrawalMethod"
import { WithdrawalMethod } from "../../types/withdrawalMethod.types"
import { WithdrawalMethod as ApiWithdrawalMethod } from "@/services/tutor/onboarding/types"

// Mapping functions between display and API values
const displayToApi: Record<WithdrawalMethod, ApiWithdrawalMethod> = {
  "Prompt Pay": ApiWithdrawalMethod.PROMPTPAY,
  "Bank transfer": ApiWithdrawalMethod.BANK_TRANSFER
}

const apiToDisplay: Record<ApiWithdrawalMethod, WithdrawalMethod> = {
  [ApiWithdrawalMethod.PROMPTPAY]: "Prompt Pay",
  [ApiWithdrawalMethod.BANK_TRANSFER]: "Bank transfer"
}

export default function OnboardingStepEight() {
  const [lessonPrice, setLessonPrice] = useState<string>('')
  const [withdrawalMethod, setWithdrawalMethod] = useState<WithdrawalMethod>('Prompt Pay')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  
  const { data: stepEightData, isLoading } = useStepEight()
  const saveStepEight = useSaveStepEight()
  const { registerStepActions, unregisterStepActions } = useOnboardingNavigation()
  
  // Use refs to access latest values without including them in dependencies
  const saveStepEightRef = useRef(saveStepEight)
  const lessonPriceRef = useRef(lessonPrice)
  const withdrawalMethodRef = useRef(withdrawalMethod)
  const phoneNumberRef = useRef(phoneNumber)
  const bankNameRef = useRef(bankName)
  const accountNumberRef = useRef(accountNumber)
  
  // Keep refs in sync
  useEffect(() => {
    saveStepEightRef.current = saveStepEight
    lessonPriceRef.current = lessonPrice
    withdrawalMethodRef.current = withdrawalMethod
    phoneNumberRef.current = phoneNumber
    bankNameRef.current = bankName
    accountNumberRef.current = accountNumber
  })

  // Load existing data
  useEffect(() => {
    if (stepEightData) {
      // Set lesson price
      if (stepEightData.lessonPrice !== null && stepEightData.lessonPrice !== undefined) {
        setLessonPrice(stepEightData.lessonPrice.toString())
      }
      
      // Set withdrawal method
      if (stepEightData.withdrawalMethod) {
        const apiMethod = stepEightData.withdrawalMethod as ApiWithdrawalMethod
        const displayMethod = apiToDisplay[apiMethod as ApiWithdrawalMethod]
        if (displayMethod) {
          setWithdrawalMethod(displayMethod)
        }
      }
      
      // Set phone number
      if (stepEightData.withdrawalPhoneNumber) {
        setPhoneNumber(stepEightData.withdrawalPhoneNumber)
      }
      
      // Set bank name
      if (stepEightData.bankName) {
        setBankName(stepEightData.bankName)
      }
      
      // Set account number
      if (stepEightData.bankAccountNumber) {
        setAccountNumber(stepEightData.bankAccountNumber)
      }
    }
  }, [stepEightData])

  // Register step actions
  useEffect(() => {
    const validate = async () => {
      // Validate lesson price is provided
      if (!lessonPriceRef.current || lessonPriceRef.current.trim() === '') {
        return false
      }
      
      // Validate withdrawal method specific fields
      if (withdrawalMethodRef.current === "Prompt Pay") {
        // Phone number should be provided and valid (non-empty after removing leading 0)
        const phone = phoneNumberRef.current.trim()
        if (!phone || phone.length === 0) {
          return false
        }
      } else if (withdrawalMethodRef.current === "Bank transfer") {
        // Bank name and account number should be provided
        if (!bankNameRef.current || bankNameRef.current.trim() === '') {
          return false
        }
        if (!accountNumberRef.current || accountNumberRef.current.trim() === '') {
          return false
        }
      }
      
      return true
    }

    const save = async () => {
      const apiWithdrawalMethod = displayToApi[withdrawalMethodRef.current]
      
      const payload: any = {
        lessonPrice: lessonPriceRef.current ? parseInt(lessonPriceRef.current, 10) : undefined,
        withdrawalMethod: apiWithdrawalMethod,
      }
      
      // Add withdrawal method specific fields
      if (apiWithdrawalMethod === ApiWithdrawalMethod.PROMPTPAY) {
        payload.withdrawalPhoneNumber = phoneNumberRef.current || undefined
      } else if (apiWithdrawalMethod === ApiWithdrawalMethod.BANK_TRANSFER) {
        payload.bankName = bankNameRef.current || undefined
        payload.bankAccountNumber = accountNumberRef.current || undefined
      }

      await saveStepEightRef.current.mutateAsync(payload)
    }

    registerStepActions(8, { validate, save })
    return () => {
      unregisterStepActions(8)
    }
  }, [registerStepActions, unregisterStepActions])

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <SetPrice 
        lessonPrice={lessonPrice}
        setLessonPrice={setLessonPrice}
      />
      <WithdrawalMethodComponent 
        withdrawalMethod={withdrawalMethod} 
        setWithdrawalMethod={setWithdrawalMethod}
        phoneNumber={phoneNumber} 
        setPhoneNumber={setPhoneNumber}
        bankName={bankName} 
        setBankName={setBankName}
        accountNumber={accountNumber} 
        setAccountNumber={setAccountNumber}
      />
      <Commission />
    </div>
  )
}
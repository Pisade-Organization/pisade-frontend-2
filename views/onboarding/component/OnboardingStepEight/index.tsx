"use client"

import { useState } from "react"

import SetPrice from "./SetPrice"
import Commission from "./Commission"
import WithdrawalMethodComponent from "./WithdrawalMethod"
import { WithdrawalMethod } from "../../types/withdrawalMethod.types"

export default function OnboardingStepEight() {
  const [withdrawalMethod, setWithdrawalMethod] = useState<WithdrawalMethod>('Prompt Pay')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [bankName, setBankName] = useState<string>('')
  const [accountNumber, setAccountNumber] = useState<string>('')
  return (
    <div className="w-full flex flex-col justify-start items-center gap-1">
      <SetPrice />
      <WithdrawalMethodComponent 
        withdrawalMethod={withdrawalMethod} setWithdrawalMethod={setWithdrawalMethod}
        phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
        bankName={bankName} setBankName={setBankName}
        accountNumber={accountNumber} setAccountNumber={setAccountNumber}
      />
      <Commission />
    </div>
  )
}
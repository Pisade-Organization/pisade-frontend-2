import BaseInput from "@/components/base/BaseInput"
import BaseSelect from "@/components/base/BaseSelect"
import { BANKS_OPTIONS } from "../../data/banks"
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
        onChange={e => setAccountNumber(e.target.value)}
      />
    </>
  )
}
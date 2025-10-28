import WithdrawalChoiceButton from "./WithdrawalChoiceButton"
import Typography from "@/components/base/Typography"
import PromptPayForm from "./PromptPayForm";
import { WithdrawalMethod } from "@/views/onboarding/types/withdrawalMethod.types";
import BankTransferForm from "./BankTransferForm";
export default function WithdrawalMethodComponent({
  withdrawalMethod,
  setWithdrawalMethod,
  phoneNumber,
  setPhoneNumber,
  bankName,
  setBankName,
  accountNumber,
  setAccountNumber
}: {
  withdrawalMethod: WithdrawalMethod;
  setWithdrawalMethod: (withdrawalMethod: WithdrawalMethod) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
  bankName: string;
  setBankName: (bankName: string) => void;
  accountNumber: string;
  setAccountNumber: (accountNumber: string) => void;
}) {
  return (
    <div className="w-full bg-white flex flex-col pt-4 pb-5 lg:py-5 px-4 lg:px-8 gap-5 lg:gap-4">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Select withdrawal method
      </Typography>

      <div className="flex flex-col lg:flex-row gap-4">
        <WithdrawalChoiceButton 
          title="Prompt Pay"
          withdrawalMethod={withdrawalMethod}
          setWithdrawalMethod={setWithdrawalMethod}
        />
        <WithdrawalChoiceButton 
          title="Bank transfer"
          withdrawalMethod={withdrawalMethod}
          setWithdrawalMethod={setWithdrawalMethod}
        />
      </div>

      { withdrawalMethod === "Prompt Pay" && <PromptPayForm phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} /> }
      { withdrawalMethod === "Bank transfer" && <BankTransferForm 
        bankName={bankName} setBankName={setBankName}
        accountNumber={accountNumber} setAccountNumber={setAccountNumber}
      />}
    </div>
  )
}
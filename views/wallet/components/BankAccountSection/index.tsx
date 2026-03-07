import BaseButton from "@/components/base/BaseButton"
import BankAccountCard from "@/views/wallet/components/BankAccountCard"
import Typography from "@/components/base/Typography"
import { Plus } from "lucide-react"
import type { WalletBankAccount } from "@/views/wallet/types"

interface BankAccountSectionProps {
  title: string
  description: string
  bankAccounts: WalletBankAccount[]
  onAddBankAccount?: () => void
}

function normalizeDefault(accounts: WalletBankAccount[]) {
  let hasDefault = false

  return accounts.map((account, index) => {
    if (account.isDefault && !hasDefault) {
      hasDefault = true
      return account
    }

    if (account.isDefault && hasDefault) {
      return { ...account, isDefault: false }
    }

    if (!hasDefault && index === 0) {
      hasDefault = true
      return { ...account, isDefault: true }
    }

    return account
  })
}

export default function BankAccountSection({
  title,
  description,
  bankAccounts,
  onAddBankAccount,
}: BankAccountSectionProps) {
  const accounts = normalizeDefault(bankAccounts)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Typography variant="title-1" color="neutral-800">
          {title}
        </Typography>
        <Typography variant="body-3" color="neutral-400">
          {description}
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        {accounts.length === 0 ? (
          <Typography variant="body-3" color="neutral-500">
            No bank account added yet.
          </Typography>
        ) : (
          accounts.map((account) => <BankAccountCard key={account.id} account={account} />)
        )}

        <BaseButton
          className="w-full justify-start gap-2 px-1 py-2 lg:w-fit"
          variant="secondary"
          typeStyle="borderless"
          textColor="#130148"
          iconLeft={<Plus className="h-4 w-4 text-[#130148]" />}
          onClick={onAddBankAccount}
        >
          Add Bank Account
        </BaseButton>
      </div>
    </section>
  )
}

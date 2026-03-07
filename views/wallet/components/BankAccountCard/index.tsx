import { MastercardIcon } from "@/components/icons/common"
import Typography from "@/components/base/Typography"
import { EllipsisVertical } from "lucide-react"
import type { WalletBankAccount } from "@/views/wallet/types"

interface BankAccountCardProps {
  account: WalletBankAccount
}

export default function BankAccountCard({ account }: BankAccountCardProps) {
  const lastFourDigits = account.lastFourDigits ?? account.accountNumber?.slice(-4) ?? "0000"
  const maskedAccountNumber = `**** **** **** ${lastFourDigits}`

  return (
    <article className="flex flex-col gap-1 border border-neutral-50 bg-white px-4 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Typography variant="label-2" color="neutral-800">
            {account.accountName}
          </Typography>
          {account.isDefault ? (
            <div className="rounded-[4px] bg-electric-violet-25 px-2 py-[2px]">
              <Typography variant="body-4" color="electric-violet-400">
                Default
              </Typography>
            </div>
          ) : null}
        </div>
        <EllipsisVertical className="h-4 w-4 text-neutral-200" />
      </div>

      <div className="flex items-center gap-2">
        <MastercardIcon width={24} height={16} />
        <Typography variant="label-3" color="neutral-700">
          {maskedAccountNumber}
        </Typography>
      </div>
    </article>
  )
}

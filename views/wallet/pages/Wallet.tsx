"use client"

import BalanceCard from "@/views/wallet/components/BalanceCard"
import BankAccountSection from "@/views/wallet/components/BankAccountSection"
import useMediaQuery from "@/hooks/useMediaQuery"
import StudentTopUpSection from "@/views/wallet/components/StudentTopUpSection"
import TransactionList from "@/views/wallet/components/TransactionList"
import TutorWithdrawSection from "@/views/wallet/components/TutorWithdrawSection"
import WalletHeader from "@/views/wallet/components/WalletHeader"
import WalletLayout from "@/views/wallet/components/WalletLayout"
import WalletNavbar from "@/views/wallet/components/WalletNavbar"
import type { WalletBankAccount, WalletPageProps } from "@/views/wallet/types"

export default function WalletPage({ role }: WalletPageProps) {
  const availableBalance = 0
  const temporarilyHold = 0
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const bankAccounts: WalletBankAccount[] = [
    {
      id: "bank-1",
      accountName: "Tran Huyen",
      lastFourDigits: "3761",
      isDefault: true,
    },
    {
      id: "bank-2",
      accountName: "Tran Huyen",
      lastFourDigits: "3761",
      isDefault: false,
    },
  ]

  return (
    <>
      <WalletNavbar role={role} />
      <WalletLayout>
        {isDesktop ? (
          <div className="flex flex-col gap-4">
            <WalletHeader />
            <BalanceCard
              availableBalance={availableBalance}
              temporarilyHold={temporarilyHold}
              role={role}
            />
          </div>
        ) : (
          <>
            <div>
              <WalletHeader />
            </div>
            <div>
              <BalanceCard
                availableBalance={availableBalance}
                temporarilyHold={temporarilyHold}
                role={role}
              />
            </div>
          </>
        )}
        <BankAccountSection
          title="Bank Account"
          description="Add a bank account to send and receive payments directly in the app."
          bankAccounts={bankAccounts}
        />
        {role === "student" ? <StudentTopUpSection /> : <TutorWithdrawSection />}
        <TransactionList />
      </WalletLayout>
    </>
  )
}

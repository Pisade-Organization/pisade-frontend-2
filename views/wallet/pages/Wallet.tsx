"use client"

import Typography from "@/components/base/Typography"
import BalanceCard from "@/views/wallet/components/BalanceCard"
import BankAccountSection from "@/views/wallet/components/BankAccountSection"
import HeldFundsSection from "@/views/wallet/components/HeldFundsSection"
import TransactionHistorySection from "@/views/wallet/components/TransactionHistorySection"
import Footer from "@/components/footer/Footer"
import useMediaQuery from "@/hooks/useMediaQuery"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import StudentTopUpSection from "@/views/wallet/components/StudentTopUpSection"
import TransactionList from "@/views/wallet/components/TransactionList"
import TutorWithdrawSection from "@/views/wallet/components/TutorWithdrawSection"
import WalletHeader from "@/views/wallet/components/WalletHeader"
import WalletLayout from "@/views/wallet/components/WalletLayout"
import WalletNavbar from "@/views/wallet/components/WalletNavbar"
import type { WalletBankAccount, WalletPageProps } from "@/views/wallet/types"

type MobileWalletSection = "overview" | "held-funds" | "transaction-history"

export default function WalletPage({ role }: WalletPageProps) {
  const availableBalance = 0
  const temporarilyHold = 0
  const isDesktop = useMediaQuery("(min-width: 1024px)")
  const [activeMobileSection, setActiveMobileSection] = useState<MobileWalletSection>("overview")
  const [isStudentTopUpOpen, setIsStudentTopUpOpen] = useState(false)
  const [isTutorWithdrawOpen, setIsTutorWithdrawOpen] = useState(false)
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

  const isMobileDetailView = !isDesktop && activeMobileSection !== "overview"
  const mobileDetailTitle =
    activeMobileSection === "held-funds" ? "Held Funds" : "Transaction history"
  const handleBalanceCtaClick = () => {
    if (role === "student") {
      setIsStudentTopUpOpen(true)
      return
    }

    setIsTutorWithdrawOpen(true)
  }

  return (
    <>
      {!isMobileDetailView ? <WalletNavbar role={role} /> : null}
      <WalletLayout>
        {isMobileDetailView ? (
          <>
            <div className="flex items-center gap-[10px] border-b border-[#F5F5F5]/20 px-4 py-3">
              <button
                type="button"
                onClick={() => setActiveMobileSection("overview")}
                aria-label="Back to wallet overview"
              >
                <ChevronLeft className="h-6 w-6 text-neutral-700" />
              </button>
              <Typography variant="title-1" color="neutral-900">
                {mobileDetailTitle}
              </Typography>
            </div>

            {activeMobileSection === "held-funds" ? (
              <HeldFundsSection isMobileDetailView />
            ) : (
              <TransactionHistorySection isMobileDetailView />
            )}
          </>
        ) : (
          <>
            {isDesktop ? (
              <div className="flex flex-col gap-4">
                <WalletHeader />
                <BalanceCard
                  availableBalance={availableBalance}
                  temporarilyHold={temporarilyHold}
                  role={role}
                  onCtaClick={handleBalanceCtaClick}
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
                    onCtaClick={handleBalanceCtaClick}
                  />
                </div>
              </>
            )}
            <BankAccountSection
              title="Bank Account"
              description="Add a bank account to send and receive payments directly in the app."
              bankAccounts={bankAccounts}
            />
            <HeldFundsSection
              onRequestMobileViewAll={() => setActiveMobileSection("held-funds")}
            />
            <TransactionHistorySection
              onRequestMobileViewAll={() => setActiveMobileSection("transaction-history")}
            />
            {role === "student" ? (
              <StudentTopUpSection
                open={isStudentTopUpOpen}
                onOpenChange={setIsStudentTopUpOpen}
              />
            ) : (
              <TutorWithdrawSection
                open={isTutorWithdrawOpen}
                onOpenChange={setIsTutorWithdrawOpen}
              />
            )}
            <TransactionList />
          </>
        )}
      </WalletLayout>
      {!isMobileDetailView ? <Footer /> : null}
    </>
  )
}

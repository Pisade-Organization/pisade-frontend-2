"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import BillingMethodsHeader from "./BillingMethodsHeader"
import {
  useCreateTutorPayoutAccountDashboardLink,
  useCreateTutorPayoutAccountOnboardingLink,
} from "@/hooks/settings/mutations"
import { useTutorPayoutAccount } from "@/hooks/settings/queries"
import { RefreshCcw, ShieldCheck, University } from "lucide-react"

function formatRequirement(requirement: string) {
  return requirement
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ")
}

export default function BillingMethods() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const pathname = usePathname()
  const payoutAccountQuery = useTutorPayoutAccount()
  const onboardingLinkMutation = useCreateTutorPayoutAccountOnboardingLink()
  const dashboardLinkMutation = useCreateTutorPayoutAccountDashboardLink()

  const payoutAccount = payoutAccountQuery.data
  const isConnected = payoutAccount?.isConnected ?? false
  const isReadyForWithdrawals = payoutAccount?.payoutsEnabled ?? false
  const locale = pathname?.split("/")[1]

  const handleConnect = async () => {
    setErrorMessage(null)

    try {
      const result = await onboardingLinkMutation.mutateAsync({ locale })
      window.location.assign(result.url)
    } catch {
      setErrorMessage("Unable to open Stripe onboarding right now.")
    }
  }

  const handleManage = async () => {
    setErrorMessage(null)

    try {
      const result = await dashboardLinkMutation.mutateAsync()
      window.open(result.url, "_blank", "noopener,noreferrer")
    } catch {
      setErrorMessage("Unable to open the Stripe payout dashboard right now.")
    }
  }

  return (
    <div className="bg-white w-full flex flex-col gap-4 lg:py-8 lg:px-12 rounded-2xl">
      <BillingMethodsHeader />

      <section className="rounded-2xl border border-neutral-50 p-4 lg:p-5 flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-electric-violet-400" />
              <Typography variant={{ base: "label-2", lg: "title-2" }} color="neutral-800">
                Stripe Payout Account
              </Typography>
            </div>

            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-500">
              Tutors connect a Stripe Express account for real payout methods and withdrawal
              verification.
            </Typography>
          </div>

          <div className="flex flex-wrap gap-2">
            <BaseButton
              type="button"
              variant="secondary"
              typeStyle="outline"
              onClick={() => payoutAccountQuery.refetch()}
              disabled={payoutAccountQuery.isFetching}
              iconLeft={<RefreshCcw className="h-4 w-4" />}
            >
              Refresh
            </BaseButton>

            {!isConnected ? (
              <BaseButton
                type="button"
                variant="secondary"
                onClick={handleConnect}
                disabled={onboardingLinkMutation.isPending}
              >
                Connect Stripe
              </BaseButton>
            ) : (
              <BaseButton
                type="button"
                variant="secondary"
                onClick={handleManage}
                disabled={dashboardLinkMutation.isPending}
              >
                Manage in Stripe
              </BaseButton>
            )}
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-xl bg-red-50 px-4 py-3">
            <Typography variant={{ base: "body-3" }} color="red-normal">
              {errorMessage}
            </Typography>
          </div>
        ) : null}

        {payoutAccountQuery.isLoading ? (
          <Typography variant={{ base: "body-3" }} color="neutral-500">
            Loading payout account details...
          </Typography>
        ) : null}

        {!payoutAccountQuery.isLoading && payoutAccount ? (
          <>
            <div className="grid gap-3 lg:grid-cols-3">
              <div className="rounded-xl bg-neutral-25 px-4 py-3">
                <Typography variant={{ base: "body-4" }} color="neutral-400">
                  Connection
                </Typography>
                <Typography variant={{ base: "label-2" }} color="neutral-800">
                  {isConnected ? "Connected" : "Not connected"}
                </Typography>
              </div>

              <div className="rounded-xl bg-neutral-25 px-4 py-3">
                <Typography variant={{ base: "body-4" }} color="neutral-400">
                  Details Submitted
                </Typography>
                <Typography variant={{ base: "label-2" }} color="neutral-800">
                  {payoutAccount.detailsSubmitted ? "Yes" : "No"}
                </Typography>
              </div>

              <div className="rounded-xl bg-neutral-25 px-4 py-3">
                <Typography variant={{ base: "body-4" }} color="neutral-400">
                  Withdrawals
                </Typography>
                <Typography variant={{ base: "label-2" }} color="neutral-800">
                  {isReadyForWithdrawals ? "Enabled" : "Blocked"}
                </Typography>
              </div>
            </div>

            {payoutAccount.requirementsDue.length > 0 ? (
              <div className="rounded-xl bg-amber-50 px-4 py-3 flex flex-col gap-2">
                <Typography variant={{ base: "label-3" }} color="neutral-800">
                  Stripe still needs:
                </Typography>

                <div className="flex flex-wrap gap-2">
                  {payoutAccount.requirementsDue.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-white px-3 py-1 text-body-4 text-neutral-700 border border-amber-200"
                    >
                      {formatRequirement(item)}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-3">
              <Typography variant={{ base: "label-2", lg: "label-1" }} color="neutral-800">
                Payout Methods
              </Typography>

              {payoutAccount.externalAccounts.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-100 px-4 py-5">
                  <Typography variant={{ base: "body-3" }} color="neutral-500">
                    No bank account is visible yet. Finish Stripe onboarding and add a payout bank
                    account there.
                  </Typography>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {payoutAccount.externalAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="rounded-xl border border-neutral-50 px-4 py-3 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-electric-violet-25 p-2">
                          <University className="h-4 w-4 text-electric-violet-400" />
                        </div>

                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Typography variant={{ base: "label-3", lg: "label-2" }} color="neutral-800">
                              {account.bankName || "Bank account"}
                            </Typography>
                            {account.isDefault ? (
                              <span className="rounded-[4px] bg-electric-violet-25 px-2 py-[2px] text-body-4 text-electric-violet-400">
                                Default
                              </span>
                            ) : null}
                          </div>

                          <Typography variant={{ base: "body-4", lg: "body-3" }} color="neutral-500">
                            •••• {account.last4 || "----"} {account.currency?.toUpperCase() || ""}
                          </Typography>
                        </div>
                      </div>

                      <Typography variant={{ base: "body-4" }} color="neutral-400">
                        {account.status || "pending"}
                      </Typography>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : null}
      </section>
    </div>
  )
}

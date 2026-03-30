"use client"

import BaseButton from "@/components/base/BaseButton"
import Typography from "@/components/base/Typography"
import OnboardingStepEight from "@/views/onboarding/component/OnboardingStepEight"
import OnboardingStepFive from "@/views/onboarding/component/OnboardingStepFive"
import OnboardingStepFour from "@/views/onboarding/component/OnboardingStepFour"
import OnboardingStepNine from "@/views/onboarding/component/OnboardingStepNine"
import OnboardingStepSix from "@/views/onboarding/component/OnboardingStepSix"
import OnboardingStepThree from "@/views/onboarding/component/OnboardingStepThree"
import { OnboardingProvider } from "@/views/onboarding/context/OnboardingProvider"
import { useOnboardingNavigation } from "@/views/onboarding/hooks/useOnboardingNavigation"
import { AlertCircle, BadgeCheck, Clock3, ShieldCheck } from "lucide-react"
import { useSession } from "next-auth/react"
import { type ReactNode } from "react"

function getVerificationStatus(onboardingStatus?: string) {
  if (onboardingStatus === "APPROVED") {
    return {
      label: "Verified",
      tone: "text-green-700 bg-green-50 border-green-100",
      Icon: BadgeCheck,
      description: "These sections contain the onboarding data used to approve your tutor profile.",
    }
  }

  if (onboardingStatus === "REVIEWING") {
    return {
      label: "Pending review",
      tone: "text-amber-700 bg-amber-50 border-amber-100",
      Icon: Clock3,
      description: "Your onboarding details are currently under review.",
    }
  }

  return {
    label: "Not verified",
    tone: "text-neutral-700 bg-neutral-50 border-neutral-100",
    Icon: AlertCircle,
    description: "Complete these sections to prepare your tutor profile for review.",
  }
}

function EmbeddedStepSection({
  step,
  title,
  description,
  children,
}: {
  step: number
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <OnboardingProvider initialStep={step} totalSteps={step + 1}>
      <EmbeddedStepSectionContent step={step} title={title} description={description}>
        {children}
      </EmbeddedStepSectionContent>
    </OnboardingProvider>
  )
}

function EmbeddedStepSectionContent({
  step,
  title,
  description,
  children,
}: {
  step: number
  title: string
  description: string
  children: ReactNode
}) {
  const { performContinue, setStep, isBusy, canContinue } = useOnboardingNavigation()

  const handleSave = async () => {
    try {
      await performContinue()
    } catch {
      // Individual step components handle their own error states.
    }

    setStep(step)
  }

  return (
    <section className="rounded-2xl bg-white px-4 py-5 lg:px-8 lg:py-6">
      <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex flex-col gap-1">
          <Typography variant={{ base: "headline-3", lg: "headline-5" }} color="neutral-900">
            {title}
          </Typography>
          <Typography variant="body-3" color="neutral-500" className="max-w-[720px]">
            {description}
          </Typography>
        </div>

        <BaseButton
          variant="secondary"
          onClick={handleSave}
          disabled={isBusy || !canContinue}
        >
          {isBusy ? "Saving..." : "Save section"}
        </BaseButton>
      </div>

      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  )
}

export default function IdentityVerification() {
  const { data: session } = useSession()
  const status = getVerificationStatus(session?.user?.onboardingStatus)

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full rounded-2xl border border-neutral-100 bg-white px-4 py-5 lg:px-12 lg:py-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 ${status.tone}`}>
              <status.Icon className="h-4 w-4" />
              <Typography variant="label-3" className="!text-current">
                {status.label}
              </Typography>
            </div>

            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-deep-royal-indigo-700" />
              <Typography variant={{ base: "headline-3", lg: "headline-5" }} color="neutral-900">
                Identity Verification
              </Typography>
            </div>

            <Typography variant="body-3" color="neutral-500" className="max-w-[720px]">
              {status.description} This page keeps all approval-sensitive onboarding sections in one place. General profile settings stay in the `General` tab, and availability is managed separately.
            </Typography>
          </div>

          <div className="rounded-2xl bg-neutral-25 p-4 lg:max-w-[320px]">
            <Typography variant="label-2" color="neutral-800">
              Included here
            </Typography>
            <Typography variant="body-3" color="neutral-500" className="mt-2">
              Certifications, education, tutor profile, intro video, pricing and payout, and identity documents.
            </Typography>
          </div>
        </div>
      </div>

      <EmbeddedStepSection
        step={3}
        title="Certifications"
        description="Update teaching certificates and supporting credentials."
      >
        <OnboardingStepThree />
      </EmbeddedStepSection>

      <EmbeddedStepSection
        step={4}
        title="Education"
        description="Update diploma and education records used in onboarding."
      >
        <OnboardingStepFour />
      </EmbeddedStepSection>

      <EmbeddedStepSection
        step={5}
        title="Tutor Profile"
        description="Edit your profile copy, teaching experience, and motivation text."
      >
        <OnboardingStepFive />
      </EmbeddedStepSection>

      <EmbeddedStepSection
        step={6}
        title="Intro Video"
        description="Manage your intro video, external video link, and thumbnail."
      >
        <OnboardingStepSix />
      </EmbeddedStepSection>

      <EmbeddedStepSection
        step={8}
        title="Pricing & Payout"
        description="Set your lesson pricing and withdrawal details."
      >
        <OnboardingStepEight />
      </EmbeddedStepSection>

      <EmbeddedStepSection
        step={9}
        title="Identity Documents"
        description="Upload and update the documents used to verify your identity."
      >
        <OnboardingStepNine />
      </EmbeddedStepSection>
    </div>
  )
}

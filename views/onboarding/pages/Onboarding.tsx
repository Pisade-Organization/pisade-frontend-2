"use client"
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../component/Navbar";
import ProgressBar from "../component/ProgressBar";
import OnboardingStepHeader from "../component/OnboardingStepHeader";
import ActionButtonsFooter from "../component/ActionButtonsFooter";
import { OnboardingProvider } from "../context/OnboardingProvider";
import { useOnboardingNavigation } from "../hooks/useOnboardingNavigation";

const Step1 = dynamic(() => import("../component/OnboardingStepOne"), { ssr: false })
const Step2 = dynamic(() => import("../component/OnboardingStepTwo"), { ssr: false })
const Step3 = dynamic(() => import("../component/OnboardingStepThree"), { ssr: false })
const Step4 = dynamic(() => import("../component/OnboardingStepFour"), { ssr: false })
const Step5 = dynamic(() => import("../component/OnboardingStepFive"), { ssr: false })
const Step6 = dynamic(() => import("../component/OnboardingStepSix"), { ssr: false })
const Step7 = dynamic(() => import("../component/OnboardingStepSeven"), { ssr: false })
const Step8 = dynamic(() => import("../component/OnboardingStepEight"), { ssr: false })
const Step9 = dynamic(() => import("../component/OnboardingStepNine"), { ssr: false })

const Steps: Record<number, React.ComponentType<any> | undefined> = {
  1: Step1,
  2: Step2,
  3: Step3,
  4: Step4,
  5: Step5,
  6: Step6,
  7: Step7,
  8: Step8,
  9: Step9,
}

function OnboardingContent() {
  const { step, direction } = useOnboardingNavigation()

  const SlideVariants = {
    enter: (direction: 'increasing' | 'decreasing') => ({
      x: direction === 'increasing' ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: 'increasing' | 'decreasing') => ({
      x: direction === 'increasing' ? -100 : 100,
      opacity: 0
    })
  };

  return(
    <div className="min-h-screen bg-[#F9F7FB]">
      <Navbar />
      <ProgressBar step={step} />
      <div className="w-full flex justify-center items-start">
        <div className="w-full max-w-[800px]  flex flex-col justify-center items-start py-8 gap-[28px]">
          <OnboardingStepHeader step={step} />
          <div className="w-full relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`step-${step}`}
                custom={direction}
                variants={SlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {(() => {
                  const Component = Steps[step]
                  return Component ? <Component /> : null
                })()}
              </motion.div>
            </AnimatePresence>
          </div>
          <ActionButtonsFooter />
        </div>
      </div>
    </div>
  )
}

export default function OnboardingPage() {
  return (
    <OnboardingProvider>
      <OnboardingContent />
    </OnboardingProvider>
  )
}

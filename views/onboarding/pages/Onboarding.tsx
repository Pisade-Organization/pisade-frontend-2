"use client"
import { useState } from "react";

import Navbar from "../component/Navbar";
import ProgressBar from "../component/ProgressBar";
import OnboardingStepHeader from "../component/OnboardingStepHeader";
import ActionButtonsFooter from "../component/ActionButtonsFooter";
import OnboardingStepOne from "../component/OnboardingStepOne";
import OnboardingStepTwo from "../component/OnboardingStepTwo";
import OnboardingStepThree from "../component/OnboardingStepThree";
import OnboardingStepFive from "../component/OnboardingStepFive";
export default function OnboardingPage() {
  
  const [step, setStep] = useState<number>(1);
  return(
    <div className="min-h-screen bg-[#F9F7FB]">
      <Navbar />
      <ProgressBar step={1} />
      <div className="w-full flex justify-center items-start">
        <div className="w-full max-w-[800px]  flex flex-col justify-center items-start py-8 gap-[28px]">
          <OnboardingStepHeader step={step} />
          { step === 1 && <OnboardingStepOne />}
          { step === 2 && <OnboardingStepTwo />}
          { step === 3 && <OnboardingStepThree />}

          { step === 5 && <OnboardingStepFive />}
          <ActionButtonsFooter step={step} setStep={setStep} />
        </div>
      </div>
    </div>
  )
}

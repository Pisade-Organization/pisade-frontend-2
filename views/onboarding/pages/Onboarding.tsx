"use client"
import { useState } from "react";

import Navbar from "../component/Navbar";
import ProgressBar from "../component/ProgressBar";
import OnboardingStepHeader from "../component/OnboardingStepHeader";
import FormLayout from "../component/FormLayout";
import Step1 from "../component/Step1";
export default function OnboardingPage() {
  
  const [step, setStep] = useState<number>(1);
  return(
    <div className="min-h-screen bg-[#F9F7FB]">
      <Navbar />
      <ProgressBar step={1} />
      <div className="w-full flex flex-col justify-center items-center py-8 lg:px-80 gap-[28px]">
        <OnboardingStepHeader step={step} />
          <FormLayout>
            <Step1 />
          </FormLayout>
      </div>
    </div>
  )
}

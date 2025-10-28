"use client"
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../component/Navbar";
import ProgressBar from "../component/ProgressBar";
import OnboardingStepHeader from "../component/OnboardingStepHeader";
import ActionButtonsFooter from "../component/ActionButtonsFooter";
import OnboardingStepOne from "../component/OnboardingStepOne";
import OnboardingStepTwo from "../component/OnboardingStepTwo";
import OnboardingStepThree from "../component/OnboardingStepThree";
import OnboardingStepFive from "../component/OnboardingStepFive";
import OnboardingStepSix from "../component/OnboardingStepSix";
import OnboardingStepSeven from "../component/OnboardingStepSeven";
import OnboardingStepEight from "../component/OnboardingStepEight";

export default function OnboardingPage() {
  const [step, setStep] = useState<number>(1);
  const [direction, setDirection] = useState<'increasing' | 'decreasing'>('increasing');

  const updateStep = (newStep: number) => {
    setDirection(newStep > step ? 'increasing' : 'decreasing');
    setStep(newStep);
  };

  const slideVariants = {
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
              {step === 1 && (
                <motion.div
                  key="step-1"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepOne />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepTwo />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepThree />
                </motion.div>
              )}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepFive />
                </motion.div>
              )}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepSix />
                </motion.div>
              )}
              {step === 7 && (
                <motion.div
                  key="step-7"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepSeven />
                </motion.div>
              )}
              {step === 8 && (
                <motion.div
                  key="step-8"
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <OnboardingStepEight />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <ActionButtonsFooter step={step} setStep={updateStep} />
        </div>
      </div>
    </div>
  )
}

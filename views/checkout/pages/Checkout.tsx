"use client";

import { useState } from "react";
import CheckoutMobileHeader from "../components/CheckoutMobileHeader";
import TutorSummary from "../components/BookingSummary/TutorSummary/ index";
import CancellationNotice from "../components/BookingSummary/CancellationNotice";
import LessonInfo from "../components/BookingSummary/LessonInfo";
import CheckoutInfo from "../components/BookingSummary/CheckoutInfo";
import GuaranteeNotice from "../components/BookingSummary/GuaranteeNotice";
import PaymentMethodSelector, { PAYMENT_METHODS } from "../components/PaymentDetailsSection/PaymentMethodSelector";
import PaymentMethodSelectorHeader from "../components/PaymentDetailsSection/PaymentMethodSelectorHeader";
import Navbar from "@/components/Navbar";
import SaveThisMethodSelect from "../components/SaveThisMethodSelect";
import PaymentConfirmationNotice from "../components/PaymentConfirmationNotice";
import PayButton from "../components/PayButton";
import type { PaymentMethodSelectorI } from "../components/PaymentDetailsSection/PaymentMethodSelector/types";

type PaymentMethod = PaymentMethodSelectorI["method"];

export default function Checkout() {
  // Mock data based on the design
  const cancellationDeadline = new Date("2024-10-16T09:00:00");
  const lessonDate = new Date("2024-09-07T18:00:00"); // September 7, Friday, 6PM
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("CARD");

  return (
    <>
      {/* Mobile Header - only visible on mobile */}
      <div className="lg:hidden">
        <CheckoutMobileHeader />
      </div>
      
      {/* Desktop Navbar - only visible on desktop */}
      <div className="hidden lg:block">
        <Navbar variant="student_dashboard" />
      </div>

      {/* Main Content Container */}
      <div className="w-full py-2 px-4 lg:py-8 lg:px-20">
        <div className="w-full flex flex-col lg:flex-row lg:gap-10">
          {/* Left Column - Booking Summary */}
          <div className="w-full lg:max-w-[343px] lg:flex-1 flex flex-col gap-5 py-2 px-4 lg:p-6 lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
            <TutorSummary 
              tutorName="Alana Somchai Degrey"
              countryUrl="https://flagcdn.com/w40/th.png"
              avatarUrl="https://t4.ftcdn.net/jpg/03/83/25/83/360_F_383258331_D8imaEMl8Q3lf7EKU2Pi78Cn0R7KkW9o.jpg"
              subject="Physic • English"
              rating={4.5}
              studentsCount={20}
              lessonsCount={200}
            />
            <CancellationNotice deadline={cancellationDeadline} />
            <LessonInfo 
              lessonName="English TEFL Lesson (50-min lessons)"
              date={lessonDate}
              startTime="18:00"
              endTime="21:00"
              timezone="Etc/GMT+11"
            />
            <div className="w-full border-t border-neutral-100"/>
            <CheckoutInfo 
              lessonPrice={20.00}
              processingFee={0.30}
              total={20.00}
            />
            <GuaranteeNotice />
          </div>

          {/* Mobile Divider - only visible on mobile */}
          <div className="w-screen border-t border-neutral-100 lg:hidden" />

          {/* Right Column - Payment Details */}
          <div className="w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 pb-24 lg:pb-6 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white">
            <PaymentMethodSelectorHeader />
            <PaymentMethodSelector
              selectedMethod={selectedPaymentMethod}
              onMethodChange={setSelectedPaymentMethod}
            />
            <SaveThisMethodSelect />
            <PaymentConfirmationNotice totalAmount={20.00} />
            <PayButton paymentMethod={PAYMENT_METHODS[selectedPaymentMethod]} />
          </div>
        </div>
      </div>
    </>
  )
}
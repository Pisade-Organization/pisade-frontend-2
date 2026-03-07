"use client";

import { useState } from "react";
import FormHeader from "./FormHeader";
import ReasonList from "./ReasonList";
import type { CancelReason } from "./ReasonList/types";
import BaseButton from "@/components/base/BaseButton";

interface CancelClassReasonFormProps {
  onSubmit: (reason: CancelReason) => void;
  isSubmitting?: boolean;
  errorMessage?: string;
}

export default function CancelClassReasonForm({
  onSubmit,
  isSubmitting,
  errorMessage,
}: CancelClassReasonFormProps) {
  const [selectedReason, setSelectedReason] = useState<CancelReason | null>(null);

  const handleSubmit = () => {
    if (!selectedReason) return;
    onSubmit(selectedReason);
  };

  return (
    <div className="w-full flex flex-col gap-6 lg:pt-8 lg:pb-9 lg:px-9 lg:rounded-2xl lg:border border-neutral-50">
      <FormHeader
        title="Reasons for cancelling a class"
        subtitle="We're sorry to see you go. Please let us know why you need to cancel so we can improve our service."
      />
      <ReasonList
        selectedReason={selectedReason}
        onSelectReason={setSelectedReason}
        disabled={isSubmitting}
      />

      {errorMessage ? <p className="text-sm text-red-500">{errorMessage}</p> : null}

      <BaseButton
        className="w-full"
        onClick={handleSubmit}
        disabled={!selectedReason || isSubmitting}
      >
        {isSubmitting ? "Cancelling..." : "Confirm cancellation"}
      </BaseButton>
    </div>
  );
}

"use client";

import { useState } from "react";
import FormHeader from "./FormHeader";
import ReasonList from "./ReasonList";
import type { CancelReason } from "./ReasonList/types";

export default function CancelClassReasonForm() {
  const [selectedReason, setSelectedReason] = useState<CancelReason | null>(null);

  return (
    <div className="w-full flex flex-col gap-6 lg:pt-8 lg:pb-9 lg:px-9 lg:rounded-2xl lg:border border-neutral-50">
      <FormHeader
        title="Reasons for cancelling a class"
        subtitle="We're sorry to see you go. Please let us know why you need to cancel so we can improve our service."
      />
      <ReasonList
        selectedReason={selectedReason}
        onSelectReason={setSelectedReason}
      />
    </div>
  );
}
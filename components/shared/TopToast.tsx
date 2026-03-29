"use client";

import { X } from "lucide-react";

type TopToastTone = "error" | "info";

interface TopToastProps {
  message: string;
  tone?: TopToastTone;
  onClose: () => void;
}

const toneClasses: Record<TopToastTone, string> = {
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-sky-200 bg-sky-50 text-sky-900",
};

export default function TopToast({
  message,
  tone = "error",
  onClose,
}: TopToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex justify-center px-4">
      <div
        className={`pointer-events-auto flex w-full max-w-xl items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg ${toneClasses[tone]}`}
        role="alert"
        aria-live="polite"
      >
        <p className="flex-1 text-sm font-medium leading-6">{message}</p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-1 transition-opacity hover:opacity-70"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

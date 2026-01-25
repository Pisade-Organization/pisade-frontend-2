import Typography from "@/components/base/Typography";

import { X } from "lucide-react";
import { ArrowLeft } from "lucide-react";

interface PageNavigationHeaderProps {
  title: string;
  variant: 'mobile' | 'desktop';
  onBack?: () => void; // desktop
  onClose?: () => void; // mobile
}

export function PageNavigationHeader({
  title,
  variant,
  onBack,
  onClose
}: PageNavigationHeaderProps) {
  return (
    <div className="w-full flex justify-between lg:justify-start items-center py-3 lg:py-0 lg:gap-5">
      
      {variant === 'desktop' && onBack && (
        <button onClick={onBack} aria-label="Go back" className="w-11 h-11 rounded-full p-2 border border-deep-royal-indigo-700 flex justify-center items-center">
          <ArrowLeft size={20} className="text-deep-royal-indigo-700" />
        </button>
      )}

      <Typography variant={{ base: "headline-5", lg: "headline-4" }} color="neutral-900">
        { title }
      </Typography>

      {variant === 'mobile' && onClose && (
        <button onClick={onClose} aria-label="Close" className="w-11 h-11 flex justify-center items-center">
          <X size={20} className="text-neutral-700"/>
        </button>
      )}
    </div>
  )
}
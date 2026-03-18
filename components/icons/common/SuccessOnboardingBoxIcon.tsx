import React from "react"
import Image from "next/image"

interface SuccessOnboardingBoxIconProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function SuccessOnboardingBoxIcon({
  width = 200,
  height = 200,
  className = "",
  alt = "Onboarding success box icon",
}: SuccessOnboardingBoxIconProps) {
  return (
    <Image
      src="/icons/common/success-onboarding-box.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

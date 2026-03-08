import React from "react"
import Image from "next/image"

interface SecurePaymentIconProps {
  width?: number
  height?: number
  className?: string
  alt?: string
}

export default function SecurePaymentIcon({
  width = 62,
  height = 78,
  className = "",
  alt = "Secure payment icon",
}: SecurePaymentIconProps) {
  return (
    <Image
      src="/icons/common/secure-payment.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  )
}

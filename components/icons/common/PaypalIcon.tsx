import React from 'react';
import Image from 'next/image';

interface PaypalIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function PaypalIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'PayPal icon' 
}: PaypalIconProps) {
  return (
    <Image
      src="/icons/common/paypal.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


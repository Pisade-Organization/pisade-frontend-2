import React from 'react';
import Image from 'next/image';

interface ApplePayIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function ApplePayIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Apple Pay icon' 
}: ApplePayIconProps) {
  return (
    <div className={`bg-white ${className}`}>
      <Image
        src="/icons/common/apple-pay.svg"
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}


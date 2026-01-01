import React from 'react';
import Image from 'next/image';

interface MastercardIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function MastercardIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Mastercard icon' 
}: MastercardIconProps) {
  return (
    <Image
      src="/icons/common/mastercard.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


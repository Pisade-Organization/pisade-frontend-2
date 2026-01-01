import React from 'react';
import Image from 'next/image';

interface VisaIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function VisaIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Visa icon' 
}: VisaIconProps) {
  return (
    <Image
      src="/icons/common/visa.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


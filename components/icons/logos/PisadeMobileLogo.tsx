import React from 'react';
import Image from 'next/image';

interface PisadeMobileLogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function PisadeMobileLogo({ 
  width = 109, 
  height = 36, 
  className = '', 
  alt = 'Pisade Mobile Logo' 
}: PisadeMobileLogoProps) {
  return (
    <Image
      src="/logos/pisade-mobile.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}

import React from 'react';
import Image from 'next/image';

interface PisadeDarkLogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

export default function PisadeDarkLogo({ 
  width = 109, 
  height = 36, 
  className = '', 
  alt = 'Pisade Dark Logo',
  onClick
}: PisadeDarkLogoProps) {
  return (
    <Image
      src="/logos/pisade-dark.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
      onClick={onClick}
    />
  );
}

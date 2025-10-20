import React from 'react';
import Image from 'next/image';

interface PisadeLogoProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  onClick?: () => void;
}

export default function PisadeLogo({ 
  width = 109, 
  height = 36, 
  className = '', 
  alt = 'Pisade Logo',
  onClick
}: PisadeLogoProps) {
  return (
    <Image
      src="/logos/pisade.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority
      onClick={onClick}
    />
  );
}

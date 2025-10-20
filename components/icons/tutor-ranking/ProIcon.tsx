import React from 'react';
import Image from 'next/image';

interface ProIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function ProIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Pro ranking icon' 
}: ProIconProps) {
  return (
    <Image
      src="/icons/tutor-ranking/PRO.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

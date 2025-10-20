import React from 'react';
import Image from 'next/image';

interface StarterIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function StarterIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Starter ranking icon' 
}: StarterIconProps) {
  return (
    <Image
      src="/icons/tutor-ranking/STARTER.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

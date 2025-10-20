import React from 'react';
import Image from 'next/image';

interface MasterIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function MasterIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Master ranking icon' 
}: MasterIconProps) {
  return (
    <Image
      src="/icons/tutor-ranking/MASTER.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

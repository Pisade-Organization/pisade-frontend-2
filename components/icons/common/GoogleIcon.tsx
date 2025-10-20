import React from 'react';
import Image from 'next/image';

interface GoogleIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function GoogleIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Google icon' 
}: GoogleIconProps) {
  return (
    <Image
      src="/icons/common/google.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

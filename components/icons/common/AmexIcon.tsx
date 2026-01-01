import React from 'react';
import Image from 'next/image';

interface AmexIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function AmexIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Amex icon' 
}: AmexIconProps) {
  return (
    <Image
      src="/icons/common/amex.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


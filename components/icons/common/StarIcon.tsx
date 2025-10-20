import React from 'react';
import Image from 'next/image';

interface StarIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function StarIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Star icon' 
}: StarIconProps) {
  return (
    <Image
      src="/icons/common/star.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

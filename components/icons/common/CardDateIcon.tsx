import React from 'react';
import Image from 'next/image';

interface CardDateIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function CardDateIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Card date icon' 
}: CardDateIconProps) {
  return (
    <Image
      src="/icons/common/card-date.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


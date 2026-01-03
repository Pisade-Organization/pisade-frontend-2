import React from 'react';
import Image from 'next/image';

interface CardIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function CardIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Card icon' 
}: CardIconProps) {
  return (
    <Image
      src="/icons/common/card.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


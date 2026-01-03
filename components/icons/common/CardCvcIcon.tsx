import React from 'react';
import Image from 'next/image';

interface CardCvcIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function CardCvcIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Card CVC icon' 
}: CardCvcIconProps) {
  return (
    <Image
      src="/icons/common/card-cvc.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


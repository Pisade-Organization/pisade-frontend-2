import React from 'react';
import Image from 'next/image';

interface MoneyIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function MoneyIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Money icon' 
}: MoneyIconProps) {
  return (
    <Image
      src="/icons/common/money.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
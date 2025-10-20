import React from 'react';
import Image from 'next/image';

interface RocketIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function RocketIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Rocket icon' 
}: RocketIconProps) {
  return (
    <Image
      src="/icons/common/rocket.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

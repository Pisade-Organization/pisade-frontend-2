import React from 'react';
import Image from 'next/image';

interface Rocket2IconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function Rocket2Icon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Rocket icon' 
}: Rocket2IconProps) {
  return (
    <Image
      src="/icons/common/rocket-2.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
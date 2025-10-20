import React from 'react';
import Image from 'next/image';

interface Eclipse2IconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function Eclipse2Icon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Eclipse 2 icon' 
}: Eclipse2IconProps) {
  return (
    <Image
      src="/icons/common/eclipse-2.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

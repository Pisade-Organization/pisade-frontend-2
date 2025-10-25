import React from 'react';
import Image from 'next/image';

interface People2IconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function People2Icon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'People icon' 
}: People2IconProps) {
  return (
    <Image
      src="/icons/common/people-2.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
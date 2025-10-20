import React from 'react';
import Image from 'next/image';

interface XIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function XIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'X icon' 
}: XIconProps) {
  return (
    <Image
      src="/icons/common/x.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

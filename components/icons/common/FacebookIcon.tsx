import React from 'react';
import Image from 'next/image';

interface FacebookIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function FacebookIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Facebook icon' 
}: FacebookIconProps) {
  return (
    <Image
      src="/icons/common/facebook.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

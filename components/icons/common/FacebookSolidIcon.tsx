import React from 'react';
import Image from 'next/image';

interface FacebookSolidIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function FacebookSolidIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Facebook solid icon' 
}: FacebookSolidIconProps) {
  return (
    <Image
      src="/icons/common/facebook-solid.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


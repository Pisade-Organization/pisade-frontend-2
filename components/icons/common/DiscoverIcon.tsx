import React from 'react';
import Image from 'next/image';

interface DiscoverIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function DiscoverIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Discover icon' 
}: DiscoverIconProps) {
  return (
    <Image
      src="/icons/common/discover.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


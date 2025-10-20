import React from 'react';
import Image from 'next/image';

interface LinkedInIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function LinkedInIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'LinkedIn icon' 
}: LinkedInIconProps) {
  return (
    <Image
      src="/icons/common/linkedin.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

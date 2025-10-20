import React from 'react';
import Image from 'next/image';

interface EclipseIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function EclipseIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Eclipse icon' 
}: EclipseIconProps) {
  return (
    <Image
      src="/icons/common/eclipse.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

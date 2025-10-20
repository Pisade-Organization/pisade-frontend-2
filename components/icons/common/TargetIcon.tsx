import React from 'react';
import Image from 'next/image';

interface TargetIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function TargetIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Target icon' 
}: TargetIconProps) {
  return (
    <Image
      src="/icons/common/target.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

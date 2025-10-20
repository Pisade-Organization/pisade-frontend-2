import React from 'react';
import Image from 'next/image';

interface ChartGrowthIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function ChartGrowthIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Chart growth icon' 
}: ChartGrowthIconProps) {
  return (
    <Image
      src="/icons/common/chart-growth.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

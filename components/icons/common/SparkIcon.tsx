import React from 'react';
import Image from 'next/image';

interface SparkIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function SparkIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Spark icon' 
}: SparkIconProps) {
  return (
    <Image
      src="/icons/common/spark.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

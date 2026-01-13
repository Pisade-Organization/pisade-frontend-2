import React from 'react';
import Image from 'next/image';

interface EmptyBoxIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function EmptyBoxIcon({ 
  width = 88, 
  height = 88, 
  className = '', 
  alt = 'Empty box icon' 
}: EmptyBoxIconProps) {
  return (
    <Image
      src="/icons/common/empty_box.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


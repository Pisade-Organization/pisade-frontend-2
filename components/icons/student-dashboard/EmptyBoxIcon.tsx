import React from 'react';
import Image from 'next/image';

interface EmptyBoxIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function EmptyBoxIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Empty box icon' 
}: EmptyBoxIconProps) {
  return (
    <Image
      src="/icons/student-dashboard/empty_box.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}


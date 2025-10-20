import React from 'react';
import Image from 'next/image';

interface BookIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function BookIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Book icon' 
}: BookIconProps) {
  return (
    <Image
      src="/icons/common/book.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
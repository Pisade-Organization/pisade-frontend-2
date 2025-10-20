import React from 'react';
import Image from 'next/image';

interface PeopleIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function PeopleIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'People icon' 
}: PeopleIconProps) {
  return (
    <Image
      src="/icons/common/people.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

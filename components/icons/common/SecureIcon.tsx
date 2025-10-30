import React from 'react';
import Image from 'next/image';

interface SecureIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function SecureIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Secure icon' 
}: SecureIconProps) {
  return (
    <Image
      src="/icons/common/secure.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

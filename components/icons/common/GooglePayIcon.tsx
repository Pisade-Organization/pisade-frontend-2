import React from 'react';
import Image from 'next/image';

interface GooglePayIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function GooglePayIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Google Pay icon' 
}: GooglePayIconProps) {
  return (
    <div className={`bg-white ${className}`}>
      <Image
        src="/icons/common/google-pay.svg"
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
}


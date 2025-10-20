import React from 'react';
import Image from 'next/image';

interface FolderIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function FolderIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Folder icon' 
}: FolderIconProps) {
  return (
    <Image
      src="/icons/common/folder.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

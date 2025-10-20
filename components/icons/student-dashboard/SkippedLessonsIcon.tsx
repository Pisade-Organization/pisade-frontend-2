import React from 'react';
import Image from 'next/image';

interface SkippedLessonsIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function SkippedLessonsIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Skipped lessons icon' 
}: SkippedLessonsIconProps) {
  return (
    <Image
      src="/icons/student-dashboard/skipped_lessons.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

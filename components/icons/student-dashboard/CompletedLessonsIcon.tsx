import React from 'react';
import Image from 'next/image';

interface CompletedLessonsIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function CompletedLessonsIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Completed lessons icon' 
}: CompletedLessonsIconProps) {
  return (
    <Image
      src="/icons/student-dashboard/completed_lessons.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

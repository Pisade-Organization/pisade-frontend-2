import React from 'react';
import Image from 'next/image';

interface ScheduledLessonsIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function ScheduledLessonsIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Scheduled lessons icon' 
}: ScheduledLessonsIconProps) {
  return (
    <Image
      src="/icons/student-dashboard/scheduled_lessons.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

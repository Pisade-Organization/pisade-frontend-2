import React from 'react';
import Image from 'next/image';

interface GoalIconProps {
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
}

export default function GoalIcon({ 
  width = 24, 
  height = 24, 
  className = '', 
  alt = 'Goal icon' 
}: GoalIconProps) {
  return (
    <Image
      src="/icons/student-dashboard/goal.svg"
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}

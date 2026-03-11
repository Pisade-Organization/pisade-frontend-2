'use client';

import { TutorCardProps } from '@/views/search/types';
import { TUTOR_RANKING } from '@/types/tutorRanking.enum';
import TutorCard from './TutorCard';

interface TutorListProps {
  type: 'favorites' | 'current';
}

export default function TutorList({ type }: TutorListProps) {
  // TODO: Replace with actual API calls
  const mockTutors: TutorCardProps[] = [
    {
      id: '1',
      fullName: 'John Doe',
      isActive: true,
      avatarUrl: 'https://via.placeholder.com/150',
      flagUrl: 'https://via.placeholder.com/30',
      bio: 'Experienced tutor with 5 years of teaching experience.',
      baseRate: 25,
      specialties: ['English', 'Grammar'],
      subject: 'English',
      languages: ['English', 'Spanish'],
      avgRating: 4.8,
      tutorRanking: TUTOR_RANKING.MASTER,
      studentsCount: 120,
      lessonsCount: 500,
      availability: {},
      videoUrl: '',
      videoThumbnailUrl: '',
    },
  ];

  if (mockTutors.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-neutral-500 text-center">
          No {type === 'favorites' ? 'favorite' : 'current'} tutors found.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {mockTutors.map((tutor) => (
        <TutorCard key={tutor.id} {...tutor} />
      ))}
    </div>
  );
}

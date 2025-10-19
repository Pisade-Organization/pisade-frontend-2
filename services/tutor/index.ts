import { Tutor, TutorDetailData } from './types';

/**
 * Fetch tutor data from API
 */
export async function fetchTutorData(tutorId: string): Promise<Tutor | null> {
  try {
    const response = await fetch(`/api/tutors/${tutorId}`);
    if (!response.ok) {
      return null;
    }
    const tutor = await response.json();
    return tutor;
  } catch (error) {
    console.error('Error fetching tutor data:', error);
    return null;
  }
}

/**
 * Fetch detailed tutor data including reviews
 */
export async function fetchTutorDetailData(tutorId: string): Promise<TutorDetailData | null> {
  try {
    const response = await fetch(`/api/tutors/${tutorId}`);
    if (!response.ok) {
      return null;
    }
    const tutorDetailData = await response.json();
    return tutorDetailData;
  } catch (error) {
    console.error('Error fetching tutor detail data:', error);
    return null;
  }
}

/**
 * Fetch tutors with pagination (for search page)
 */
export async function fetchTutorsPaginated(page: number = 1, limit: number = 6): Promise<{
  tutors: Tutor[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}> {
  try {
    const response = await fetch(`/api/tutors?page=${page}&limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return {
      tutors: [],
      total: 0,
      page: 1,
      limit: 6,
      hasMore: false
    };
  }
}

/**
 * Fetch all tutors (for search page) - kept for backward compatibility
 */
export async function fetchAllTutors(): Promise<Tutor[]> {
  try {
    const response = await fetch('/api/tutors?page=1&limit=1000'); // Large limit to get all
    const data = await response.json();
    return data.tutors;
  } catch (error) {
    console.error('Error fetching tutors:', error);
    return [];
  }
}

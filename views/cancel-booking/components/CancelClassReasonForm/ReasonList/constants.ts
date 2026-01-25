import { ReasonItem } from './types';

export const CANCEL_REASONS: readonly ReasonItem[] = [
  { id: 'SCHEDULING', label: 'Scheduling conflicts' },
  { id: 'CONTENT_MISMATCH', label: 'Course content was not what I expected.' },
  { id: 'TEACHING_STYLE', label: "Dissatisfied with the tutor's teaching style or method." },
  { id: 'QUALITY', label: 'The quality of the lesson was unsatisfactory.' },
  { id: 'COMMUNICATION', label: 'Tutor responsiveness or communication issues.' },
  { id: 'ALTERNATIVE', label: 'Found an alternative tutor/learning platform' },
  { id: 'OTHER', label: 'Other' }
] as const;

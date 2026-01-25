
export type CancelReason =
  | 'SCHEDULING'
  | 'CONTENT_MISMATCH'
  | 'TEACHING_STYLE'
  | 'QUALITY'
  | 'COMMUNICATION'
  | 'ALTERNATIVE'
  | 'OTHER';

export interface ReasonItem {
  id: CancelReason;
  label: string;
}

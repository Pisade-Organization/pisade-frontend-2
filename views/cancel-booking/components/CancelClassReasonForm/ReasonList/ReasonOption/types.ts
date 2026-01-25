import type { CancelReason } from "../types";

export interface ReasonOptionProps {
  id: CancelReason;
  label: string;
  selected: boolean;
  disabled?: boolean;
  onSelect: (id: CancelReason) => void;
}
import { CANCEL_REASONS } from "./constants";
import type { CancelReason } from "./types";
import ReasonOption from "./ReasonOption";
import { OtherOption } from "./OtherOption";

interface ReasonListProps {
  selectedReason: CancelReason | null;
  onSelectReason: (reason: CancelReason) => void;
  disabled?: boolean;
}

export default function ReasonList({
  selectedReason,
  onSelectReason,
  disabled
}: ReasonListProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      {CANCEL_REASONS.map((reason) => {
        if (reason.id === 'OTHER') {
          return (
            <OtherOption
              key={reason.id}
              id={reason.id}
              label={reason.label}
              selected={selectedReason === reason.id}
              disabled={disabled}
              onSelect={onSelectReason}
            />
          );
        }
        return (
          <ReasonOption
            key={reason.id}
            id={reason.id}
            label={reason.label}
            selected={selectedReason === reason.id}
            disabled={disabled}
            onSelect={onSelectReason}
          />
        );
      })}
    </div>
  );
}
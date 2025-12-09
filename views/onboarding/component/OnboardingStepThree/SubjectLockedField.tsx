import BaseInput from "@/components/base/BaseInput";
import Typography from "@/components/base/Typography";
import { TriangleAlert } from "lucide-react";
import clsx from "clsx";

export default function SubjectLockedField({
  subjectName
}: {
  subjectName: string | null;
}) {
  return (
    <div className="w-full bg-white flex flex-col  pt-4 pb-5 px-4 lg:py-5 lg:px-8 gap-2">
      <BaseInput
        title="Subject"
        placeholder={subjectName || ''}
        readOnly
      />

      <div className="inline-flex justify-start items-center gap-1">
        <TriangleAlert size={16} className={clsx(
          subjectName && 'text-neutral-300',
          !subjectName && 'text-red-normal'
        )}/>
        <Typography variant="body-3" color={
          subjectName ? "neutral-400" : "red-normal"
          }>
          Auto-filled based on your selected subject in{" "}
          <span className={clsx(
            subjectName && 'text-neutral-500',
            !subjectName && 'text-red-normal'
          )}>Step 1</span>
        </Typography>
      </div>

    </div>
  )
}
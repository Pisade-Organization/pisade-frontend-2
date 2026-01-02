import { Pencil } from "lucide-react"
import Typography from "@/components/base/Typography"
import { Dispatch, SetStateAction } from "react"
import BaseButton from "@/components/base/BaseButton"

interface TeachingInfoHeaderI {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  onSave: () => void;
}

export default function TeachingInfoHeader({
  isEditing,
  setIsEditing,
  onSave
}: TeachingInfoHeaderI) {
  return (
    <div className="w-full flex justify-between items-center">

      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Teaching Info
      </Typography>

      {isEditing ? (
        <BaseButton 
          variant="primary" 
          onClick={onSave}
          className="hidden lg:flex"
        >
          Save Changes
        </BaseButton>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-full flex justify-center items-center bg-white w-10 h-10 border-[1.5px] border-neutral-50"
        >
          <Pencil className="w-5 h-5 text-neutral-600" />
        </button>
      )}

    </div>
  )
}
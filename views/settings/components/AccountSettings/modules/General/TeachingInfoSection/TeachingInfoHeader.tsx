import { Pencil } from "lucide-react"
import Typography from "@/components/base/Typography"
import { Dispatch, SetStateAction } from "react"

interface TeachingInfoHeaderI {
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export default function TeachingInfoHeader({
  setIsEditing
}: TeachingInfoHeaderI) {
  return (
    <div className="w-full flex justify-between items-center">

      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        Teaching Info
      </Typography>

      <button
        onClick={() => setIsEditing(true)}
        className="rounded-full flex justify-center items-center bg-white w-10 h-10 border-[1.5px] border-neutral-50"
      >
        <Pencil className="w-5 h-5 text-neutral-600" />
      </button>

    </div>
  )
}
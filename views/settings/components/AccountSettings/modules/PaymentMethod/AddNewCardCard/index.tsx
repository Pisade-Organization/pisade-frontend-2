import Typography from "@/components/base/Typography"
import { Plus } from "lucide-react"


export default function AddNewCardCard() {
  return (
    <div className="flex justify-start items-center py-3 px-5 gap-4">
      <Plus size={24} className="text-deep-royal-indigo-500"/>
    </div>
  )
}
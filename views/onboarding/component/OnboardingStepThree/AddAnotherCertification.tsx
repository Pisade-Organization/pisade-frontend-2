import BaseButton from "@/components/base/BaseButton"
import { Plus } from "lucide-react"

interface AddAnotherCertificationProps {
  onAdd: () => void
}

export default function AddAnotherCertification({ onAdd }: AddAnotherCertificationProps) {
  return (
    <div className="w-full rounded-b-[20px] bg-white pt-6 pb-8 px-8 lg:pt-4 lg:pb-5 lg:px-4">
      <BaseButton
        type="button"
        variant="secondary"
        typeStyle="borderless"
        iconLeft={<Plus size={20} className="text-deep-royal-indigo-700"/>}
        onClick={onAdd}
      >
        Add another certification
      </BaseButton>
    </div>
  )
}


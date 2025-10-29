import { ChevronDown } from "lucide-react"
import BaseButton from "../base/BaseButton"

export default function LanguageSwitcher({ dark }: { dark?: boolean }) {
  if (dark) {
    return (
      <button
        className="rounded-lg cursor-pointer flex items-center justify-center p-[1px]"
        style={{
          background:
            "linear-gradient(110.21deg, rgba(255,255,255,0.7) 2.78%, rgba(255,250,203,0.53) 58.48%, rgba(255,57,57,0.07) 72.66%, rgba(255,255,255,0.59) 100%)",
        }}
     >
        <div className="bg-black rounded-lg px-4 py-3.5 bg-gradient-to-r from-white/5 to-white/25 text-white text-label-3">
          EN <ChevronDown size={20} className="inline ml-1" />
        </div>
      </button>
    )
  }
  return (
    <BaseButton variant="secondary" typeStyle="outline">
      EN <ChevronDown size={20} className="inline ml-1" />
    </BaseButton>
  )
}



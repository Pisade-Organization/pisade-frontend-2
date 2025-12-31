import Image from "next/image"
import { Camera } from "lucide-react"
import clsx from "clsx"

interface AvatarFieldProps {
  src?: string | null
  size?: number
  onClick?: () => void
  disabled?: boolean
}

export default function AvatarField({
  src,
  size = 80,
  onClick,
  disabled = false,
}: AvatarFieldProps) {
  return (
    <div
      className={clsx(
        "relative rounded-full overflow-hidden",
        onClick && !disabled && "cursor-pointer",
        disabled && "opacity-60"
      )}
      style={{ width: size, height: size }}
      onClick={disabled ? undefined : onClick}
    >
      <Image
        src={src || "/avatar-placeholder.png"}
        alt="Avatar"
        fill
        className="object-cover"
      />

      {onClick && !disabled && (
        <div className="absolute left-0 bottom-0 w-6 h-6 lg:w-12 lg:h-12 rounded-full bg-white lg:bg-neutral-50 border-[0.8px] lg:border-[3px] border-neutral-50 lg:border-white">
          <Camera className="w-4 h-4 lg:w-7 lg:h-7 text-neutral-600" />
        </div>
      )}
    </div>
  )
}

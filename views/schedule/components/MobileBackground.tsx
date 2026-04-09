import Image from "next/image"

interface MobileBackgroundProps {
  className?: string
}

export default function MobileBackground({ className }: MobileBackgroundProps) {
  return (
    <Image 
      src="/images/schedule/wallpaper.jpg"
      width={375}
      height={142}
      alt="Wallpaper"
      className={className ?? "h-auto max-h-[123px] w-full"}
    />
  )
}

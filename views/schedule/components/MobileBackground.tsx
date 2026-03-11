import Image from "next/image"
export default function MobileBackground() {
  return (
    <Image 
      src="/images/schedule/wallpaper.jpg"
      width={375}
      height={142}
      alt="Wallpaper"
      className="h-auto max-h-[123px] w-full"
    />
  )
}

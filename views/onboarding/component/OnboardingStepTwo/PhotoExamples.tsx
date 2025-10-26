import Image from "next/image"

export default function PhotoExamples() {
  return (
    <div className="relative w-[230px] h-[190px]">
      <div className="w-[130px] h-[130px] absolute top-0 left-0">
        <Image
          src="/images/tutor-onboarding/picture-example-1.jpg"
          alt="Picture Example"
          fill
          className="object-cover rounded-md"
        />
      </div>
      
      <div className="w-[130px] h-[130px] absolute bottom-0 right-0">
        <Image
          src="/images/tutor-onboarding/picture-example-2.jpg"
          alt="Picture Example"
          fill
          className="object-cover rounded-md"
        />
      </div>
    </div>
  )
}
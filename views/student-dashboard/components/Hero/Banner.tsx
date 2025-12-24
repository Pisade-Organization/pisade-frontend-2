"use client"

export default function Banner() {
  return (
    <div className="relative w-full h-full overflow-hidden 2xl:rounded-2xl">
      <div 
        className="absolute w-full h-full inset-0 z-10"
        style={{
          backgroundImage: "url('/images/student/dashboard/banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "50% 30%",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
    </div>
  )
}
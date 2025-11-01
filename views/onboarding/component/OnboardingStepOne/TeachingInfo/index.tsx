"use client"
import Typography from "@/components/base/Typography"
import SubjectForm from "./SubjectForm"
import LanguagesForm from "./LanguagesForm"

export default function TeachingInfo() {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-[18px] py-4 lg:py-6 px-5 lg:px-8 rounded-b-[20px] bg-white">
      <Typography variant={{ base: "title-2", lg: "title-1" }} color="neutral-800">
        2. Teaching info
      </Typography>
      <div className="w-full border-t border-t-electric-violet-50 border-0 h-px" />

      <div className="w-full flex flex-col justify-center items-center gap-5"></div>

      <div className="w-full flex flex-col justify-center items-start gap-5">
        <SubjectForm />
        <LanguagesForm />
      </div>
    </div>
  )
}
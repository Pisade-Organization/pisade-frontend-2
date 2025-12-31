import Typography from "@/components/base/Typography"
import { ReactNode } from "react"

interface SectionHeaderI {
  title: string;
  action?: ReactNode;
}

export default function SectionHeader({
  title,
  action
}: SectionHeaderI) {
  return (
    <div className="flex items-center justify-between w-full">
      <Typography variant={{ base: "headline-3", lg: "headline-5" }} color="neutral-900">
        { title }
      </Typography>
      {action}
    </div>
  )
}
import clsx from "clsx";
import Typography from "@/components/base/Typography";
import Link from "next/link";

export interface SettingsTabItemI {
  label: string;
  isActive: boolean;
  href: string;
}

export default function SettingsTabItem({
  label,
  isActive,
  href
}: SettingsTabItemI) {
  return (
    <Link href={href} className="pt-1 w-full flex flex-col items-center gap-3">
      <Typography variant="body-3" color={isActive ? "electric-violet-400" : "neutral-50"}>
        { label }
      </Typography>

      <div className={clsx("w-full h-[2px]", isActive ? "bg-electric-violet-400" : "bg-neutral-50")}/>
    </Link>
  )
}
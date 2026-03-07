import type { PropsWithChildren } from "react"
import { cn } from "@/lib/utils"

interface PrimitiveProps extends PropsWithChildren {
  className?: string
}

export function PageRoot({ children, className }: PrimitiveProps) {
  return <div className={cn("w-full min-h-screen flex flex-col", className)}>{children}</div>
}

export function DesktopOnly({ children, className }: PrimitiveProps) {
  return <div className={cn("hidden lg:block", className)}>{children}</div>
}

export function MobileOnly({ children, className }: PrimitiveProps) {
  return <div className={cn("lg:hidden", className)}>{children}</div>
}

export function PageContainer({ children, className }: PrimitiveProps) {
  return <div className={cn("w-full py-2 px-4 lg:py-8 lg:px-20", className)}>{children}</div>
}

export function TwoColumnLayout({ children, className }: PrimitiveProps) {
  return <div className={cn("w-full flex flex-col gap-5 lg:flex-row lg:gap-10", className)}>{children}</div>
}

export function PrimaryPanel({ children, className }: PrimitiveProps) {
  return (
    <div
      className={cn(
        "w-full lg:flex-1 flex flex-col gap-5 py-2 px-4 lg:py-6 lg:px-[120px] lg:rounded-2xl lg:border lg:border-neutral-50 lg:bg-white",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function SummaryPanel({ children, className }: PrimitiveProps) {
  return <div className={cn("w-full lg:max-w-[343px] lg:flex-1", className)}>{children}</div>
}

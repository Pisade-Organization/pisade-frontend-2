import { ReactNode } from "react"

interface WalletLayoutProps {
  children: ReactNode
}

export default function WalletLayout({ children }: WalletLayoutProps) {
  return (
    <div className="flex flex-col py-3 px-4 gap-3 lg:pt-8 lg:pb-[60px] lg:px-20 lg:gap-12">{children}</div>
  )
}

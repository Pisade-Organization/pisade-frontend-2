"use client"

import Navbar from "@/components/Navbar"
import type { WalletRole } from "@/views/wallet/types"

interface WalletNavbarProps {
  role: WalletRole
}

export default function WalletNavbar({ role }: WalletNavbarProps) {
  return <Navbar variant={role === "student" ? "student_dashboard" : "tutor_dashboard"} />
}

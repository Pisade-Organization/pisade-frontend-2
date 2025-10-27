"use client"
import { signOut } from "next-auth/react";
import BaseButton from "@/components/base/BaseButton";

export default function SignOutPage() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <BaseButton onClick={() => signOut()}>
        Log out
      </BaseButton>
    </div>
  )
}
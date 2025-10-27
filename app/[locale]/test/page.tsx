"use client"
import { useSession } from "next-auth/react"
export default function TestPage() {
  const session = useSession()
  console.log(session)
  return (
    <div className="min-h-screen flex justify-center items-center">
      {session.data?.user?.email}
      hi
    </div>
  )
}
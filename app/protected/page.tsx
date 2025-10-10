"use client";
import { useSession } from "next-auth/react";

export default function TestSessionPage() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No session. Not signed in.</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Session Loaded ✅</h1>
      <pre className="mt-4 p-4 rounded">{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}

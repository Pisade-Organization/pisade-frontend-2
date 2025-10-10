"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// ✅ use the new signIn from your route file, not from next-auth/react
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // ✅ NextAuth v5 supports this direct call from our exported helper
      const res = await signIn("credentials", {
        redirect: false, // prevent redirect loop
        email,
        password,
      });

      setLoading(false);

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // ✅ Google provider works the same way in v5
    await signIn("google", { redirectTo: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Sign In
        </h2>

        {/* --- Email/Password Login --- */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="text-black mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="text-black mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-2 text-center text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-2.5 text-white font-medium shadow hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* --- Divider --- */}
        <div className="my-6 flex items-center justify-center">
          <div className="h-px w-1/3 bg-gray-200" />
          <p className="mx-3 text-gray-400 text-sm">or</p>
          <div className="h-px w-1/3 bg-gray-200" />
        </div>

        {/* --- Google Button --- */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white py-2.5 font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";

export default function GoogleButton() {
  const handleGoogleRedirect = () => {
    // ✅ Redirect user to backend OAuth entry
    window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google/signin`;
  };

  return (
    <button
    disabled
      type="button"
      onClick={handleGoogleRedirect}
      className="flex items-center justify-center gap-x-2 border w-full py-3 px-5 rounded-lg text-label-2 border-deep-royal-indigo-700 transition-all duration-200 lg:hover:bg-deep-royal-indigo-700 lg:hover:text-white group"
    >
      <Image
        src="/icons/common/google.svg"
        alt="Google"
        width={20}
        height={20}
        className="transition-all duration-200 lg:group-hover:brightness-0 lg:group-hover:invert"
      />
      <span className="text-deep-royal-indigo-700 font-medium transition-colors duration-200 lg:group-hover:text-white">
        Continue with Google
      </span>
    </button>
  );
}

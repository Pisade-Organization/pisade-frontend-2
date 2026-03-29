"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Dialog, DialogContent, DialogDescription, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import BaseButton from "@/components/base/BaseButton";
import Typography from "@/components/base/Typography";
import { X } from "lucide-react";
import BaseInput from "@/components/base/BaseInput";
import { BaseCheckbox } from "@/components/base/Checkbox";
import GoogleButton from "@/views/auth/components/GoogleButton";
import { AUTH_TYPES } from "@/views/auth/types/auth.enum";

interface AuthRequiredModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tutorAvatarUrl?: string;
}

export default function AuthRequiredModal({
  open,
  onOpenChange,
  tutorAvatarUrl,
}: AuthRequiredModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    onOpenChange(false);
    router.push(`/${locale}/signin`);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPortal>
        <button
          type="button"
          aria-label="Close modal"
          onClick={() => onOpenChange(false)}
          className="fixed right-8 top-8 z-[60] hidden h-12 w-12 items-center justify-center rounded-full bg-white lg:flex"
        >
          <X className="h-6 w-6 text-neutral-400" />
        </button>
      </DialogPortal>

      <DialogContent
        hideClose
        className="w-[calc(100%-32px)] max-w-[343px] lg:max-w-[500px] rounded-2xl bg-white py-6 px-4 lg:p-8 flex flex-col gap-8"
      >
        <DialogTitle className="sr-only">Register now to meet your tutor</DialogTitle>

        {/* X Button for mobile only */}
        <div className="flex justify-end items-center lg:hidden">
          <button type="button" aria-label="Close modal" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5 text-neutral-700" />
          </button>
        </div>

        {/* TITLE + DESCRIPTION */}
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center gap-3">
            {tutorAvatarUrl ? (
              <Image
                src={tutorAvatarUrl}
                alt="Tutor avatar"
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-2xl object-cover"
              />
            ) : null}

            <div className="flex flex-col gap-1">
            <Typography variant={{ base: "headline-5", lg: "headline-4" }} color="deep-royal-indigo-900" className="text-center">
              Register now to meet your tutor
            </Typography>
            <DialogDescription asChild>
              <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-400" className="text-center">
                Already have an account?{" "}
                <button type="button" className="underline" onClick={handleSignIn}>
                  Log in
                </button>
              </Typography>
            </DialogDescription>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:gap-5">
          <BaseInput
            type="email"
            title="Email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <div className="flex justify-start items-center gap-2">
            <BaseCheckbox
              checked={rememberMe}
              onChange={setRememberMe}
              aria-label="Remember me"
            />
            <Typography variant={{ base: "body-3", lg: "body-2" }} color="neutral-800" className="text-center">
              Remember me
            </Typography>
          </div>
        </div>

        {/* SIGN UP BUTTON OR CONTINUE WITH GOOGLE */}
        <div className="flex flex-col gap-4">
          <BaseButton onClick={handleSignIn} disabled={!email.trim()}>
            Sign up
          </BaseButton>
          <Typography variant={{ base: "body-3" }} color="neutral-700" className="text-center">
            or
          </Typography>
          <GoogleButton authType={AUTH_TYPES.SIGNIN} />
        </div>

        <Typography variant={{ base: "body-3" }} color="neutral-400" className="text-center">
          By clicking Log in or Continue with, you agree to Pisade <span className="underline">Terms of Use</span> and <span className="underline">Privacy Policy</span>
        </Typography>

      </DialogContent>
    </Dialog>
  );
}

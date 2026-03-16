import Typography from "@/components/base/Typography";
import Link from "next/link";
import { signOut } from "next-auth/react";
import {
  CircleHelp,
  LogOut,
  Settings,
  ShieldCheck,
  UserRoundPen,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import type { TutorMenuLink } from "./types";

interface AccountNavLinksContainerProps {
  links?: TutorMenuLink[];
  title?: string;
}

function getIconForAccountLink(label: string): LucideIcon {
  if (label === "My Wallet") return Wallet;
  if (label === "My Profile") return UserRoundPen;
  if (label === "Account settings") return Settings;
  if (label === "Safety & Trust") return ShieldCheck;
  if (label === "Helps") return CircleHelp;

  return Settings;
}

export default function AccountNavLinksContainer({
  links = [],
  title = "Account",
}: AccountNavLinksContainerProps) {
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="title-2" color="neutral-900">
        {title}
      </Typography>

      <div className="flex flex-col gap-3">
        {links.map((link, index) => {
          const Icon = getIconForAccountLink(link.label);
          const isLast = index === links.length - 1;

          return (
            <div key={link.id} className="flex flex-col gap-3">
              <Link
                href={link.href}
                className="flex items-center gap-3 rounded-[8px] px-1 py-1 text-neutral-800"
              >
                <Icon className="h-5 w-5 text-neutral-200" />
                <Typography variant="body-3" color="neutral-800">
                  {link.label}
                </Typography>
              </Link>

              {!isLast && <div className="w-full border-b border-neutral-50" />}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="flex justify-center items-center gap-2 py-1"
        onClick={() => {
          void signOut({ redirect: false });
        }}
      >
        <LogOut className="w-5 h-5 text-red-normal" />
        <Typography variant="body-3" color="red-normal">
          Log out
        </Typography>
      </button>
    </section>
  );
}

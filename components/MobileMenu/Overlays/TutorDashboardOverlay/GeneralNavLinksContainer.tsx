import Typography from "@/components/base/Typography";
import Link from "next/link";
import {
  CalendarPlus2,
  House,
  type LucideIcon,
  UsersRound,
  WalletCards,
} from "lucide-react";
import type { TutorMenuLink } from "./types";

interface GeneralNavLinksContainerProps {
  links?: TutorMenuLink[];
  title?: string;
}

function getIconForLink(href: string): LucideIcon {
  if (href.includes("/dashboard")) return House;
  if (href.includes("/students")) return UsersRound;
  if (href.includes("/schedule")) return CalendarPlus2;
  if (href.includes("/wallet")) return WalletCards;

  return House;
}

export default function GeneralNavLinksContainer({
  links = [],
  title = "General",
}: GeneralNavLinksContainerProps) {
  return (
    <section className="flex flex-col gap-4">
      <Typography variant="title-2" color="neutral-900">
        {title}
      </Typography>

      <div className="flex flex-col gap-3">
        {links.map((link, index) => {
          const Icon = getIconForLink(link.href);
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
    </section>
  );
}

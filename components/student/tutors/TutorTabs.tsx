'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Tab {
  name: string;
  path: string;
}

export default function TutorTabs() {
  const pathname = usePathname();

  // get current locale from path: e.g. '/en/...' => 'en'
  const currentLocale = pathname?.split('/')?.[1] || '';
  const localePrefix = currentLocale ? `/${currentLocale}` : '';

  const tabs: Tab[] = [
    { name: 'Favorite Tutors', path: `${localePrefix}/student/tutors/favorites` },
    { name: 'Current Tutors', path: `${localePrefix}/student/tutors/current` },
  ];

  const isActive = (fullPath: string) => {
    if (!pathname) return false;
    return pathname === fullPath || pathname.startsWith(fullPath) || pathname.endsWith(fullPath);
  };

  return (
    <div className="flex w-full lg:px-[60px] lg:border-b lg:border-neutral-50">
      {tabs.map((tab) => {
        const active = isActive(tab.path);
        return (
          <Link key={tab.path} href={tab.path} className="relative flex-1 lg:pt-3 lg:max-w-[145px]">
            <div className="flex flex-col items-center gap-3">
              <span
                className={`body-3 lg:body-2 transition-colors ${
                  active ? 'text-electric-violet-500' : 'text-neutral-700'
                }`}
              >
                {tab.name}
              </span>
              <div
                className={`h-[2px] w-full rounded-full transition-colors ${
                  active ? 'bg-electric-violet-500' : 'bg-neutral-50 lg:bg-transparent'
                }`}
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

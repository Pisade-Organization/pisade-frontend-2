'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Tab {
  name: string;
  path: string;
}

interface TutorTabsProps {
  basePath?: string;
  mode?: 'student-tutors' | 'tutor-students';
}

export default function TutorTabs({
  basePath = "/student/tutors",
  mode = 'student-tutors',
}: TutorTabsProps) {
  const pathname = usePathname();

  // get current locale from path: e.g. '/en/...' => 'en'
  const currentLocale = pathname?.split('/')?.[1] || '';
  const localePrefix = currentLocale ? `/${currentLocale}` : '';
  const normalizedBasePath = basePath.startsWith("/") ? basePath : `/${basePath}`;

  const tabs: Tab[] =
    mode === 'tutor-students'
      ? [
          { name: 'Active Students', path: `${localePrefix}${normalizedBasePath}/active` },
          { name: 'Past Students', path: `${localePrefix}${normalizedBasePath}/past` },
        ]
      : [
          { name: 'Favorite Tutors', path: `${localePrefix}${normalizedBasePath}/favorites` },
          { name: 'Current Tutors', path: `${localePrefix}${normalizedBasePath}/current` },
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

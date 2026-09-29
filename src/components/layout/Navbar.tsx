
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useFitlog } from '@/context/FitlogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = useFitlog();

  
  const workoutsAreActive =
    pathname === '/' || pathname.startsWith('/workouts');
  const planIsActive = pathname === '/my-plan';

  const activeLinkClass =
    'rounded-full bg-[#1B2410] px-4 py-2 text-sm font-semibold text-[#CCFF00]';
  const regularLinkClass =
    'rounded-full px-4 py-2 text-sm font-semibold text-gray-400 transition hover:text-[#CCFF00]';

  return (
    <nav className="bg-[#0C0D10] px-5 py-4 sm:px-8">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
          />
          <span className="font-oswald text-xl font-bold tracking-wide text-white">
            FITLOG
          </span>
        </Link>

        <div className="order-3 flex w-full items-center justify-center gap-2 sm:order-none sm:w-auto">
          <Link
            href="/"
            aria-current={workoutsAreActive ? 'page' : undefined}
            className={workoutsAreActive ? activeLinkClass : regularLinkClass}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            aria-current={planIsActive ? 'page' : undefined}
            className={planIsActive ? activeLinkClass : regularLinkClass}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-3 sm:gap-5">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#CCFF00] px-1 text-xs font-bold text-black">
              {planList.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Saved</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-gray-700 px-1 text-xs text-gray-300">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useFitlog } from '@/context/FitlogContext';

export default function Navbar() {
  const pathname = usePathname();
  const { planList, savedList } = useFitlog();

  const isWorkoutsPage = pathname === '/' || pathname.startsWith('/workouts');
  const isPlanPage = pathname === '/my-plan';

  const activeStyle =
    'rounded-full bg-[#1B2410] px-4 py-2 text-sm font-semibold text-[#CCFF00]';
  const normalStyle =
    'rounded-full px-4 py-2 text-sm font-semibold text-gray-400 transition hover:text-[#CCFF00]';

  return (
    <nav className="bg-[#0C0D10] px-6 py-5">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
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

        <div className="flex items-center gap-2">
          <Link href="/" className={isWorkoutsPage ? activeStyle : normalStyle}>
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={isPlanPage ? activeStyle : normalStyle}
          >
            My Plan
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-bold text-black">
              {planList.length}
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-700 text-xs text-gray-300">
              {savedList.length}
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

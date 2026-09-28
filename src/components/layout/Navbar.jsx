import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="bg-[#0C0D10] px-6 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo section */}
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

        {/* Page links section */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="rounded-full bg-[#1B2410] px-4 py-2 text-sm font-semibold text-[#CCFF00]"
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full px-4 py-2 text-sm font-semibold text-gray-400 transition hover:text-[#CCFF00]"
          >
            My Plan
          </Link>
        </div>

        {/* Plan and Saved count section */}
        <div className="flex items-center gap-5">
          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Plan</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#CCFF00] text-xs font-bold text-black">
              0
            </span>
          </Link>

          <Link href="/my-plan" className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Saved</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-700 text-xs text-gray-300">
              0
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

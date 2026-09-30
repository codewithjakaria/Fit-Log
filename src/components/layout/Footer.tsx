import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-[#1B1F28] bg-[#0F1115] px-6 py-6 text-white sm:px-8">
      <div className="mx-auto flex max-w-[1280px] flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <Link href="/" className="flex w-fit items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={20}
            height={20}
          />

          <span className="font-oswald text-[20px] font-bold tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="text-left sm:text-right">
          <p className="mt-1 text-xxl text-gray-500">
            © 2026 FitLog — Workout Library. Train hard, log honest.
          </p>
        </div>
      </div>
    </footer>
  );
}

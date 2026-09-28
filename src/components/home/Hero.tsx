import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1600px] rounded-2xl border border-[#222630] bg-[#15171D] px-6 py-10 md:px-14 md:py-14">
      <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
        <div className="max-w-2xl">
          <p className="font-oswald text-xs font-bold uppercase tracking-widest text-[#CCFF00]">
            Workout Library
          </p>

          <h1 className="font-oswald mt-5 text-5xl font-bold uppercase leading-tight text-white md:text-7xl">
            Train with intent. Log every set.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="font-oswald mt-8 inline-block rounded-lg bg-[#CCFF00] px-6 py-3 text-sm font-bold uppercase text-black transition hover:opacity-90"
          >
            Browse Workouts
          </Link>
        </div>
        <div className="relative h-[220px] w-full md:h-[220px] md:w-1/2">
          <Image
            src="/assets/banner.png"
            alt="Muscle anatomy on a gym machine"
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="scale-150 object-contain"
          />
        </div>
      </div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bookmark, CalendarDays, Clock, Flame, Star } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import type { Workout } from '@/lib/api';

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const { addToPlan, saveForLater } = useFitlog();

  const details = [
    ['Equipment', workout.equipment],
    ['Difficulty', workout.difficulty],
    ['Sets', String(workout.sets)],
    ['Reps', workout.reps],
    ['Duration', `${workout.duration} min`],
    ['Calories', `${workout.caloriesBurned} kcal`],
    ['Rating', <span className="flex items-center gap-1" key="rating"><Star size={14} className="fill-[#CCFF00] text-[#CCFF00]" />{workout.rating}</span>],
  ];

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#0C0D10] px-5 py-8 text-white sm:px-8 sm:py-12">
      <article className="mx-auto max-w-[1280px]">
        <Link href="/#library" className="mb-7 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#CCFF00]">
          <ArrowLeft size={16} /> Back to workouts
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-9">
          <div className="relative min-h-[320px] overflow-hidden rounded-2xl border border-[#222630] bg-[#15171D] sm:min-h-[520px]">
            <Image src={workout.image} alt={workout.name} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => <span key={group} className="rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold uppercase text-black">{group}</span>)}
            </div>
            <h1 className="font-oswald mt-4 text-4xl font-bold uppercase leading-tight sm:text-5xl">{workout.name}</h1>
            <p className="mt-3 leading-7 text-gray-400">{workout.description}</p>

            <dl className="mt-7 divide-y divide-[#222630] rounded-xl border border-[#222630] bg-[#15171D] px-5">
              {details.map(([label, value]) => (
                <div key={label as string} className="flex items-center justify-between gap-4 py-3.5 text-sm">
                  <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">{label}</dt>
                  <dd className="font-medium text-gray-200">{value}</dd>
                </div>
              ))}
            </dl>

            <section className="mt-7">
              <h2 className="font-oswald text-xl font-bold uppercase tracking-wide">Instructions</h2>
              <ol className="mt-3 space-y-3 text-sm leading-6 text-gray-400">
                {workout.instructions.map((instruction, index) => (
                  <li key={`${index}-${instruction}`} className="flex gap-3"><span className="shrink-0 text-[#CCFF00]">{index + 1}.</span><span>{instruction}</span></li>
                ))}
              </ol>
            </section>

            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => addToPlan(workout)} className="inline-flex items-center gap-2 rounded-lg bg-[#CCFF00] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#dfff4b]">
                <CalendarDays size={16} /> Add to today&apos;s plan
              </button>
              <button onClick={() => saveForLater(workout)} className="inline-flex items-center gap-2 rounded-lg border border-[#30343f] px-5 py-3 text-sm font-semibold text-gray-200 transition hover:border-[#CCFF00] hover:text-[#CCFF00]">
                <Bookmark size={16} /> Save for later
              </button>
            </div>
            <div className="mt-5 flex gap-5 text-sm text-gray-400">
              <span className="flex items-center gap-2"><Clock size={15} className="text-[#CCFF00]" />{workout.duration} min</span>
              <span className="flex items-center gap-2"><Flame size={15} className="text-[#CCFF00]" />{workout.caloriesBurned} kcal</span>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}


'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Bookmark, CalendarDays, Star } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';
import type { Workout } from '@/lib/api';

type WorkoutDetailsProps = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: WorkoutDetailsProps) {
  const { addToPlan, saveForLater } = useFitlog();

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#0C0D10] px-5 py-8 text-white sm:px-8 sm:py-12">
      <article className="mx-auto max-w-[1280px]">
        <Link
          href="/#library"
          className="mb-7 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#CCFF00]"
        >
          <ArrowLeft size={16} />
          Back to workouts
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-9">
          {/* Workout image */}
          <div className="relative min-h-[320px] overflow-hidden rounded-xl border border-[#222630] bg-[#15171D] sm:min-h-[520px]">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          {/* Workout information */}
          <div className="flex flex-col">
            <h1 className="font-oswald text-3xl font-bold uppercase leading-tight sm:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map(group => (
                <span
                  key={group}
                  className="rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold uppercase text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Workout facts */}
            <dl className="mt-6 divide-y divide-[#222630] rounded-xl border border-[#222630] bg-[#15171D] px-5">
              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Equipment
                </dt>
                <dd className="text-right font-medium text-gray-200">
                  {workout.equipment}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Difficulty
                </dt>
                <dd className="font-medium text-gray-200">
                  {workout.difficulty}
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sets
                </dt>
                <dd className="font-medium text-gray-200">{workout.sets}</dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Reps
                </dt>
                <dd className="font-medium text-gray-200">{workout.reps}</dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Duration
                </dt>
                <dd className="font-medium text-gray-200">
                  {workout.duration} min
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Calories
                </dt>
                <dd className="font-medium text-gray-200">
                  {workout.caloriesBurned} kcal
                </dd>
              </div>

              <div className="flex items-center justify-between gap-4 py-3.5 text-sm">
                <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Rating
                </dt>
                <dd className="flex items-center gap-1 font-medium text-gray-200">
                  <Star size={14} className="fill-[#CCFF00] text-[#CCFF00]" />
                  {workout.rating}
                </dd>
              </div>
            </dl>

            {/* Exercise instructions */}
            <section className="mt-6">
              <h2 className="font-oswald text-lg font-bold uppercase tracking-wide">
                Instructions
              </h2>

              <ol className="mt-3 space-y-2 text-sm leading-6 text-gray-400">
                {workout.instructions.map((instruction, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="shrink-0">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* These buttons update the shared Fitlog context. */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => addToPlan(workout)}
                className="inline-flex items-center gap-2 rounded-md bg-[#CCFF00] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#dfff4b]"
              >
                <CalendarDays size={16} />
                Add to today&apos;s plan
              </button>

              <button
                type="button"
                onClick={() => saveForLater(workout)}
                className="inline-flex items-center gap-2 rounded-md border border-[#30343F] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
              >
                <Bookmark size={16} />
                Save for later
              </button>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

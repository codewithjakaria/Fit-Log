'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Clock, Flame, Star, X } from 'lucide-react';
import { useFitlog } from '@/context/FitlogContext';

export default function MyPlanPage() {
  const {
    planList,
    savedList,
    completedWorkoutIds,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = useFitlog();

  const [activeTab, setActiveTab] = useState<'plan' | 'saved'>('plan');
  const [sortBy, setSortBy] = useState('duration');

  let workoutsToShow = planList;

  if (activeTab === 'saved') {
    workoutsToShow = savedList;
  }

  let totalMinutes = 0;
  let totalCalories = 0;

  for (const workout of workoutsToShow) {
    totalMinutes = totalMinutes + workout.duration;
    totalCalories = totalCalories + workout.caloriesBurned;
  }

  const sortedWorkouts = [...workoutsToShow];

  if (sortBy === 'duration') {
    sortedWorkouts.sort((workoutA, workoutB) => {
      return workoutA.duration - workoutB.duration;
    });
  }

  if (sortBy === 'calories') {
    sortedWorkouts.sort((workoutA, workoutB) => {
      return workoutA.caloriesBurned - workoutB.caloriesBurned;
    });
  }

  if (sortBy === 'rating') {
    sortedWorkouts.sort((workoutA, workoutB) => {
      return workoutB.rating - workoutA.rating;
    });
  }

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#0C0D10] px-5 py-8 text-white sm:px-8 sm:py-12">
      <section className="mx-auto max-w-7xl">
        <h1 className="font-oswald text-3xl font-bold uppercase sm:text-4xl">
          My Plan
        </h1>
        <p className="mt-2 text-sm text-gray-400">
          Cap of five lifts for today. Finish them, then load more.
        </p>

        {/* Summary for today's plan */}
        <div className="mt-7 grid grid-cols-3 divide-x divide-[#222630] rounded-xl border border-[#222630] bg-[#15171D] px-3 py-6 sm:px-5">
          <div className="px-2 sm:px-5">
            <p className="text-xs text-gray-500">Exercises</p>
            <p className="font-oswald mt-1 text-3xl font-bold text-[#CCFF00]">
              {workoutsToShow.length}
            </p>
          </div>

          <div className="px-3 sm:px-8">
            <p className="text-xs text-gray-500">Minutes</p>
            <p className="font-oswald mt-1 text-3xl font-bold">
              {totalMinutes}
            </p>
          </div>

          <div className="px-3 sm:px-8">
            <p className="text-xs text-gray-500">Calories</p>
            <p className="font-oswald mt-1 text-3xl font-bold">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Plan tabs and sorting menu */}
        <div className="mt-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="inline-flex w-fit rounded-lg border border-[#222630] bg-[#15171D] p-1">
            <button
              type="button"
              onClick={() => setActiveTab('plan')}
              className={`rounded-md px-4 py-2 text-xs transition ${
                activeTab === 'plan'
                  ? 'bg-[#222630] text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`rounded-md px-4 py-2 text-xs transition ${
                activeTab === 'saved'
                  ? 'bg-[#222630] text-white'
                  : 'text-gray-500 hover:text-white'
              }`}
            >
              Saved
            </button>
          </div>

          <label className="flex items-center gap-2 text-xs text-gray-500">
            Sort By
            <select
              value={sortBy}
              onChange={event => setSortBy(event.target.value)}
              className="rounded-md border border-[#222630] bg-[#15171D] px-3 py-2 text-gray-300 outline-none focus:border-[#CCFF00]"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </label>
        </div>

        {sortedWorkouts.length === 0 ? (
          <div className="mt-5 flex min-h-[250px] flex-col items-center justify-center rounded-xl border border-dashed border-[#222630] px-6 py-12 text-center">
            <h2 className="font-oswald text-lg font-bold uppercase">
              Nothing here yet
            </h2>
            <p className="mt-2 text-xs text-gray-500">
              {activeTab === 'plan'
                ? 'Browse the library and add a lift to get today moving.'
                : 'Browse the library and save a lift for later.'}
            </p>
            <Link
              href="/#library"
              className="mt-5 rounded-full bg-[#CCFF00] px-5 py-2.5 text-xs font-bold text-black transition hover:bg-[#dfff4b]"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {sortedWorkouts.map(workout => {
              const workoutIsDone = completedWorkoutIds.includes(workout.id);

              return (
                <article
                  key={workout.id}
                  className="flex flex-col gap-4 rounded-xl border border-[#222630] bg-[#15171D] p-3 sm:flex-row sm:items-center sm:gap-4 sm:p-4"
                >
                  <Link
                    href={`/workouts/${workout.id}`}
                    className="flex min-w-0 flex-1 items-center gap-3"
                  >
                    <Image
                      src={workout.image}
                      alt={workout.name}
                      width={128}
                      height={80}
                      className="h-20 w-32 shrink-0 rounded-md object-cover"
                    />

                    <div className="min-w-0">
                      <h2 className="font-oswald truncate text-base font-bold uppercase transition hover:text-[#CCFF00]">
                        {workout.name}
                      </h2>
                      <p className="mt-1 truncate text-xs text-gray-400">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-gray-400">
                        <span className="flex items-center gap-1">
                          <Clock size={12} className="text-[#CCFF00]" />
                          {workout.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame size={12} className="text-[#CCFF00]" />
                          {workout.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="fill-[#CCFF00] text-[#CCFF00]"
                          />
                          {workout.rating}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
                    <Link
                      href={`/workouts/${workout.id}`}
                      className="rounded-full border border-[#30343F] px-3 py-2 text-xs text-gray-300 transition hover:border-gray-500 hover:text-white"
                    >
                      View Details
                    </Link>

                    {activeTab === 'plan' ? (
                      <button
                        type="button"
                        onClick={() => markAsDone(workout.id)}
                        disabled={workoutIsDone}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#CCFF00] px-3 py-2 text-xs font-bold text-black transition hover:bg-[#dfff4b] disabled:cursor-default disabled:opacity-60"
                      >
                        <Check size={14} />
                        {workoutIsDone ? 'Done' : 'Mark as Done'}
                      </button>
                    ) : null}

                    <button
                      type="button"
                      onClick={() => {
                        if (activeTab === 'plan') {
                          removeFromPlan(workout.id);
                        } else {
                          removeFromSaved(workout.id);
                        }
                      }}
                      aria-label={`Remove ${workout.name}`}
                      className="rounded-full p-2 text-gray-500 transition hover:bg-[#222630] hover:text-white"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

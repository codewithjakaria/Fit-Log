'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getWorkoutById, type Workout } from '@/lib/api';

export default function WorkoutDetailsPage() {
  const params = useParams<{ id: string }>();
  const workoutId = params.id;
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkout() {
      setIsLoading(true);
      setError('');

      try {
        const workoutData = await getWorkoutById(workoutId);
        setWorkout(workoutData);
      } catch {
        setError('Could not load this workout. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    loadWorkout();
  }, [workoutId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0C0D10] text-white">
        <p className="mx-auto max-w-7xl px-6 py-12 text-gray-400">
          Loading workout...
        </p>
      </main>
    );
  }
  if (error || workout === null) {
    return (
      <main className="min-h-screen bg-[#0C0D10] text-white">
        <section className="mx-auto max-w-7xl px-6 py-12">
          <p className="text-red-400">{error || 'Workout not found.'}</p>

          <Link href="/" className="mt-4 inline-block text-[#CCFF00]">
            ← Back to workouts
          </Link>
        </section>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#0C0D10] text-white">
      <section className="mx-auto max-w-7xl px-6 py-8 md:py-12">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-gray-400 transition hover:text-[#CCFF00]"
        >
          ← All workouts
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="overflow-hidden rounded-xl border border-[#1C1F26] bg-[#15171D]">
            <img
              src={workout.image}
              alt={workout.name}
              className="h-full min-h-[320px] w-full object-cover lg:min-h-[620px]"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="font-oswald text-3xl font-bold uppercase leading-tight md:text-4xl">
              {workout.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-400">
              {workout.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {workout.muscleGroups.map(group => (
                <span
                  key={group}
                  className="rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold text-black"
                >
                  {group}
                </span>
              ))}
            </div>

            <div className="mt-6 divide-y divide-[#252830] rounded-lg border border-[#252830] bg-[#15171D] px-4">
              <WorkoutInfo label="Equipment" value={workout.equipment} />
              <WorkoutInfo label="Difficulty" value={workout.difficulty} />
              <WorkoutInfo label="Sets" value={workout.sets} />
              <WorkoutInfo label="Reps" value={workout.reps} />
              <WorkoutInfo label="Duration" value={`${workout.duration} min`} />
              <WorkoutInfo
                label="Calories"
                value={`${workout.caloriesBurned} kcal`}
              />
              <WorkoutInfo label="Rating" value={`★ ${workout.rating}`} />
            </div>

            <h2 className="mt-7 text-sm font-bold uppercase tracking-wide">
              Instructions
            </h2>

            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-gray-400">
              {workout.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-md bg-[#CCFF00] px-4 py-2.5 text-sm font-bold text-black transition hover:bg-[#b8e600]"
              >
                <span aria-hidden="true">▦</span>
                Add to today's plan
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-[#30343D] px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:text-white"
              >
                <span aria-hidden="true">♧</span>
                Save for later
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function WorkoutInfo({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 text-sm">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>

      <span className="text-right text-gray-200">{value}</span>
    </div>
  );
}

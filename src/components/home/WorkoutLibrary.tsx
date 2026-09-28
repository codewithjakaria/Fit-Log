'use client';

import { useEffect, useState } from 'react';
import { getAllWorkouts } from '@/lib/api';
import type { Workout } from '@/lib/api';
import WorkoutCard from '@/components/workouts/WorkoutCard';

export default function WorkoutLibrary() {

  const [workouts, setWorkouts] = useState<Workout[]>([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(false); 
  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await getAllWorkouts(); 
        setWorkouts(data); 
      } catch (err) {
        setError(true); 
      } finally {
        setLoading(false); 
      }
    }

    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-24">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#222630] border-t-[#CCFF00]" />
        <p className="text-gray-400">Loading workouts…</p>
      </div>
    );
  }

  if (error) {
    return (
      <p className="py-24 text-center text-gray-400">
        Something went wrong. Please try again later.
      </p>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {workouts.map(function (workout) {
        return <WorkoutCard key={workout.id} workout={workout} />;
      })}
    </div>
  );
}

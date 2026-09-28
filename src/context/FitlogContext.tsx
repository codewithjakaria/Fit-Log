'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import type { Workout } from '@/lib/api';

type FitlogContextType = {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
};

// Create the context. It starts empty until FitlogProvider is used.
const FitlogContext = createContext<FitlogContextType | null>(null);

// Put this provider around the parts of the app that need Fitlog data.
export function FitlogProvider({ children }: { children: ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);

  function addToPlan(workout: Workout) {
    const workoutIsAlreadyInPlan = planList.some(
      planWorkout => planWorkout.id === workout.id,
    );

    if (workoutIsAlreadyInPlan) {
      toast.error("Already in today's plan");
      return;
    }

    const planIsFull = planList.length >= 5;

    if (planIsFull) {
      toast.error('Plan is full. Maximum 5 lifts');
      return;
    }

    setPlanList([...planList, workout]);
    toast.success("Added to today's plan");
  }

  function saveForLater(workout: Workout) {
    const workoutIsAlreadySaved = savedList.some(
      savedWorkout => savedWorkout.id === workout.id,
    );

    if (workoutIsAlreadySaved) {
      toast.error('Already saved');
      return;
    }

    setSavedList([...savedList, workout]);
    toast.success('Saved for later');
  }

  return (
    <FitlogContext.Provider
      value={{
        planList,
        savedList,
        addToPlan,
        saveForLater,
      }}
    >
      {children}
    </FitlogContext.Provider>
  );
}


export function useFitlog() {
  const context = useContext(FitlogContext);

  if (context === null) {
    throw new Error('useFitlog must be used inside FitlogProvider');
  }

  return context;
}

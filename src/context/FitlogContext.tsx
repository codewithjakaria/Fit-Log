'use client';

import { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';
import type { Workout } from '@/lib/api';

type FitlogContextType = {
  planList: Workout[];
  savedList: Workout[];
  addToPlan: (workout: Workout) => void;
  saveForLater: (workout: Workout) => void;
};

const FitlogContext = createContext<FitlogContextType | null>(null);

export function FitlogProvider({ children }: { children: React.ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);

  function addToPlan(workout: Workout) {
    const alreadyAdded = planList.some(function (item) {
      return item.id === workout.id;
    });

    if (alreadyAdded) {
      toast.error("Already in today's plan");
      return;
    }

    if (planList.length >= 5) {
      toast.error('Plan is full. Maximum 5 lifts');
      return;
    }

    setPlanList([...planList, workout]);
    toast.success("Added to today's plan");
  }

  function saveForLater(workout: Workout) {
    const alreadySaved = savedList.some(function (item) {
      return item.id === workout.id;
    });

    if (alreadySaved) {
      toast.error('Already saved');
      return;
    }

    setSavedList([...savedList, workout]);
    toast.success('Saved for later');
  }

  return (
    <FitlogContext.Provider
      value={{ planList, savedList, addToPlan, saveForLater }}
    >
      {children}
    </FitlogContext.Provider>
  );
}

export function useFitlog() {
  const context = useContext(FitlogContext);

  if (!context) {
    throw new Error('useFitlog must be used inside FitlogProvider');
  }

  return context;
}

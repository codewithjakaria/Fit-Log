'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import toast from 'react-hot-toast';
import type { Workout } from '@/lib/api';

interface FitlogContextType {
  planList: Workout[];
  savedList: Workout[];
  completedWorkoutIds: number[];
  addToPlan(workout: Workout): void;
  saveForLater(workout: Workout): void;
  markAsDone(id: number): void;
  removeFromPlan(id: number): void;
  removeFromSaved(id: number): void;
}

const FitlogContext = createContext<FitlogContextType | null>(null);

export function FitlogProvider({ children }: { children: ReactNode }) {
  const [planList, setPlanList] = useState<Workout[]>([]);
  const [savedList, setSavedList] = useState<Workout[]>([]);
  const [completedWorkoutIds, setCompletedWorkoutIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedPlan = localStorage.getItem('fitlog-plan-list');
      const savedWorkouts = localStorage.getItem('fitlog-saved-list');
      const savedDoneIds = localStorage.getItem('fitlog-completed-ids');

      if (savedPlan) {
        setPlanList(JSON.parse(savedPlan) as Workout[]);
      }

      if (savedWorkouts) {
        setSavedList(JSON.parse(savedWorkouts) as Workout[]);
      }

      if (savedDoneIds) {
        setCompletedWorkoutIds(JSON.parse(savedDoneIds) as number[]);
      }
    } catch {
      setPlanList([]);
      setSavedList([]);
      setCompletedWorkoutIds([]);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    localStorage.setItem('fitlog-plan-list', JSON.stringify(planList));
    localStorage.setItem('fitlog-saved-list', JSON.stringify(savedList));
    localStorage.setItem(
      'fitlog-completed-ids',
      JSON.stringify(completedWorkoutIds),
    );
  }, [planList, savedList, completedWorkoutIds, isLoaded]);

  function addToPlan(workout: Workout) {
    if (planList.some(item => item.id === workout.id)) {
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
    if (savedList.some(item => item.id === workout.id)) {
      toast.error('Already saved');
      return;
    }

    setSavedList([...savedList, workout]);
    toast.success('Saved for later');
  }

  function markAsDone(id: number) {
    if (completedWorkoutIds.includes(id)) {
      return;
    }

    setCompletedWorkoutIds([...completedWorkoutIds, id]);
    toast.success('Workout marked as done');
  }

  function removeFromPlan(id: number) {
    setPlanList(planList.filter(workout => workout.id !== id));
    setCompletedWorkoutIds(
      completedWorkoutIds.filter(workoutId => workoutId !== id),
    );
    toast.success('Workout removed from today’s plan');
  }

  function removeFromSaved(id: number) {
    setSavedList(savedList.filter(workout => workout.id !== id));
    toast.success('Workout removed from saved');
  }

  return (
    <FitlogContext.Provider
      value={{
        planList,
        savedList,
        completedWorkoutIds,
        addToPlan,
        saveForLater,
        markAsDone,
        removeFromPlan,
        removeFromSaved,
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

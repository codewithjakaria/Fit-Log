export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

const MAIN_API = 'https://api.abcz.workers.dev/api/fitlog';
const BACKUP_API = 'https://api.api-store.workers.dev/api/fitlog';

async function fetchFromApi(path: string) {
  try {
    const res = await fetch(MAIN_API + path);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log('Main API failed');
  }

  try {
    const res = await fetch(BACKUP_API + path);
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.log('Backup API failed');
  }

  throw new Error('Failed to load data');
}

export async function getAllWorkouts(): Promise<Workout[]> {
  return fetchFromApi('');
}

export async function getWorkoutById(id: string): Promise<Workout> {
  return fetchFromApi('/' + id);
}

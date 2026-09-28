import Image from 'next/image';
import Link from 'next/link';
import { Clock, Flame, Star } from 'lucide-react';
import type { Workout } from '@/lib/api';

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={'/workouts/' + workout.id}
      className="block overflow-hidden rounded-2xl border border-[#222630] bg-[#15171D] transition hover:border-[#CCFF00]"
    >
      <div className="relative h-56 w-full">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {workout.muscleGroups.map(function (group) {
            return (
              <span
                key={group}
                className="rounded-full bg-[#CCFF00] px-3 py-1 text-xs font-bold uppercase text-black"
              >
                {group}
              </span>
            );
          })}
        </div>

        <h3 className="font-oswald mt-4 text-2xl font-bold uppercase text-white">
          {workout.name}
        </h3>
        <p className="mt-1 text-sm text-gray-400">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-5 border-t border-[#222630] pt-4 text-sm text-gray-300">
          <span className="flex items-center gap-1.5">
            <Clock size={16} className="text-[#CCFF00]" />
            {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={16} className="text-[#CCFF00]" />
            {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={16} className="text-[#CCFF00]" />
            {workout.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}

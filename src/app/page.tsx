import Hero from '@/components/home/Hero';
import WorkoutLibrary from '@/components/home/WorkoutLibrary';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0C0D10] px-6 py-8">
      <Hero />

      <section id="library" className="mx-auto mt-16 max-w-[1600px]">
        <h2 className="font-oswald text-4xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="mb-10 mt-2 text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>

        <WorkoutLibrary />
      </section>
    </main>
  );
}

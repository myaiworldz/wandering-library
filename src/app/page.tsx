import Link from "next/link";

const SAMPLE_JOURNEY = {
  title: "The Little Prince",
  author: "Antoine de Saint-Exupéry",
  notes: [
    {
      name: "Priya",
      town: "Norwich",
      note: "This book found me on a rainy day when I needed it most.",
    },
    {
      name: "Tom",
      town: "Cambridge",
      note: "I read it on a train and missed my stop.",
    },
    {
      name: "Aisha",
      town: "Ipswich",
      note: "Passing this on with a little more hope than I found it with.",
    },
  ],
};

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-6 py-24 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        The Wandering Library
      </h1>
      <p className="mt-4 max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Every book has a journey. Swap one, and leave a note for the next reader.
      </p>
      <Link
        href="/about"
        className="mt-8 text-base font-medium underline underline-offset-4"
      >
        How it works
      </Link>

      <section className="mt-24 w-full max-w-md text-left">
        <h2 className="text-center text-2xl font-semibold tracking-tight">
          A book&apos;s journey
        </h2>
        <p className="mt-2 text-center text-zinc-600 dark:text-zinc-400">
          {SAMPLE_JOURNEY.title} by {SAMPLE_JOURNEY.author}
        </p>
        <ol className="mt-8 flex flex-col">
          {SAMPLE_JOURNEY.notes.map((entry, index) => (
            <li key={entry.name} className="relative flex gap-4 pb-8 last:pb-0">
              <span className="flex flex-none flex-col items-center">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 flex-none rounded-full bg-zinc-900 dark:bg-white"
                />
                {index < SAMPLE_JOURNEY.notes.length - 1 && (
                  <span
                    aria-hidden="true"
                    className="mt-1 w-px flex-1 bg-zinc-300 dark:bg-zinc-700"
                  />
                )}
              </span>
              <div className="-mt-1">
                <p className="font-medium">
                  {entry.name}, {entry.town}
                </p>
                <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                  {entry.note}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}

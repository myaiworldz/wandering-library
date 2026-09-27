const STEPS = [
  {
    title: "Bring a book",
    description: "Pick a book you've finished and are ready to pass on.",
  },
  {
    title: "Swap it",
    description: "Trade it with another reader for one of theirs.",
  },
  {
    title: "Leave a note",
    description: "Add a few words for whoever reads it next.",
  },
];

export default function About() {
  return (
    <main className="mx-auto flex max-w-2xl flex-1 flex-col px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        How it works
      </h1>
      <ol className="mt-10 flex flex-col gap-8">
        {STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              aria-hidden="true"
              className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-zinc-900 text-sm font-medium text-white dark:bg-white dark:text-zinc-900"
            >
              {index + 1}
            </span>
            <div>
              <h2 className="font-medium">{step.title}</h2>
              <p className="mt-1 text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </main>
  );
}

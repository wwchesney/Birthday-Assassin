export default function MissionBlock({ celebrantName }: { celebrantName: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-left dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="mb-2 text-lg font-medium text-zinc-950 dark:text-zinc-50">
        Your Mission
      </h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Set up and plan a birthday celebration for {celebrantName} — this can
        be as little as finding a date and picking out a dessert.
      </p>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Responsibilities:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>
            Choose a date, working with the birthday person and others to
            accommodate the most people
          </li>
          <li>Plan a fun evening hangout, with your own twist on what happens</li>
          <li>
            Pick a birthday food item — cake or another dessert — and either
            buy it or bake it
          </li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          What you don&apos;t need to do:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Buy presents</li>
          <li>Spend $100 on food — this should be fun, not a burden</li>
        </ul>
      </div>

      <div className="mt-4">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Do not:
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-400">
          <li>Forget to set this up entirely</li>
          <li>Spend 5 minutes planning (it&apos;s your friend — do something nice)</li>
          <li>Spend 10 hours planning (it&apos;s not that deep)</li>
          <li>Wait until the last minute — earlier planning = better outcome</li>
          <li>
            Delegate this to others — you should be the point person and do
            90%+ of the effort
          </li>
        </ul>
      </div>
    </div>
  );
}

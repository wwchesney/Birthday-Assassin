import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-24 dark:bg-black">
      <main className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            🎯 Birthday Assassin
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Sign up, then check back to find out whose birthday you&apos;re
            planning.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center rounded-full bg-zinc-950 px-5 font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
          >
            Sign up
          </Link>
          <Link
            href="/lookup"
            className="flex h-12 w-full items-center justify-center rounded-full border border-zinc-300 px-5 font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
          >
            Find my person
          </Link>
        </div>
      </main>
    </div>
  );
}

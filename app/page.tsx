import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-24">
      <main className="flex w-full max-w-sm flex-col items-center gap-8 text-center">
        <div className="space-y-2">
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-ink">
            Birthday Assassin
          </h1>
          <p className="text-muted">
            Sign up, then check back to find out whose birthday you&apos;re
            planning.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Link
            href="/signup"
            className="flex h-12 w-full items-center justify-center rounded-full bg-blood px-5 font-medium text-ink transition-colors hover:bg-blood/90"
          >
            Sign up
          </Link>
          <Link
            href="/lookup"
            className="flex h-12 w-full items-center justify-center rounded-full border border-rule px-5 font-medium text-ink transition-colors hover:bg-panel"
          >
            Find my person
          </Link>
        </div>
      </main>
    </div>
  );
}

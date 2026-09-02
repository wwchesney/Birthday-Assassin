import LookupForm from "./LookupForm";

export default function LookupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Find your person
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          Enter your name and phone number to see who you&apos;re planning
          for.
        </p>
      </div>
      <LookupForm />
    </div>
  );
}

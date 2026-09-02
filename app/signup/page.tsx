import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 px-6 py-16 dark:bg-black">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
          Join Birthday Assassin
        </h1>
        <p className="mt-1 text-zinc-600 dark:text-zinc-400">
          We&apos;ll match you with someone to plan a surprise for.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}

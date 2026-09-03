import LookupForm from "./LookupForm";

export default function LookupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-16">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink">
          Find Your Contract
        </h1>
        <p className="mt-1 text-muted">
          Enter your name and phone number to see who you&apos;re planning
          for.
        </p>
      </div>
      <LookupForm />
    </div>
  );
}

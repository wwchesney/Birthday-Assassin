import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-canvas px-6 py-16">
      <div className="mb-6 text-center">
        <h1 className="font-heading text-3xl font-semibold tracking-tight text-ink">
          Sign the Ledger
        </h1>
        <p className="mt-1 text-muted">
          Join the Order. We&apos;ll match you with someone to plan a surprise
          for.
        </p>
      </div>
      <SignupForm />
    </div>
  );
}

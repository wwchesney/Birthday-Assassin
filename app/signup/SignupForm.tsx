"use client";

import { useActionState } from "react";
import { signup, type SignupState } from "./actions";

const initialState: SignupState = { status: "idle" };

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  if (state.status === "success") {
    return (
      <div className="w-full max-w-sm rounded-2xl border border-rule bg-panel p-8 text-center">
        <p className="font-heading text-2xl font-semibold text-ink">
          You&apos;re in. Tell no one.
        </p>
        <p className="mt-2 text-muted">
          Check back once everyone has joined and pairings have been
          generated.
        </p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-4 rounded-2xl border border-rule bg-panel p-8"
    >
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium text-muted">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full rounded-lg border border-rule bg-canvas px-3 py-2 text-ink focus:border-blood focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="phone" className="text-sm font-medium text-muted">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          placeholder="603-555-1234"
          autoComplete="tel"
          className="w-full rounded-lg border border-rule bg-canvas px-3 py-2 text-ink placeholder:text-muted/60 focus:border-blood focus:outline-none"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="birthday" className="text-sm font-medium text-muted">
          Birthday
        </label>
        <input
          id="birthday"
          name="birthday"
          type="date"
          required
          className="w-full rounded-lg border border-rule bg-canvas px-3 py-2 text-ink focus:border-blood focus:outline-none"
        />
      </div>

      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center rounded-full bg-blood px-5 font-medium text-ink transition-colors hover:bg-blood/90 disabled:opacity-50"
      >
        {pending ? "Signing up…" : "Sign up"}
      </button>
    </form>
  );
}

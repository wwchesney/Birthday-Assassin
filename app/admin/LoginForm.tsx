"use client";

import { useActionState } from "react";
import { adminLogin, type LoginState } from "./actions";

const initialState: LoginState = { status: "idle" };

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(adminLogin, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-sm space-y-4 rounded-2xl border border-rule bg-panel p-8"
    >
      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-muted">
          Admin password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
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
        {pending ? "Checking…" : "Enter"}
      </button>
    </form>
  );
}

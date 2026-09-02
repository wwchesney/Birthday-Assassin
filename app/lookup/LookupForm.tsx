"use client";

import { useActionState } from "react";
import { lookupParticipant, type LookupState } from "./actions";
import GroupChatButton from "./GroupChatButton";

const initialState: LookupState = { status: "idle" };

function formatBirthday(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
}

export default function LookupForm() {
  const [state, formAction, pending] = useActionState(lookupParticipant, initialState);

  return (
    <div className="w-full max-w-sm space-y-6">
      <form
        action={formAction}
        className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-950"
      >
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-950 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="phone" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Phone number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="603-555-1234"
            autoComplete="tel"
            className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-950 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
          />
        </div>

        {state.status === "error" && (
          <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full items-center justify-center rounded-full bg-zinc-950 px-5 font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          {pending ? "Looking up…" : "Find my person"}
        </button>
      </form>

      {state.status === "not-paired" && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
          <p className="text-lg font-medium text-zinc-950 dark:text-zinc-50">
            Mystery person not yet revealed 🎉
          </p>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Placeholder birthday: January 1
          </p>
        </div>
      )}

      {state.status === "paired" && (
        <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-950">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-500">
              You&apos;re planning for
            </p>
            <p className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">
              {state.celebrantName}
            </p>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {formatBirthday(state.celebrantBirthday)}
            </p>
          </div>
          <GroupChatButton numbers={state.groupNumbers} />
        </div>
      )}
    </div>
  );
}

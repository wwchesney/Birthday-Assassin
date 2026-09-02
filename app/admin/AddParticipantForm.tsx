"use client";

import { useActionState, useRef, useEffect } from "react";
import { addParticipant, type ParticipantFormState } from "./actions";

const initialState: ParticipantFormState = { status: "idle" };

export default function AddParticipantForm() {
  const [state, formAction, pending] = useActionState(addParticipant, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "idle" && !pending) {
      formRef.current?.reset();
    }
  }, [state, pending]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="flex flex-col gap-3 sm:flex-row sm:items-end"
    >
      <div className="flex-1 space-y-1">
        <label htmlFor="add-name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Name
        </label>
        <input
          id="add-name"
          name="name"
          type="text"
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-950 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label htmlFor="add-phone" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Phone
        </label>
        <input
          id="add-phone"
          name="phone"
          type="tel"
          required
          placeholder="603-555-1234"
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-950 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <div className="flex-1 space-y-1">
        <label htmlFor="add-birthday" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
          Birthday
        </label>
        <input
          id="add-birthday"
          name="birthday"
          type="date"
          required
          className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-950 focus:border-zinc-500 focus:outline-none dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="h-9 shrink-0 rounded-full bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {pending ? "Adding…" : "Add participant"}
      </button>
      {state.status === "error" && (
        <p className="w-full text-sm text-red-600 dark:text-red-400 sm:basis-full">
          {state.message}
        </p>
      )}
    </form>
  );
}

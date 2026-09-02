"use client";

import { useActionState, useState } from "react";
import { generatePairings, type PairingState } from "./actions";

const initialState: PairingState = { status: "idle" };

export default function GeneratePairingsButton({
  pairingsExist,
  participantCount,
}: {
  pairingsExist: boolean;
  participantCount: number;
}) {
  const [state, formAction, pending] = useActionState(generatePairings, initialState);
  const [confirming, setConfirming] = useState(false);

  if (state.status === "success") {
    return (
      <p className="text-sm font-medium text-green-700 dark:text-green-400">
        {state.message}
      </p>
    );
  }

  const alreadyExist = pairingsExist || state.status === "confirm-required";

  if (alreadyExist && !confirming) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-amber-700 dark:text-amber-400">
          Pairings have already been generated.
        </p>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="h-10 rounded-full border border-amber-400 px-4 text-sm font-medium text-amber-700 transition-colors hover:bg-amber-50 dark:border-amber-600 dark:text-amber-400 dark:hover:bg-amber-950"
        >
          Regenerate pairings…
        </button>
      </div>
    );
  }

  if (alreadyExist && confirming) {
    return (
      <form action={formAction} className="space-y-2">
        <input type="hidden" name="confirm" value="true" />
        <p className="text-sm text-red-600 dark:text-red-400">
          This replaces the existing pairings and can&apos;t be undone. Are you
          sure?
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="h-10 rounded-full bg-red-600 px-4 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:opacity-50"
          >
            {pending ? "Regenerating…" : "Yes, regenerate"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="h-10 rounded-full border border-zinc-300 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <form action={formAction} className="space-y-2">
      {participantCount < 2 && (
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          Need at least 2 people to generate pairings.
        </p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-red-600 dark:text-red-400">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={participantCount < 2 || pending}
        className="h-10 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {pending ? "Generating…" : "Generate pairings"}
      </button>
    </form>
  );
}

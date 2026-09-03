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
      <p className="text-sm font-medium text-green-400">
        {state.message}
      </p>
    );
  }

  const alreadyExist = pairingsExist || state.status === "confirm-required";

  if (alreadyExist && !confirming) {
    return (
      <div className="space-y-2">
        <p className="text-sm text-amber-400">
          Pairings have already been generated.
        </p>
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="h-10 rounded-full border border-amber-600 px-4 text-sm font-medium text-amber-400 transition-colors hover:bg-amber-950/40"
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
        <p className="text-sm text-red-400">
          This replaces the existing pairings and can&apos;t be undone. Are you
          sure?
        </p>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={pending}
            className="h-10 rounded-full bg-blood px-4 text-sm font-medium text-ink transition-colors hover:bg-blood/90 disabled:opacity-50"
          >
            {pending ? "Regenerating…" : "Yes, regenerate"}
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            disabled={pending}
            className="h-10 rounded-full border border-rule px-4 text-sm font-medium text-ink transition-colors hover:bg-canvas"
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
        <p className="text-sm text-muted">
          Need at least 2 people to generate pairings.
        </p>
      )}
      {state.status === "error" && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}
      <button
        type="submit"
        disabled={participantCount < 2 || pending}
        className="h-10 rounded-full bg-blood px-5 text-sm font-medium text-ink transition-colors hover:bg-blood/90 disabled:opacity-50"
      >
        {pending ? "Generating…" : "Generate pairings"}
      </button>
    </form>
  );
}

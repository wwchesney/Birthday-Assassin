"use client";

import { useActionState } from "react";
import { lookupParticipant, type LookupState } from "./actions";
import GroupChatButton from "./GroupChatButton";
import MissionBlock from "./MissionBlock";
import WaxSeal from "./WaxSeal";

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
        className="space-y-4 rounded-2xl border border-rule bg-panel p-8"
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

        {state.status === "error" && (
          <p className="text-sm text-red-400">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="flex h-11 w-full items-center justify-center rounded-full bg-blood px-5 font-medium text-ink transition-colors hover:bg-blood/90 disabled:opacity-50"
        >
          {pending ? "Looking up…" : "Find my person"}
        </button>
      </form>

      {state.status === "not-paired" && (
        <div className="flex flex-col items-center gap-4 py-4 text-center">
          <WaxSeal />
          <div>
            <p className="font-heading text-2xl font-semibold text-ink">
              Sealed. Your contract awaits.
            </p>
            <p className="mt-2 text-muted">
              Check back once everyone&apos;s joined.
            </p>
          </div>
        </div>
      )}

      {state.status === "paired" && (
        <div className="space-y-4">
          <div className="dossier-reveal space-y-4 rounded-2xl bg-parchment p-8 text-center shadow-xl shadow-black/30">
            <div>
              <p className="text-sm text-ink-on-parchment/60">
                You&apos;re planning for
              </p>
              <p className="font-heading text-3xl font-semibold text-ink-on-parchment">
                {state.celebrantName}
              </p>
              <p className="mt-1 text-ink-on-parchment/70">
                {formatBirthday(state.celebrantBirthday)}
              </p>
            </div>
            <MissionBlock celebrantName={state.celebrantName} />
          </div>
          <GroupChatButton numbers={state.groupNumbers} />
        </div>
      )}
    </div>
  );
}

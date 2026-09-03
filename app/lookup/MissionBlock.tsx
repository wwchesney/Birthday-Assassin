import type { ReactNode } from "react";

function Section({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="mt-4 first:mt-0">
      <p className="text-xs font-semibold tracking-widest text-ink-on-parchment/60 uppercase">
        {label}
      </p>
      <div className="mt-1 border-t border-ink-on-parchment/15 pt-2">
        {children}
      </div>
    </div>
  );
}

export default function MissionBlock({ celebrantName }: { celebrantName: string }) {
  return (
    <div className="text-left">
      <Section label="Target">
        <p className="text-sm text-ink-on-parchment">
          Set up and plan a birthday celebration for {celebrantName} — this
          can be as little as finding a date and picking out a dessert.
        </p>
      </Section>

      <Section label="Objective">
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-on-parchment">
          <li>
            Choose a date, working with the birthday person and others to
            accommodate the most people
          </li>
          <li>Plan a fun evening hangout, with your own twist on what happens</li>
          <li>
            Pick a birthday food item — cake or another dessert — and either
            buy it or bake it
          </li>
        </ul>
      </Section>

      <Section label="Constraints">
        <p className="text-[11px] font-medium tracking-wide text-ink-on-parchment/50 uppercase">
          Not required
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-on-parchment">
          <li>Buy presents</li>
          <li>Spend $100 on food — this should be fun, not a burden</li>
        </ul>

        <p className="mt-3 text-[11px] font-medium tracking-wide text-ink-on-parchment/50 uppercase">
          Do not
        </p>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-on-parchment">
          <li>Forget to set this up entirely</li>
          <li>Spend 5 minutes planning (it&apos;s your friend — do something nice)</li>
          <li>Spend 10 hours planning (it&apos;s not that deep)</li>
          <li>Wait until the last minute — earlier planning = better outcome</li>
          <li>
            Delegate this to others — you should be the point person and do
            90%+ of the effort
          </li>
        </ul>
      </Section>
    </div>
  );
}

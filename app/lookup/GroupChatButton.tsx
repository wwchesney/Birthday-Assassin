"use client";

import { useState } from "react";

export default function GroupChatButton({ numbers }: { numbers: string[] }) {
  const [copied, setCopied] = useState(false);

  if (numbers.length === 0) return null;

  const body = "Let's plan something fun for their birthday 🎉";
  const smsHref = `sms:${numbers.join(",")}&body=${encodeURIComponent(body)}`;

  async function copyNumbers() {
    try {
      await navigator.clipboard.writeText(numbers.join(", "));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable; nothing to fall back to here
    }
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <a
        href={smsHref}
        className="flex h-11 flex-1 items-center justify-center rounded-full bg-blood px-5 text-sm font-medium text-ink transition-colors hover:bg-blood/90"
      >
        Assemble your conspirators
      </a>
      <button
        type="button"
        onClick={copyNumbers}
        className="flex h-11 flex-1 items-center justify-center rounded-full border border-rule px-5 text-sm font-medium text-ink transition-colors hover:bg-panel"
      >
        {copied ? "Copied!" : "Copy all numbers"}
      </button>
    </div>
  );
}

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
        className="flex h-11 flex-1 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        Start the group chat
      </a>
      <button
        type="button"
        onClick={copyNumbers}
        className="flex h-11 flex-1 items-center justify-center rounded-full border border-zinc-300 px-5 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        {copied ? "Copied!" : "Copy all numbers"}
      </button>
    </div>
  );
}

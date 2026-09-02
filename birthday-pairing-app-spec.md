# Birthday Celebration Pairing App — Build Spec

## Overview
A small web app for a friend group where each person gets randomly assigned another person ("their celebrant") whose birthday they are responsible for planning a surprise celebration and gift for. Signups happen first; the admin (me) triggers random pairing once everyone has joined; **the admin must never be able to see the resulting pairings** — only each individual participant can look up their own assignment.

## Tech Stack
- **Framework:** Next.js (App Router), deployed on Vercel
- **Database:** Vercel Postgres (or Neon via Vercel integration) — simplest managed relational option that plugs directly into Vercel
- **Styling:** Tailwind (default, keep it simple/clean, no design system needed)
- **No user auth system needed** — see "Access model" below

## Data Model

**`participants` table**
- `id` (uuid, pk)
- `name` (text)
- `phone` (text, store in E.164 format, e.g. +16035551234)
- `birthday` (date)
- `created_at` (timestamp)

**`pairings` table**
- `id` (uuid, pk)
- `assigner_id` (fk → participants.id) — the person who has to plan
- `celebrant_id` (fk → participants.id) — the person whose birthday is being planned
- `created_at` (timestamp)

Note: `pairings` should be empty until the admin explicitly triggers pairing generation.

## Pages & Flows

### 1. `/signup` (public)
- Simple form: Name, Phone Number, Birthday (date picker)
- On submit, insert into `participants`
- Confirmation message after submitting ("You're in! Check back once everyone has joined.")
- Basic validation: phone in valid format, no duplicate phone numbers

### 2. `/admin` (password-protected)
- Gate with a single shared password stored in an environment variable (`ADMIN_PASSWORD`), simple session cookie after entering it correctly — no need for full auth/user accounts
- **Participant management:**
  - Table listing all current participants (name, phone, birthday, joined date)
  - "Add participant" form (manually add someone who didn't self-signup — for testing)
  - "Remove participant" button per row (deletes from `participants`; if pairings already exist, cascade-delete related rows in `pairings` too so the data stays consistent)
- **Trigger pairing button:**
  - "Generate Pairings" button — runs the random assignment algorithm server-side and writes directly to the `pairings` table
  - **Critical constraint: the result must never be returned to the admin's browser, logged to the console, or displayed anywhere in the admin UI.** The server action should write to the DB and respond with only a generic success message ("Pairings generated!") — no data about who got whom, not even indirectly (e.g. no "X pairings created between these IDs" with any names attached)
  - Button should be disabled / show a warning if pairings already exist, to avoid accidentally regenerating (with an explicit "regenerate anyway" confirm step)
- The admin page must **not** have any view, export, or debug route that displays the `pairings` table contents. Don't build one "just in case."

### 3. `/lookup` (public)
- Form: enter your Name + Phone Number
- On match, show:
  - If no pairing exists yet: "Mystery person not yet revealed 🎉" with a placeholder birthday of **January 1**
  - If a pairing exists: the celebrant's name and real birthday
  - A **"Start the group chat"** button (see below)

## Group Chat Button (SMS deep link strategy)
- Purpose: lets the assigner instantly start an iMessage/SMS group text with **everyone in the friend group except the celebrant**, to coordinate the surprise
- Implementation: use an `sms:` URI link, e.g.:
  ```
  sms:+16035551111,+16035552222,+16035553333&body=Let%27s%20plan%20something%20fun%20for%20their%20birthday%20%F0%9F%8E%89
  ```
  - Comma-separated numbers works reliably on iOS Messages. Android handling of multi-recipient `sms:` links is inconsistent across devices/carriers, so:
    - Also show a **"Copy all numbers"** button as a fallback that copies a comma-separated list to clipboard, in case the direct link doesn't open a group thread on someone's device
  - Exclude the celebrant's own number and the assigner's own number from the recipient list (you don't need to text yourself)
  - Only include participants who existed at the time pairing was generated (edge case: if someone is removed after pairings are set, handle gracefully — just skip missing numbers rather than erroring)

## Pairing Algorithm
- Random derangement: everyone is assigned exactly one other person, nobody is assigned themselves, and it should be a single pass with no built-in "fairness" logic beyond avoiding self-assignment (v1 doesn't need to prevent mutual pairs A→B/B→A — that's fine if it happens)
- If participant count is 1, show an error and don't generate ("need at least 2 people")
- Algorithm should retry internally if a naive shuffle produces a self-assignment, rather than surfacing an error to the admin

## Not in scope for v1
- No email notifications
- No login/password per participant (name+phone lookup is enough security for a friend group)
- No editing of birthday celebration status/gift tracking — just the assignment + group chat kickoff
- No repeat-year logic (e.g. avoiding last year's pairing) — can be added later

## Environment Variables Needed
- `ADMIN_PASSWORD` — shared password for `/admin`
- Vercel Postgres connection string (auto-provided by Vercel integration)

## Suggested build order
1. DB schema + Postgres connection
2. `/signup` page + insert logic
3. `/admin` page: participant list, add, remove (password-gated)
4. Pairing generation server action (write-only, no readback)
5. `/lookup` page with placeholder state + real assignment state
6. SMS group chat link + copy-numbers fallback

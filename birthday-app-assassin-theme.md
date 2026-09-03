# Addition: Assassin/Medieval visual theme (dark, cheeky)

This is a design pass on top of the already-built birthday pairing app. No functional/data changes — purely the visual layer across the existing pages (`/signup`, `/lookup`, `/admin`).

## Fonts
Load via Google Fonts:
- **Cormorant SC** (names, titles, headings only) — a small-caps manuscript-feel serif. Use sparingly, for the theatrical moments (names, "Your Contract," house/page titles).
- **Inter** (everything else — body text, buttons, form labels, the mission brief text) — clean modern sans. The deliberate mismatch between an old-manuscript headline face and a plain modern body face is the joke: it's winking at the theme, not in full costume.

## Color tokens (CSS variables)
```css
--slate-900: #23262B;   /* page background, dark charcoal-grey */
--slate-800: #2E323A;   /* panel/card background, one step lighter */
--parchment: #E8E1D3;    /* the dossier reveal card ONLY — light-on-dark moment */
--ink: #ECE9E1;          /* primary text on dark background */
--ink-on-parchment: #2B2419; /* text color when placed on the parchment card */
--muted: #9BA0A8;        /* secondary/label text, placeholders */
--blood: #8C2F2F;        /* CTA buttons, the reveal accent — muted, not neon */
--wax: #A98946;          /* wax seal motif ONLY — nowhere else */
--rule: #3A3E46;         /* hairline dividers on dark backgrounds */
```
Keep contrast accessible: `--ink` on `--slate-900`/`--slate-800` and `--ink-on-parchment` on `--parchment` should both meet WCAG AA.

## Page-by-page treatment

### `/signup`
- Framed as joining "the Order" — not a generic form. Heading in Cormorant SC, e.g. "Sign the Ledger."
- Form fields (name, phone, birthday) styled plainly in Inter on `--slate-800` panels — the theatrical language is in the copy, not the input styling.
- Confirmation after submit: something cheeky, e.g. "You're in. Tell no one." — keep it short, one line.

### `/lookup` — before reveal (no pairing yet)
- Centered **wax seal** graphic: a simple circular seal shape (SVG) in `--wax`, with a subtle crack/press detail across it — not a padlock icon, not an emoji.
- Copy beneath it: "Sealed. Your contract awaits." in Cormorant SC, with a muted Inter subline like "Check back once everyone's joined."
- Background stays `--slate-900` — no parchment yet. The seal is the only warm-toned element on the page at this stage.

### `/lookup` — after reveal (pairing exists)
- The **dossier card**: a `--parchment` panel (the one deliberate light-on-dark moment in the whole app) containing:
  - Celebrant's name in Cormorant SC, large
  - Their birthday
  - The "Your Mission" brief (from the earlier addendum) in Inter, styled like a case file — small labeled sections ("Target," "Objective," "Constraints" could replace the plainer "Responsibilities"/"Do not" headers if it reads well, but keep the actual bullet content unchanged)
- Card should look dropped onto the dark background — a slight shadow is fine here since it's meant to feel like a physical document, not a UI card.
- Group chat button copy: "Assemble your conspirators" instead of "Start group chat." Keep the actual sms: link + copy-numbers fallback functionality exactly as already built — just retitle the button and any surrounding label text.

### `/admin`
- Stays deliberately plain and utilitarian — same dark slate background and Inter body font for consistency, but no seal, no parchment, no Cormorant flourishes. This is the "back office," not the theatrical front-of-house experience.
- Participant list, add/remove forms, and the "Generate Pairings" button use standard button styling in `--blood` for primary actions, `--slate-800` panels, `--rule` dividers.

## Restraint notes
- The wax seal and the parchment dossier card are each other's counterpart — one per page state, not both at once, and no other page gets either motif.
- No parchment-texture backgrounds, no medieval border flourishes, no dagger/skull iconography — the seal + dossier contrast is doing all the thematic work.
- Motion: the seal could "crack" open with a brief transition when a reveal happens (e.g. on page load if a pairing just became available) — one moment only, not on every interaction.

## Accessibility / quality floor
- Mobile-first: seal graphic and dossier card should scale down cleanly on narrow screens without losing legibility.
- Visible keyboard focus states using `--blood`.
- Respect `prefers-reduced-motion` for the seal-crack transition.

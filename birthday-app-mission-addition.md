# Addition: "Your Mission" block on the /lookup page

This is a follow-up to the original birthday pairing app spec. The app is already built — this just adds one static content block to the existing `/lookup` page.

## Where it goes
On the `/lookup` page, **only in the "real pairing exists" state** (i.e. do NOT show this on the "Mystery person not yet revealed" placeholder state). Place it directly below the celebrant's name/birthday, above the "Start the group chat" / "Copy numbers" buttons.

## Behavior
- Static text (hardcoded, not stored in the database or editable via admin for now)
- Always visible when a real assignment is shown — not collapsible
- Same content for every user, regardless of who their celebrant is

## Content to render

```
Your Mission

Set up and plan a birthday celebration for [celebrant name] — this can be
as little as finding a date and picking out a dessert.

Responsibilities:
- Choose a date, working with the birthday person and others to accommodate
  the most people
- Plan a fun evening hangout, with your own twist on what happens
- Pick a birthday food item — cake or another dessert — and either buy it
  or bake it

What you don't need to do:
- Buy presents
- Spend $100 on food — this should be fun, not a burden

Do not:
- Forget to set this up entirely
- Spend 5 minutes planning (it's your friend — do something nice)
- Spend 10 hours planning (it's not that deep)
- Wait until the last minute — earlier planning = better outcome
- Delegate this to others — you should be the point person and do 90%+
  of the effort
```

Note: `[celebrant name]` should be dynamically interpolated with the actual celebrant's name pulled from the existing pairing lookup — everything else in the block is static text.

## Styling
Match the existing page's card/section styling already in use elsewhere on `/lookup` — no new design system needed, just a plain content card consistent with the rest of the app.

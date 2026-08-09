# Spec: Scale Reading Headings & Superscripts with Text Size

Follow-up to `docs/specs/liturgical-contrast-and-scaling.md`. Addresses a
mobile-readability gap: the section heading and Psalm-superscription text
that appear inside a reading passage are hardcoded pixel values, unaffected
by the Text Size (Small/Medium/Large) control that already resizes
everything else in the passage.

## Problem

Two elements appear inside every reading passage, on both the HelloAO and
ESV rendering paths, and neither responds to Text Size today:

| Element | HelloAO source | ESV source | Current size |
|---|---|---|---|
| Section heading | `ReadingPassage.tsx` / `VersePassage.tsx`, `line.type === "heading"` → `<h4 class="... text-primary ... text-[24px] ...">` | ESV API HTML `<h3>` (pericope title, and `<h3 class="psalm-book">` — see below) | HelloAO: flat `24px`. ESV: unset — falls back to the browser default `h3` size (~1.17em of ambient font, ~18.7px), the only place in the app relying on an unstyled UA default rather than an explicit value. |
| Superscription | `line.type === "hebrew_subtitle"` → `<p class="... text-gold italic ... text-[15px] ...">` | ESV API HTML `<h4 class="psalm-title">` | HelloAO: flat `15px`. ESV: explicit `15px` (`globals.css` `.esv-passage > h4.psalm-title`). |
| Reading text (for comparison) | `Verse.tsx`, via `fontSizeClass` | `.esv-passage p`, via `.size-small`/`.size-large` wrapper class | 17 / **19** / 22px (small/medium/large) |

Both elements are visually distinct treatments (bigger serif heading,
smaller italic gold caption) rather than being sized relative to the
reading text a user actually chose. On mobile, a user who picks "Large" for
readability sees no benefit on these two elements — they're stuck at their
flat value.

### The `psalm-book` case

Confirmed by fetching live ESV API output (`Psalm 1-3`, `Psalm 107`): when
a reading's first chapter is the start of one of the Psalter's five
traditional book divisions (chapters 1, 42, 73, 90, 107), the ESV API
inserts `<h3 class="psalm-book">Book One</h3>` (etc.) immediately before
the pericope title `<h3>`. Two lectionary dates hit this: **Sept 6** (Psalm
90 → "Book Four") and **Sept 23** (Psalm 107 → "Book Five"). It's ESV-only
— confirmed against several HelloAO translations' raw chapter JSON
(ASV, WEB, KJV, YLT) that the `ChapterContent` schema has no book-division
concept at all (only `heading` / `hebrew_subtitle` / `verse` /
`line_break`). It already renders identically to the pericope title today
(same tag, no distinguishing CSS) and is caught by the same `.esv-passage >
h3` selector used below — **decision: leave it that way**, no separate
selector or distinct treatment. Consistent with "only touch font-size,
nothing else" for this pass; a bespoke treatment for two dates on one
translation isn't warranted here.

## Reference point: unstyled ESV output

Dropping ESV's raw API HTML into a page with no custom CSS (default
browser stylesheet, 16px base) gives:

- reading text (`p`): 1em → 16px
- section heading (`h3`): 1.17em → ~18.7px (~1.17× body)
- superscription (`h4`): 1em → 16px (same size as body; distinguished only
  by bold weight, not size)

This is the ratio being adopted as the target relationship, rounded to
clean values and applied against this app's three reading-text sizes
(17/19/22) rather than a single 16px base.

## Decision

Tie both elements' size to the existing **Text Size** setting
(`selections.fontSize`), not the app-wide chrome scale
(`--app-font-scale`) added in the prior pass — these elements live inside
the reading passage, so the passage's own text-size control is the more
relevant driver.

**Section heading** — scale at ~1.17× reading text:

| fontSize | reading text | heading |
|---|---|---|
| small | 17px | **20px** |
| medium (default) | 19px | **22px** |
| large | 22px | **26px** |

**Superscription** — scale at 1× reading text (identical to body size,
matching the unstyled-ESV reference point):

| fontSize | reading text | superscription |
|---|---|---|
| small | 17px | **17px** |
| medium (default) | 19px | **19px** |
| large | 22px | **22px** |

This is an intentional change to the medium/default baseline too, not
just small/large — heading drops from a flat 24px to 22px, superscription
grows from a flat 15px to 19px. Confirmed acceptable: both elements move
to be proportionate to reading text at every tier, not just at the
extremes.

No other styling changes — heading keeps its Cormorant/semibold/maroon/
centered treatment, superscription keeps its EB Garamond/italic/gold
treatment. Only `font-size` becomes size-aware instead of a flat value.

### HelloAO implementation shape

`ReadingPassage.tsx` and `VersePassage.tsx` don't currently read
`SelectionsContext` (only the leaf `Verse` component does). Both need to
read `selections.fontSize` and use two size-class helpers in
`readingStyle.ts`:

- `headingSizeClass(fontSize)` — new function, same shape as
  `fontSizeClass`, returning `text-[20px]` / `text-[22px]` / `text-[26px]`.
- Superscription reuses the **existing** `fontSizeClass(fontSize)` directly
  (17/19/22 is already what it returns) — no new function needed there.

### ESV implementation shape

`EsvPassage.tsx` already applies `.size-small` / `.size-large` (medium =
no modifier class) to the `.esv-passage` wrapper. This is pure CSS: add
explicit base sizes to `.esv-passage > h3` and `.esv-passage >
h4.psalm-title` (currently unset / flat `15px`), plus `.size-small` /
`.size-large` overrides, mirroring the existing `.esv-passage.size-small p`
/ `.esv-passage.size-large p` pattern. `.psalm-book` is not special-cased
(see above) — it's covered by the same `.esv-passage > h3` rule. No
component/JS change on the ESV path.

## Acceptance criteria

- On a non-ESV (HelloAO) reading containing both a section heading and a
  Psalm superscription (e.g. Psalm 58 — used on Jan 30 and Aug 3), cycling
  Text Size through Small/Medium/Large visibly resizes both elements to
  20/22/26px (heading) and 17/19/22px (superscript), matching the table
  above, and the reading text resizes alongside them as it already does.
- On an ESV reading of the same passage, the same three Text Size settings
  produce the same heading/superscript sizes as the HelloAO path (parity
  between translations).
- On ESV readings for Sept 6 (Psalm 90) and Sept 23 (Psalm 107), the
  `psalm-book` divider ("Book Four" / "Book Five") resizes identically to
  the pericope title beneath it at every Text Size tier.
- Medium (default) renders at 22px heading / 19px superscript on both
  paths — the new baseline, replacing the old flat 24px / 15px.
- No change to color, weight, italic, font-family, alignment, or max-width
  of either element — only `font-size` is affected.
- Dark theme, chrome text scaling (`--app-font-scale`), and the existing
  passage-body Text Size behavior are all unaffected.

## Out of scope

- Changing the visual *character* of either element (e.g. making the
  superscript non-italic or the heading non-bold) — only their sizing
  relative to reading text.
- Any change to `--app-font-scale` or the chrome elements it already
  covers.
- A distinct treatment for `.psalm-book` vs. the plain pericope title.
- The ESV `h2` element or the `.footnotes` `h3` (deliberately excluded by
  the existing `.esv-passage > h3` child-combinator scoping) — confirmed
  live against the ESV API that `h2` never appears in fetched passage
  content; this pass doesn't add sizing for it.

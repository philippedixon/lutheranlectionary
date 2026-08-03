# Spec: Tab Contrast, Font/Size Settings, Psalm Heading Width

Source: design handoff package `Lutheran-Lectionary-Redesign-4.zip` /
`design_handoff_font_settings` (static React reference, not production code —
recreate behavior in Next.js/Tailwind). Follow-up to `nav-polish.md`.

Applies to both light/dark themes (existing palette tokens) and mobile/desktop
(responsive flex/wrap, no device-specific variants).

## 1. Reading tab contrast fix

**Problem**: `ReadingTabs.tsx` renders both active and inactive tabs in gold,
with the active underline (gold, 1.5px, via `border-b` on the button) barely
distinguishable from the label — low contrast between active/inactive states.

**Change** (`src/app/components/ReadingTabs.tsx`):
- Active tab label: `font-semibold` (600) and `text-primary` (already primary
  colored — weight is the missing piece).
- Active underline: separate element below the label (not a `border-b` on the
  button, so gap is controllable), 2px tall, `bg-primary`, with `gap-[7px]`
  between label and underline.
- Inactive tab: regular weight (400), `text-gold`, no underline (unchanged).

**Test impact**: update `ReadingTabs.spec.tsx` — assert active tab has
`font-semibold`/`text-primary` and a `bg-primary` underline element; inactive
tabs have neither.

## 2. Reading Font setting

**New feature.** Adds a "Reading Font" control to the options panel, below
Bible Translation: two selectable swatches, **EB Garamond** (default) and
**Source Serif 4**. Only affects passage body text (verse content); headings
(Cormorant Garamond) are unaffected.

**Changes**:
- `src/app/layout.tsx`: load `Source_Serif_4` via `next/font/google`
  (`variable: "--font-source-serif"`), pass its class down like the existing
  fonts.
- `tailwind.config.ts`: add `"source-serif": ["var(--font-source-serif)", "Georgia", "serif"]`
  to `fontFamily`.
- `src/app/interfaces/contexts.ts`: add `bodyFont?: "garamond" | "serif4"` to
  `Selections`.
- `src/app/reducers/selectionsReducer.ts`: add `SET_BODY_FONT` action.
- `src/app/components/OptionsPanel.tsx`: new "Reading Font" section, two
  swatch buttons (pattern matches existing Language/Translation rows),
  persists to `localStorage` under `"bodyFont"`, defaults to `"garamond"`
  when unset (mirrors the existing language-default bootstrap in the
  `useEffect`).
- `src/app/components/Verse.tsx`: body text classes (`font-eb-garamond`)
  become conditional on `selections.bodyFont` — read from
  `SelectionsContext` (already imported pattern elsewhere), map
  `"garamond" → font-eb-garamond`, `"serif4" → font-source-serif`.
- `src/app/globals.css` `.esv-passage p`/`.esv-passage .block-indent`: same
  swap, applied via a body-level class or CSS variable set on the passage
  container rather than hardcoded `var(--font-eb-garamond)` (ESV HTML is
  rendered via `dangerouslySetInnerHTML`, so the font must be controlled by
  an ancestor class, not per-node React classes).

**Test impact**: new `OptionsPanel.spec.tsx` cases for the Reading Font
section (selecting a swatch dispatches `SET_BODY_FONT`, persists to
localStorage, marks the active swatch). New/updated `Verse.spec.tsx` cases
asserting body font class follows `selections.bodyFont`.

## 3. Text Size setting

**New feature.** Adds a "Text Size" control to the options panel: three
options (Small/Medium/Large = 17px/19px/22px), each previewed at its own
size via an "A" glyph. Applies to passage body text only (not headings).

**Changes**:
- `src/app/interfaces/contexts.ts`: add `fontSize?: "small" | "medium" | "large"`
  to `Selections`.
- `src/app/reducers/selectionsReducer.ts`: add `SET_FONT_SIZE` action.
- `src/app/components/OptionsPanel.tsx`: new "Text Size" section, three
  buttons previewing "A" at 17/19/22px (matches design's ±2px-from-medium
  preview sizing), persists to `localStorage` under `"fontSize"`, defaults
  to `"medium"`.
- `src/app/components/Verse.tsx`: replace hardcoded `text-[19px]` with a size
  driven by `selections.fontSize` (17/19/22px map).
- `src/app/globals.css` `.esv-passage p`: same — driven by a class/variable
  set on an ancestor rather than a fixed `19px`.

**Test impact**: new `OptionsPanel.spec.tsx` cases for Text Size section.
Updated `Verse.spec.tsx` cases asserting size class follows
`selections.fontSize`.

## 4. Multi-reading behavior for non-today days

**Not applicable to production code.** The design mockup's own demo script
special-cases its hardcoded "today" date and shows placeholder text for every
other day — that's a limitation of the static reference file's fixture data,
not the real app. `DayPage` already fetches and tabs every actual reading for
every day via `ApiStrategyFactory`/`ReadingTabs`, with no placeholder branch.
**No change.**

## 5. Psalm heading + superscription width

**Problem A (heading width)**: the pericope heading (`<h4>` in
`ReadingPassage.tsx`/`VersePassage.tsx`) has no explicit `max-width`. It's
currently only visually narrowed when its parent picks up the
`.poetry-passage` class (table-shrink to 480px) — not guaranteed for every
heading/passage combination.

**Problem B (missing superscription)**: the API's `hebrew_subtitle` content
type (`ChapterHebrewSubtitle` in `src/app/interfaces/helloao.ts`, e.g. "A
Psalm. A song for the Sabbath day.") has **no render branch at all** in
`ReadingPassage.tsx`/`VersePassage.tsx` — only `heading`/`verse`/`line_break`
are handled, so this content is silently dropped today.

**Changes** (`src/app/components/ReadingPassage.tsx`,
`src/app/components/VersePassage.tsx`):
- Heading `<h4>`: add `max-w-[480px] mx-auto` (explicit, independent of
  `.poetry-passage`).
- New branch for `line.type === "hebrew_subtitle"`: render a centered
  `<p>`, `font-eb-garamond italic text-[15px] text-gold max-w-[480px]
  mx-auto mb-[30px]`, joining string content (ignore/flatten
  `FormattedText`/footnote-ref entries the same way headings currently
  filter to strings only — footnote markers aren't rendered inline
  elsewhere in this codebase).

**Test impact**: new `ReadingPassage.spec.tsx`/`VersePassage.spec.tsx` cases
for a `hebrew_subtitle` line rendering as a centered, width-capped
subtitle; existing heading-width assertions extended to check `max-w-[480px]`.

## Out of scope

- Any change to `EsvPassage.tsx`'s heading (ESV HTML doesn't expose a
  `hebrew_subtitle`-equivalent separately from its own `<h3>`/`<h4>` markup;
  no action needed there for item 5).
- Persisting `bodyFont`/`fontSize` server-side or via cookies — localStorage
  only, matching the existing `language`/`translation` pattern.

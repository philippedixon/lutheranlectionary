# Spec: Navigation Polish (Back-to-Top, Prev/Next Day, Dedup Title)

Source: design handoff package `Lutheran_Lectionary_Redesign_v3/design_handoff_nav_polish`
(static React reference, not production code — recreate behavior in Next.js/Tailwind).

Applies to both light/dark themes (existing palette tokens) and mobile/desktop
(responsive flex/wrap, no device-specific variants).

## 1. Remove duplicated reading title (day page)

**Problem**: the active reading's title renders twice — once in `ReadingTabs`, again
as a standalone `<h3 data-testid="title">` in the passage component.

**Change**: delete the standalone title `<h3>` from:
- `src/app/components/ReadingPassage.tsx` (line ~30)
- `src/app/components/VersePassage.tsx` (line ~20 area)
- `src/app/components/EsvPassage.tsx` (line ~14 area)

The tab row (`ReadingTabs`) remains the only place the reading label appears.
The content's own pericope heading (`<h4>`, e.g. "Your Throne, O God, Is Forever")
follows directly with no title line above it.

**Test impact**: update `ReadingPassage.spec.tsx`, `VersePassage.spec.tsx`,
`EsvPassage.spec.tsx` — remove/replace assertions on `data-testid="title"`.

## 2. Passage subheading size

Confirm pericope heading (`<h4>` in `ReadingPassage`, equivalents in
`VersePassage`/`EsvPassage`) is centered, 24px, Cormorant Garamond weight 600,
`margin-bottom: 28px`. Net change from current styling is expected to be
minor/cosmetic (centering + explicit size), since 24px is already the settled value.

## 3. Back-to-top + Prev/Next Day nav (day page)

Add a nav row below the passage content in `src/app/[month]/[day]/page.tsx`,
at the bottom of the day view:

- Layout: centered flex row, `gap-9` (36px), `mt-14` (56px), `pt-[22px]`,
  `border-t border-divider` (border color token).
- **Prev Day** (left): EB Garamond italic, 16px, gold/secondary color,
  `‹ Prev Day` (guillemet + label).
- **Next Day** (right): same style, `Next Day ›`.
- **Back to top** (center): the redesigned icon from #5, scrolls to `#top`.

### Prev/Next Day routing

No adjacent-date helper currently exists. Add one (e.g. in `src/app/utils`) that:
- Takes current month index (1-12) and day-of-month.
- Returns the previous/next calendar date, handling:
  - Day underflow → previous month, last day of that month.
  - Day overflow (past days-in-month) → next month, day 1.
  - Year rollover is not applicable — lectionary data is month/day only
    (no year in the URL structure `/[month]/[day]`), so December→January and
    January→December wrap within the same 12-month cycle.
- Both Prev and Next link via `next/link` to `/[month]/[day]`.

**Test-first**: write unit tests for the date-adjacency helper covering:
- mid-month day → simple ±1
- first day of month → prev wraps to last day of previous month
- last day of month → next wraps to day 1 of next month
- January 1 → prev wraps to December (of the 12-month cycle)
- December (last day) → next wraps to January 1

## 4. Back-to-top on the home page

`src/app/page.tsx` already renders `<ScrollToTopButton />`, but as a floating
sticky button (`sticky bottom-6 ml-auto`). Change to a static row below the
day-tile grid:

- Wrapper: `flex justify-center mt-14 pt-[22px] border-t border-divider`.
- Same icon/mark as #5 (component itself no longer owns sticky/positioning
  styles — that becomes the page's responsibility via a wrapper, or the
  component takes a `variant`/className prop).

## 5. Back-to-top icon redesign

**Problem**: current icon (`thin-chevron-round-top-icon.svg` /
`thin-chevron-round-top-icon-light.svg`, swapped via `<Image>` based on theme)
is a chevron-in-circle — reads as a generic app icon.

**Change**: replace with an inline SVG caret over a hairline rule (no circle),
using `currentColor` so it no longer needs a light/dark asset swap:

```tsx
<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
     strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
  <path d="M5 15l7-7 7 7" />
</svg>
<div className="w-[22px] h-px bg-current" />
```

Color: `text-primary` (burgundy/light-pink accent per theme — matches
home/theme-toggle icons in the header).

Remove `public/thin-chevron-round-top-icon.svg` and
`public/thin-chevron-round-top-icon-light.svg` once no longer referenced.

## Out of scope

- Selectable body font option (Source Serif 4 / Lora) — deferred, not mocked yet.

## Suggested implementation order (TDD, top-down)

1. `ScrollToTopButton`: rewrite as inline SVG mark (drop `<Image>`/asset swap),
   move sticky positioning out of the component; update
   `__tests__/components` if a spec exists, otherwise add one asserting the
   click behavior and rendered mark.
2. Home page (`src/app/page.tsx`): wrap `ScrollToTopButton` in the bordered
   centered row, remove old sticky placement.
3. Dedup title: remove standalone `<h3>` title from `ReadingPassage`,
   `VersePassage`, `EsvPassage`; update their specs.
4. Adjacent-date helper: write failing tests first, implement, then wire into
   `[month]/[day]/page.tsx` as the Prev/Next Day row alongside
   `ScrollToTopButton`.
</content>

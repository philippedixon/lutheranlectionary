# Plan: Scale Reading Headings & Superscripts with Text Size

Spec: `docs/specs/reading-heading-scaling.md`. Two rendering paths
(HelloAO, ESV) for the same conceptual fix; staged so each is its own
commit and can be reverted independently.

## Process

Same discipline as `docs/plans/liturgical-contrast-and-scaling-plan.md`:

**Hybrid outside-in TDD** for all new code, applied per stage:
- Prefer a test at the highest boundary that exercises the change the way a
  real consumer does (component render with a `SelectionsContext.Provider`
  wrapping different `fontSize` values).
- Drop to a pure-function unit test only where component testing is
  impractical (the new `headingSizeClass` helper).
- Within a stage: write the failing test first, implement until green, then
  move on.

**End of every stage**, before moving on:
1. **QA pass** — run the full test suite, re-read the diff against the spec
   section it implements, and spot-check in the browser rather than
   trusting green tests alone (jsdom doesn't compute rendered CSS from
   `calc()`/CSS-variable rules, so the browser check is the real
   verification for anything CSS-only).
2. **Rubber-duck review** — walk back through what the stage was supposed
   to do, what was implemented, and why, looking specifically for
   mismatches with the spec, uncovered edge cases, and tests written to
   match the implementation instead of the spec.
3. If QA or rubber-duck review surfaces a problem, fix it and repeat
   (max 3 attempts for that stage). If still unresolved after 3 attempts,
   stop and hand the stage back with a clear description of what's failing
   and what's been tried — do not proceed to the next stage.

## Stage 1 — `headingSizeClass` helper

1. Write failing tests in `__tests__/utils/readingStyle.spec.ts` (new file)
   for `headingSizeClass(fontSize)`: `"small"` → `text-[20px]`,
   `undefined`/`"medium"` → `text-[22px]`, `"large"` → `text-[26px]`.
2. Implement `headingSizeClass` in `src/app/utils/readingStyle.ts`, same
   shape as the existing `fontSizeClass`.
3. QA + rubber-duck review. Confirm the three return values match the
   spec's heading table exactly, and that `fontSizeClass` itself is
   untouched (superscription reuses it as-is, no new export needed there).

## Stage 2 — Wire HelloAO heading + superscript to Text Size

1. Write failing tests:
   - `ReadingPassage.spec.tsx`: update the existing "centers and sizes the
     pericope heading at 24px" test to assert `text-[22px]` at default
     (no provider / medium), and add cases wrapping in
     `SelectionsContext.Provider` with `fontSize: "small"` /
     `fontSize: "large"` asserting `text-[20px]` / `text-[26px]`.
   - Same pattern for the existing hebrew_subtitle test: default asserts
     `text-[19px]` (was `text-[15px]`), small/large cases assert
     `text-[17px]` / `text-[22px]`.
   - Mirror both sets of changes in `VersePassage.spec.tsx` against its
     equivalent existing tests.
2. In `ReadingPassage.tsx` and `VersePassage.tsx`: import
   `SelectionsContext` and `useContext` from React, read
   `selections.fontSize`, replace the heading's `text-[24px]` with
   `headingSizeClass(selections.fontSize)` and the subtitle's `text-[15px]`
   with `fontSizeClass(selections.fontSize)`.
3. QA + rubber-duck review. Run full suite. In-browser, open Psalm 58
   (Jan 30 or Aug 3) on a non-ESV translation and cycle Text Size through
   Small/Medium/Large, confirming the heading and superscript resize per
   the spec table and the reading text resizes alongside them as before.

## Stage 3 — ESV heading + superscript sizing

1. No dedicated unit test — CSS-only change, no JS boundary (same
   precedent as the ESV chapter-number color stage in the prior plan).
2. In `globals.css`:
   - Add explicit base (medium) sizes:
     ```css
     .esv-passage > h3 { font-size: 22px; }
     .esv-passage > h4.psalm-title { font-size: 19px; }
     ```
   - Remove the old flat `font-size: 15px` from the existing
     `.esv-passage > h4.psalm-title` rule (superseded by the base rule
     above).
   - Add small/large overrides alongside the existing
     `.esv-passage.size-small p` / `.esv-passage.size-large p` rules:
     ```css
     .esv-passage.size-small > h3 { font-size: 20px; }
     .esv-passage.size-small > h4.psalm-title { font-size: 17px; }
     .esv-passage.size-large > h3 { font-size: 26px; }
     .esv-passage.size-large > h4.psalm-title { font-size: 22px; }
     ```
   - No new rule for `.psalm-book` — it's covered by `.esv-passage > h3`
     already (per spec, deliberately not special-cased).
3. QA + rubber-duck review. In-browser, open Psalm 58 (ESV) and cycle Text
   Size through all three tiers, confirming sizes match Stage 2's HelloAO
   values (parity). Additionally check Sept 6 (Psalm 90) or Sept 23
   (Psalm 107) on ESV to confirm the `psalm-book` divider ("Book Four" /
   "Book Five") resizes identically to the pericope title beneath it.

## Stage 4 — End-to-end verification

1. Run full unit/test suite + type-check.
2. Manual browser pass:
   - Psalm 58 on a HelloAO translation and on ESV, all three Text Size
     tiers: confirm heading/superscript/reading-text sizes match between
     the two paths at each tier.
   - Psalm 90 or Psalm 107 on ESV: confirm the `psalm-book` divider scales
     with the pericope title.
   - A non-Psalm reading with a plain `heading` line (e.g. Genesis) on a
     HelloAO translation: confirm the section-heading resize applies there
     too, not just Psalms.
   - Dark theme: confirm unaffected.
   - Chrome text scaling (`--app-font-scale`, from the prior feature):
     confirm unaffected — switching Text Size should not double-scale
     anything covered by that feature.
3. `/code-review` pass before calling it done.
4. QA + rubber-duck review covering the whole feature set end-to-end — the
   final gate before handing back as done.

## Explicitly out of scope for this pass

- A distinct/separate size treatment for `.psalm-book` vs. the pericope
  title `h3`.
- Any change to `--app-font-scale` or the elements it already covers.
- Styling the ESV `h2` element (confirmed unused in live API output) or
  the `.footnotes` `h3`.

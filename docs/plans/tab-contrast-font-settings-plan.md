# Plan: Tab Contrast, Font/Size Settings, Psalm Heading Width

Spec: `docs/specs/tab-contrast-font-settings.md`. Build top-down: shared
state (Selections/reducer) → panel UI → consumers (Verse/ReadingPassage).

## Process

**Hybrid outside-in TDD** for all new code, applied per stage:
- Start each stage's failing test at the highest boundary that exercises the
  change the way a real consumer does (component-level: user clicks a
  swatch, active tab renders with the right classes, a passage renders a
  subtitle) — not an internal implementation detail.
- Drop to a lower-level unit test (e.g. the pure `selectionsReducer`) only
  for logic that's awkward or slow to pin down through the component
  boundary (state-transition edge cases). Stage 2's reducer tests are this
  exception — they're still re-exercised end-to-end via the Stage 3
  `OptionsPanel` component tests, so the reducer is never validated in
  isolation only.
- Config-only work with no logic (Stage 4, font loading) has no dedicated
  test — TDD doesn't apply; it's verified visually in Stage 7.
- Within a stage: write the failing test(s) first, implement until green,
  then move to the next stage.

**End of every stage**, before moving on:
1. **QA pass** — run the full test suite (not just the new tests) and
   confirm the change has its intended effect: re-read the diff against the
   spec section it implements, check no unrelated assertions changed
   meaning, and (where the stage touches rendered output) spot-check in the
   browser rather than trusting green tests alone.
2. **Rubber-duck review** — walk back through what the stage was supposed to
   do, what was implemented, and why, out loud in the response, looking
   specifically for: mismatches with the spec, edge cases the tests don't
   cover, and anything that only *looks* done because a test was written to
   match the implementation instead of the spec.
3. If QA or rubber-duck review surfaces a problem, fix it and repeat
   (max 3 attempts for that stage). If still unresolved after 3 attempts,
   stop and hand the stage back with a clear description of what's failing
   and what's been tried — do not proceed to the next stage.

## Stage 1 — Tab contrast fix (isolated, no shared state)

1. Write failing test in `ReadingTabs.spec.tsx`: active tab has
   `font-semibold text-primary` and a `bg-primary` underline element;
   inactive tab has neither, no underline element.
2. Restructure `ReadingTabs.tsx`: label + separate underline `div`
   (`gap-[7px]` column), drop `border-b` approach.
3. Run full test suite, confirm no regressions in `DayPage.spec.tsx` (tab
   markup consumers).
4. QA + rubber-duck review (see Process). Confirm in-browser that the active
   tab reads as clearly bolder/higher-contrast than inactive tabs, not just
   that classes match in the test.

## Stage 2 — Selections state: bodyFont + fontSize

1. Write failing tests in `selectionsReducer.spec.ts` for `SET_BODY_FONT`
   and `SET_FONT_SIZE` actions.
2. Add `bodyFont`/`fontSize` to `Selections` interface, extend
   `SelectionsAction` union, implement reducer cases.
3. QA + rubber-duck review (see Process). Confirm defaults match spec
   (`"garamond"`/`"medium"`) and that unrelated action types (`SET_LANGUAGE`,
   `SET_TRANSLATION`, `SET_SELECTIONS`) still return unchanged state for the
   new fields.

## Stage 3 — Options panel UI

1. Write failing tests in `OptionsPanel.spec.tsx`:
   - "Reading Font" section renders two swatches; clicking one dispatches
     `SET_BODY_FONT` and writes `localStorage.bodyFont`; active swatch
     marked via `aria-pressed`.
   - "Text Size" section renders three options at 17/19/22px preview sizes;
     clicking dispatches `SET_FONT_SIZE` + `localStorage.fontSize`.
   - Bootstrap `useEffect` defaults `bodyFont`/`fontSize` when unset in
     localStorage (mirrors existing language-default bootstrap).
2. Implement the two new sections in `OptionsPanel.tsx`, following the
   existing Language/Translation row pattern.
3. QA + rubber-duck review (see Process). Confirm in-browser that clicking a
   swatch/size actually updates `localStorage` (inspect via devtools) and
   survives a manual page reload, not just that the reducer was called.

## Stage 4 — Source Serif 4 font loading

1. Add `Source_Serif_4` to `src/app/layout.tsx` via `next/font/google`,
   `--font-source-serif` variable, wired into the body `className` list.
2. Add `source-serif` to `tailwind.config.ts` `fontFamily`.
3. No dedicated test (font loading is config, not logic) — verify via
   Stage 6 browser check that the swatch preview actually renders in the
   alternate face.
4. QA + rubber-duck review (see Process). Since there's no test to lean on,
   this stage's QA is the browser check itself — confirm Source Serif 4
   visibly differs from EB Garamond in the swatch, and that both fonts still
   load without console 404s/network errors.

## Stage 5 — Wire bodyFont/fontSize into passage rendering

1. Write failing tests in `Verse.spec.tsx`: body `<p>` font/size classes
   follow `selections.bodyFont`/`selections.fontSize` (parametrize existing
   cases or add new ones per combination).
2. Update `Verse.tsx` to read `SelectionsContext` and map
   `bodyFont`/`fontSize` to Tailwind classes instead of the hardcoded
   `font-eb-garamond text-[19px]`.
3. Update `globals.css` `.esv-passage p` / `.esv-passage .block-indent`: add
   font/size variant classes (e.g. `.esv-passage.font-serif4 p`,
   `.esv-passage.size-large p`) applied via a class on the ESV container in
   `EsvPassage.tsx`, driven by the same context.
4. Update `EsvPassage.tsx` to apply the container class from
   `selections.bodyFont`/`fontSize`.
5. QA + rubber-duck review (see Process). Confirm in-browser, for both a
   non-ESV and an ESV translation, that switching Reading Font/Text Size
   changes the visible passage body live, and that headings (Cormorant)
   stay unaffected as the spec requires.

## Stage 6 — Psalm heading width + hebrew_subtitle rendering

1. Write failing tests in `ReadingPassage.spec.tsx`/`VersePassage.spec.tsx`:
   - Heading `<h4>` has `max-w-[480px] mx-auto`.
   - A `hebrew_subtitle` content line renders as a centered, italic,
     15px, width-capped `<p>` with its joined string content.
2. Implement both in `ReadingPassage.tsx` and `VersePassage.tsx`.
3. QA + rubber-duck review (see Process). Open a Psalm with a real Hebrew
   subtitle in-browser (e.g. Psalms 92) and confirm the heading + subtitle
   visually align to the same column width as the verse text below them —
   not just that the class string is present in the test.

## Stage 7 — End-to-end verification

1. Run full unit/test suite.
2. `/verify`-style manual pass in a real browser (Playwright or by hand):
   - Day page with multiple readings: confirm active tab contrast
     (bold + primary underline) is clearly distinguishable.
   - Options panel: switch Reading Font, confirm passage body font changes
     live without reload; switch Text Size, confirm size changes live.
   - Refresh page, confirm both selections persist via localStorage.
   - Open a Psalm reading with a Hebrew subtitle (e.g. Psalms 92), confirm
     heading + subtitle are centered and capped to the verse column width.
3. `/code-review` pass before calling it prod-ready.
4. QA + rubber-duck review (see Process) covering the whole feature set
   end-to-end, not just this stage's own changes — this is the final gate
   before handing back as done.

## Explicitly out of scope for this pass

- Item 4 (multi-reading placeholder) — confirmed not applicable to
  production code; no stage needed.
- `EsvPassage.tsx` heading changes for item 5 (no hebrew_subtitle-equivalent
  in ESV HTML output).

# Plan: Deep Ochre Gold, App-Wide Font Scaling, ESV Chapter-Number Fix

Spec: `docs/specs/liturgical-contrast-and-scaling.md`. Three independent
concerns; stages are ordered so each is its own commit and can be reverted
individually without affecting the others (no stage depends on another's
implementation, only on the branch being current).

## Process

Same discipline as `docs/plans/tab-contrast-font-settings-plan.md`:

**Hybrid outside-in TDD** for all new code, applied per stage:
- Prefer a test at the highest boundary that exercises the change the way a
  real consumer does (component render, context wiring, dispatched action).
- Drop to a pure-function unit test only where component testing is
  impractical (Stage 1's contrast-ratio check; a CSS-only rule has no JS
  boundary to test against at all — see Stage 4).
- Within a stage: write the failing test first, implement until green, then
  move on.

**End of every stage**, before moving on:
1. **QA pass** — run the full test suite, re-read the diff against the spec
   section it implements, and where the stage touches rendered output,
   spot-check in the browser rather than trusting green tests alone.
2. **Rubber-duck review** — walk back through what the stage was supposed to
   do, what was implemented, and why, looking specifically for mismatches
   with the spec, uncovered edge cases, and tests written to match the
   implementation instead of the spec.
3. If QA or rubber-duck review surfaces a problem, fix it and repeat
   (max 3 attempts for that stage). If still unresolved after 3 attempts,
   stop and hand the stage back with a clear description of what's failing
   and what's been tried — do not proceed to the next stage.

## Stage 1 — Deep ochre gold (light theme only)

1. Write failing test for a new `contrastRatio(fg, bg)` pure utility
   (`src/app/utils/contrast.ts`) covering: known ratio for the current gold
   `#A6873A` vs `#F3ECDD` (≈2.9, fails 4.5 threshold) and for the new ochre
   `#7A5C1A` vs `#F3ECDD` (≥4.5, passes).
2. Implement `contrastRatio` (WCAG relative-luminance formula).
3. Change `--color-gold` under `:root` in `globals.css` from `#A6873A` to
   `#7A5C1A`. Leave `.dark { --color-gold: ... }` untouched.
4. QA + rubber-duck review. Confirm in-browser (light theme) that verse
   numbers, tabs, panel labels, subtitle, and nav links all read the new
   color (they all consume the same token, so one edit should be
   sufficient — verify no component hardcodes the old hex instead of the
   variable). Confirm dark theme is visually unchanged.

## Stage 2 — Font-scale infrastructure

1. Write failing test in `SelectionsProvider.spec.tsx` (new file): when
   `selections.fontSize` changes, `document.documentElement` gets a
   `data-font-scale="small" | "medium" | "large"` attribute (defaults to
   `"medium"` before a selection is loaded).
2. In `SelectionsProvider.tsx`, add a `useEffect` that sets
   `document.documentElement.dataset.fontScale = selections.fontSize ??
   "medium"` whenever `selections.fontSize` changes.
3. Add to `globals.css`:
   ```css
   :root { --app-font-scale: 1; }
   html[data-font-scale="small"] { --app-font-scale: 0.9; }
   html[data-font-scale="large"] { --app-font-scale: 1.15; }
   ```
4. QA + rubber-duck review. Confirm in-browser via devtools that the
   `<html>` attribute updates immediately when Text Size is changed in the
   options panel, and persists correctly on reload (existing `fontSize`
   localStorage key already restores `selections.fontSize` on mount).

## Stage 3 — Apply scale to chrome text

1. Write failing tests asserting the affected elements use the new
   scale-aware CSS classes (class-name assertions; jsdom doesn't compute
   `calc()`, so this stage's real verification is the Stage 3 browser
   check, not the unit test):
   - `AppHeader.spec.tsx`: title uses `.app-text-heading` (or equivalent).
   - `ReadingTabs.spec.tsx`: tab label uses `.app-text-tab`.
   - `OptionsPanel.spec.tsx`: section labels use `.app-text-label`.
   - Home page / day page nav link and heading tests: same pattern.
2. Add named scale-aware utility classes to `globals.css`, e.g.:
   ```css
   .app-text-heading   { font-size: calc(38px * var(--app-font-scale)); }
   .app-text-tab       { font-size: calc(16.5px * var(--app-font-scale)); }
   .app-text-label     { font-size: calc(15px * var(--app-font-scale)); }
   .app-text-nav       { font-size: calc(16px * var(--app-font-scale)); }
   ```
   (exact set/naming driven by the components actually touched; keep each
   class tied to the one hardcoded px value it replaces so the visual
   baseline at `medium` is unchanged).
3. Replace the corresponding `text-[Npx]` Tailwind arbitrary classes in
   `AppHeader.tsx`, `ReadingTabs.tsx`, `OptionsPanel.tsx`, `page.tsx`,
   `[month]/[day]/page.tsx` with the new classes, keeping every other
   class (color, weight, family) unchanged.
4. QA + rubber-duck review. Confirm in-browser that switching Text Size
   noticeably resizes headings, tabs, panel labels, and nav links together,
   that `medium` looks pixel-identical to the pre-change baseline
   (screenshot diff or side-by-side), and that passage body text (already
   scaled independently since the prior feature) doesn't double-scale.

## Stage 4 — ESV chapter-number color fix

1. No dedicated unit test — this is a CSS-only rule addition mirroring an
   existing non-ESV treatment; there's no JS boundary to assert against; per
   Process, config/CSS-only stages are verified visually instead (same
   precedent as Stage 4, font loading, in the prior plan).
2. Add to `globals.css`:
   ```css
   .esv-passage .chapter-num {
     font-family: var(--font-cormorant), Georgia, serif;
     font-weight: 600;
     font-style: normal;
     font-size: 24px;
     color: var(--color-primary);
   }
   ```
3. QA + rubber-duck review. Open an ESV reading whose first verse starts a
   new chapter (e.g. `/7/30` on ESV) in-browser and confirm the leading
   `56:1`-style marker renders large/bold/burgundy, distinct from the
   small gold verse markers after it, matching the non-ESV rendering of the
   same passage.

## Stage 5 — End-to-end verification

1. Run full unit/test suite + type-check.
2. Manual browser pass:
   - Light theme: confirm gold text throughout meets contrast expectations
     visually (no washed-out low-contrast text remaining).
   - Switch Text Size through all three tiers: confirm headings, tabs,
     panel, nav, and passage body all resize together, and the change
     survives a reload.
   - Dark theme: confirm unaffected by both the gold and scale changes.
   - ESV `/7/30`: confirm chapter-number marker fix.
3. `/code-review` pass before calling it done.
4. QA + rubber-duck review covering the whole feature set end-to-end — the
   final gate before handing back as done.

## Explicitly out of scope for this pass

- Seasonal liturgical-calendar color theming.
- Making the 0.9/1/1.15 scale factors user-configurable beyond the existing
  Small/Medium/Large control.

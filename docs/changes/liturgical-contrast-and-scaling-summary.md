# Change Summary: Deep Ochre Gold, App-Wide Font Scaling, ESV Chapter-Number Fix

Status: **not started** — spec and plan only, no implementation yet.

Follow-up to the shipped tab-contrast/font-settings work; addresses three
issues raised in review of that feature.

## What will change

1. **Light-theme gold contrast** — `--color-gold` in `globals.css` moves
   from `#A6873A` (2.9:1 against the light background, fails WCAG AA) to a
   deep ochre `#7A5C1A` (5.3:1, passes). Single CSS-variable edit; dark
   theme untouched. `src/app/globals.css`, new
   `src/app/utils/contrast.ts`.
2. **App-wide font scaling** — the existing Text Size setting (currently
   passage-body-only) becomes a document-wide multiplier via an
   `--app-font-scale` CSS variable set on `<html>`, applied to headings,
   tab labels, options-panel text, and nav links in addition to passage
   body text. No new setting/localStorage key — reuses the existing
   `fontSize` selection. `src/app/contexts/SelectionsProvider.tsx`,
   `src/app/globals.css`, `src/app/components/AppHeader.tsx`,
   `src/app/components/ReadingTabs.tsx`,
   `src/app/components/OptionsPanel.tsx`, `src/app/page.tsx`,
   `src/app/[month]/[day]/page.tsx`.
3. **ESV chapter-number marker fix** — ESV HTML's `.chapter-num` (the
   leading "56:1" on a reading's first verse) currently has no styling and
   inherits body-text color. Adds a CSS rule matching the non-ESV
   `Verse.tsx` treatment (Cormorant, 600 weight, 24px, primary color).
   `src/app/globals.css`.

## Net new state

- None — no new `Selections` fields. Font scaling reuses the existing
  `fontSize` value; gold and chapter-num are CSS-only.

## Explicitly not touched

- Seasonal/liturgical-calendar color theming.
- Making scale factors (0.9/1/1.15) user-configurable beyond the existing
  Small/Medium/Large control.

## Process

Same as the prior feature: hybrid outside-in TDD (component/context-level
failing test first, dropping to a pure-function unit test only where no
component boundary applies — contrast-ratio math, CSS-only rules). Every
stage ends with a full-suite QA pass, a spec re-check, a browser
spot-check, and a rubber-duck review; up to 3 correction attempts per
stage before handing back rather than proceeding. Each stage is an
independent, individually-revertable commit. Full details in the plan's
Process section.

## Docs

- Spec: `docs/specs/liturgical-contrast-and-scaling.md`
- Plan: `docs/plans/liturgical-contrast-and-scaling-plan.md`

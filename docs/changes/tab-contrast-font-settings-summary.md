# Change Summary: Tab Contrast, Font/Size Settings, Psalm Heading Width

Status: **not started** — spec and plan only, no implementation yet.

Source design package: `Lutheran-Lectionary-Redesign-4.zip`
(`design_handoff_font_settings`), follow-up to the shipped nav-polish work.

## What will change

1. **Reading tab contrast** — active tab becomes bold + primary-colored with
   a thicker (2px) primary underline, replacing the low-contrast gold-on-gold
   styling. `src/app/components/ReadingTabs.tsx`.
2. **Reading Font setting (new)** — options panel gains an EB
   Garamond / Source Serif 4 toggle for passage body text.
   `src/app/layout.tsx`, `tailwind.config.ts`,
   `src/app/components/OptionsPanel.tsx`, `src/app/components/Verse.tsx`,
   `src/app/components/EsvPassage.tsx`, `src/app/globals.css`, plus
   `Selections` interface/reducer.
3. **Text Size setting (new)** — options panel gains a Small/Medium/Large
   (17/19/22px) toggle for passage body text. Same files as #2 minus font
   loading.
4. **Multi-reading placeholder fix** — determined **not applicable**; the
   real app already tabs every reading for every day. No code change.
5. **Psalm heading width + superscription** — pericope heading gets an
   explicit 480px max-width; a previously-unhandled API content type
   (`hebrew_subtitle`, e.g. "A Psalm. A song for the Sabbath day.") gets a
   new render branch so it's no longer silently dropped.
   `src/app/components/ReadingPassage.tsx`,
   `src/app/components/VersePassage.tsx`.

## Net new state

- `Selections.bodyFont?: "garamond" | "serif4"` (default `"garamond"`)
- `Selections.fontSize?: "small" | "medium" | "large"` (default `"medium"`)
- Both persisted to `localStorage`, following the existing
  `language`/`translation` pattern — no server/cookie persistence.

## Explicitly not touched

- `EsvPassage.tsx` heading markup (item 5 doesn't apply to ESV HTML output).
- Any "today" special-casing (doesn't exist in production; item 4 was a
  mockup-only artifact).

## Process

Hybrid outside-in TDD for all new code (component-level failing test first,
dropping to unit-level only where a component boundary is impractical, e.g.
the pure reducer). Every stage ends with a QA pass (full suite + spec
re-check + browser spot-check) and a rubber-duck review against the spec;
up to 3 correction attempts per stage before handing the stage back rather
than proceeding. Full details in the plan's Process section.

## Docs

- Spec: `docs/specs/tab-contrast-font-settings.md`
- Plan: `docs/plans/tab-contrast-font-settings-plan.md`

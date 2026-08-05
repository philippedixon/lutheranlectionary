# Spec: Deep Ochre Gold, App-Wide Font Scaling, ESV Chapter-Number Fix

Follow-up to `docs/specs/tab-contrast-font-settings.md`. Three independent
concerns raised in review of that work.

## 1. Replace light-theme gold with deep ochre

**Problem:** `--color-gold: #A6873A` (light theme) on `--color-bg: #F3ECDD`
measures **2.9:1** contrast — fails WCAG AA (4.5:1) for normal text. Gold is
used as actual text color in many places: verse-number superscripts, the
Hebrew subtitle caption, inactive reading tabs, options-panel section
labels, Prev/Next Day nav links, home-page calendar reference lines, the
options-panel close icon.

**Decision:** darken the existing token rather than shift hue. A hue shift
toward liturgical violet/green would imply a seasonal-color meaning the app
doesn't model (liturgical colors track the church calendar, not a static
UI accent) — that's a bigger product decision than a contrast fix.
Staying in the gold family preserves the existing visual identity.

**Change:** `--color-gold` under `:root` (light theme only) becomes
`#7A5C1A` ("deep ochre"), measuring **5.3:1** against `--color-bg` — passes
AA. Dark theme's `--color-gold: #D4B25A` is unchanged (already 8.3:1).

No component changes — every consumer reads the CSS variable via the
existing `gold` Tailwind color / `var(--color-gold)`, so this is a
single-token edit.

## 2. App-wide font scaling

**Problem:** the existing Text Size setting (`docs/specs/tab-contrast-font-settings.md`
item 3) only scales passage body text (`Verse.tsx`, `EsvPassage.tsx`).
Headings, tabs, options panel, and nav chrome stay fixed size, so a user
picking "Large" for readability gets no relief outside the verse text.

**Decision (Option B — global scale):** Text Size becomes a document-wide
multiplier. A CSS custom property, `--app-font-scale`, is set at the
`<html>` (or a top-level client wrapper) based on `selections.fontSize`:

| fontSize | `--app-font-scale` |
|---|---|
| small | `0.9` |
| medium | `1` (default) |
| large | `1.15` |

Every chrome text size that should scale is expressed as
`calc(<base-px> * var(--app-font-scale))` instead of a bare `text-[Npx]`
Tailwind arbitrary value, via small named CSS utility classes in
`globals.css` (Tailwind arbitrary values can't reference a runtime CSS
variable multiplier directly). Existing passage-body scaling
(`readingStyle.ts` → `fontSizeClass`) is left as-is; it already has its own
three fixed sizes and doesn't need to also multiply by the new scale.

**In scope for scaling:** page/day headings (`h1` on home + day page), tab
labels, options-panel section labels and row text, Prev/Next Day nav links,
home-page calendar reference lines, `AppHeader` title.

**Out of scope:** the existing passage body text-size control (already
covered), icon sizes, layout spacing/padding.

## 3. ESV chapter:verse marker color

**Problem:** ESV HTML marks the first verse of a passage with
`<b class="chapter-num">56:1&nbsp;</b>`, distinct from
`<b class="verse-num inline">2&nbsp;</b>` for later verses.
`globals.css` has a `.esv-passage .verse-num` rule (13px, gold) but no rule
for `.chapter-num`, so it inherits the paragraph's default body-text color —
it doesn't read as a marker at all.

**Change:** add `.esv-passage .chapter-num` to `globals.css` — Cormorant,
600 weight, not italic, 24px, `var(--color-gold)` — and update the
equivalent non-ESV chapter-number spans in `Verse.tsx` (prose and
words-of-Christ branches) from `text-primary` to `text-gold` to match.
Gold rather than primary/burgundy so the large chapter marker reads as
part of the same verse-numbering system as the small gold verse numbers
next to it, instead of a differently-colored heading. No other JS/logic
change.

## Acceptance criteria

- Light-theme gold text (verse numbers, tabs, subtitle, panel labels, nav
  links) measures ≥ 4.5:1 against `--color-bg`. Dark theme unchanged.
- Switching Text Size in the options panel visibly resizes headings, tab
  labels, options-panel text, and nav links — not just passage body text —
  and persists across reload (existing `fontSize` localStorage key, no new
  key needed).
- On an ESV reading, the leading `<chapter>:<verse>` marker (e.g. "56:1")
  renders large/bold/gold, matching the non-ESV first-verse chapter number,
  using the same gold as the small verse-number markers that follow it
  (just larger, so it still reads as the chapter marker).

## Out of scope

- Any seasonal/liturgical-calendar color theming (violet for Advent, etc.).
- Extending the numeric scale values (0.9/1/1.15) to be user-configurable
  beyond the existing three-tier Small/Medium/Large control.

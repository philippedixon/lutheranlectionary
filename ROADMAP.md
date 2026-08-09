# Roadmap

Priority order for upcoming work. Related GitHub issues are linked where one
already exists; items without a number haven't been filed yet.

## 1. Site redesign

- Landing page becomes today's reading (currently the month/day calendar
  grid). [#20](https://github.com/philippedixon/lutheranlectionary/issues/20)
- Navigation updated to match.
- The current calendar/lectionary browsing view moves to its own page at
  `/lectionary`. [#20](https://github.com/philippedixon/lutheranlectionary/issues/20)
- New Contact page with an email form.
- New About page. [#47](https://github.com/philippedixon/lutheranlectionary/issues/47)
- Design coming from Claude (Claude design/Artifacts) before implementation
  starts.
- Broader design polish (footer, full accessibility pass) folds in here too.
  [#42](https://github.com/philippedixon/lutheranlectionary/issues/42)

## 2. User authentication

- Persist user preferences (translation, language, reading font, text size)
  server-side instead of localStorage-only.
- Needed as the foundation for progress tracking (below).
  [#13](https://github.com/philippedixon/lutheranlectionary/issues/13)

## 3. Reading progress tracking

- Track which daily readings a signed-in user has completed.
- Depends on user auth (#2) being in place first.
  [#13](https://github.com/philippedixon/lutheranlectionary/issues/13)

---

For the full backlog (bugs, tech debt, infra, smaller enhancements), see the
[open issues](https://github.com/philippedixon/lutheranlectionary/issues).

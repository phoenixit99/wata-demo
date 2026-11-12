# Coding standard — Flutter (mobile)

> **Starter version.** The project's Tech Lead copies it, adapts it to the real versions and
> conventions, and declares its path in `apps[].standard` in `.claude/project.yml`.

## Structure

- By feature, three layers: `lib/features/<feature>/{data,domain,presentation}`.
  - `data`: API calls, JSON models, repository implementations.
  - `domain`: entities, repository interfaces, use cases (pure logic, no Flutter imports).
  - `presentation`: widgets, screens, providers/notifiers.
- Only truly shared code goes in `lib/core/`.

## State: Riverpod

- State through Riverpod (`Notifier`/`AsyncNotifier`); no `setState` for business state.
- Widgets never call the API directly; they go through provider → repository.
- `AsyncValue` handles **loading / error / data / empty** on every screen that loads data.

## Models and the contract

- Models match the API contract (same field names and types). Use code generation (`freezed`,
  `json_serializable`) if the project does.
- **Tolerate API changes:** new fields must not crash (ignore unknown fields); fields that may be missing
  are nullable or have defaults. Released apps cannot be updated, so parsers must be lenient.
- Enums from the API have an `unknown` value for values not yet known.

## UI

- Colours, text and spacing come from `Theme`/design tokens; **never hard-code colours**.
- Displayed text goes through `intl`/l10n; no hard-coded strings.
- Widgets tests need to find have `Key('<feature>-<element>')`.
- Support large system font sizes and small screens; never fix the height of text containers.

## Quality

- `flutter analyze` clean with a strict lint set (`flutter_lints` or `very_good_analysis`).
- No `print`; use a logger. No dead code or TODOs without an issue number.
- `async` code handles errors; no exception escapes to the UI.

## Tests

- Unit tests for domain and repositories (mock data sources).
- Widget tests for screens with important display conditions.
- Anything only checkable on a device (camera, push, system permissions) is a `mobile` test case for QA,
  stated in the test-case table.

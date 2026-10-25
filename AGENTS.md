# Project instructions

## Purpose

AI Bro Ipsum is a humorous, browser-local placeholder text generator. Prioritize
grammatical variety, distinct satirical voices, and useful output over decoration.
Read `README.md` for usage and `PLAN.md` for the implementation requirements.

## Architecture and deployment

- Use HTML, CSS, and vanilla JavaScript. Keep the project buildless and free of
  runtime dependencies.
- Keep `index.html`, `style.css`, `script.js`, and `.nojekyll` at the repository
  root. Preserve the existing MPL-2.0 `LICENSE`.
- Support GitHub Pages project subpaths, including `/AiBroLoremIpsum/`. Use
  relative asset paths such as `./style.css`; avoid root-relative paths.
- Keep generation entirely local. Do not introduce a backend, database, API
  keys, external AI services, CDN assets, remote fonts, or analytics.
- Preserve direct `file://` use and offline generation. Do not introduce module
  loading or fetched resources that require a server.

## Generator contracts

- Compose sentences dynamically from vocabulary and grammatical templates;
  do not replace the engine with a small bank of finished paragraphs.
- Preserve all eight content styles and five intensity levels. Styles must
  differ in structure and voice; intensity must change jargon and absurdity.
- Produce exactly the requested 1–20 paragraphs, 1–50 sentences, or 10–500 words.
  Preserve complete sentences in word mode rather than truncating text.
- A word is a whitespace-delimited token containing a Unicode letter or number.
  Standalone punctuation and emoji do not count. Count characters as Unicode
  code points, including whitespace and punctuation.
- The optional `In the age of AI...` opening contributes five words and appears
  only once. Its ellipsis must not create extra sentence boundaries.
- Respect the statistics, em-dash, cliché, and declaration switches independently.
  Explicit options take precedence over intensity defaults.
- Avoid repeated normalized sentences within one generation. Bound retries so
  maximum-sized requests terminate promptly.
- Preserve injectable randomness and seeded reproducibility for engine tests.
- Keep pure generation functions separate from DOM interactions. Preserve the
  browser `AIBroIpsum` interface and CommonJS exports used by tests.

## Interface and code quality

- Keep generated text, copied text, downloaded text, and counters consistent
  through one canonical output string.
- Generate immediately without artificial loading states.
- Preserve labeled controls, keyboard navigation, visible focus, readable
  contrast, responsive layouts, and reduced-motion support.
- Announce action results through a status region; keep lengthy generated output
  outside live announcements.
- Confirm clipboard success only after copying succeeds. Keep a usable fallback
  for denied permissions and local-file contexts.
- Download UTF-8 `.txt` files locally and release object URLs after use.
- Write readable, maintainable code with no placeholder functions or dead buttons.
  Keep humor in the product copy without obscuring control labels or errors.

## Verification

Run the relevant tests after behavior changes:

```sh
node --test tests/*.test.cjs
git diff --check
```

Use Node's built-in test runner without installing dependencies. Cover exact
amounts, style/intensity combinations, option behavior, sentence uniqueness,
seeded results, counters, and copy/download consistency. Review generated samples
for grammar and humor; passing automated tests alone does not establish quality.

For browser verification, check direct-file loading and HTTP serving at both the
root and a project subpath. Exercise narrow/mobile layouts, keyboard controls,
Generate, Regenerate, Copy and its failure recovery, and Download. Report checks
that could not be performed; DOM fixtures do not verify visual rendering or
native clipboard permissions.

## Collaboration and Git

- Inspect the working tree before editing. Preserve unrelated work and coordinate
  file ownership when multiple contributors work concurrently.
- Keep commits focused. Do not reset, force-push, change remotes, or alter Git
  identity/signing configuration as incidental cleanup.
- Local commits, authenticated pushes, and a working Pages deployment are
  separate verification steps. Report their actual outcomes independently.
- Do not commit credentials or claim a push/deployment succeeded without evidence.
- Update the README when usage, counting rules, verification, or deployment
  requirements change.

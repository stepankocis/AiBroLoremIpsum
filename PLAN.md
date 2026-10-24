# AI Bro Ipsum implementation plan

## Scope and priorities

Build a complete, buildless HTML/CSS/vanilla JavaScript website. All generation happens in the browser with no runtime dependencies, remote fonts, CDN assets, API requests, keys, backend, database, or paid services. Prioritize grammatical variety and satire, then usability, then visual polish.

This planning stage adds this document only. Implementation and deployment are subsequent stages.

## Deliverables and structure

- `index.html`: semantic page, exact headline/subtitle, labeled controls, output, counters, action buttons, status announcements, and humorous footer.
- `style.css`: responsive dark theme, subtle gradients/glass panels, accessible contrast, visible focus, and reduced-motion support.
- `script.js`: vocabulary, grammar templates, style/intensity profiles, pure generation functions, and DOM interactions in clearly separated sections. Use a classic deferred script so opening `index.html` directly works without module loading or fetch restrictions.
- `README.md`: usage, local preview, generation design, verification instructions, licensing reference, and GitHub Pages deployment.
- `.nojekyll`: serve the repository as plain static files.
- `tests/generator.test.cjs`: focused tests using Node's built-in test runner; no package installation or runtime dependencies.
- Preserve the existing `LICENSE` (MPL-2.0).

All assets and internal links use relative paths such as `./style.css` and `./script.js`. No root-relative URLs, router, bundler, build step, or custom domain is required.

## 1. Build the procedural generation engine

### Vocabulary and grammar

Create at least 300 distinct vocabulary entries across shared and style-specific banks: subjects, singular/plural noun phrases, transitive verbs, compatible complements, adjectives, technical concepts, business outcomes, invented abstractions, transitions, closers, and rhetorical hooks. Include every buzzword category requested in the brief, including AGI/ASI, RAG/MCP, agentic orchestration, vibe coding, sovereign AI, founder mode, moats, open-weight models, synthetic data flywheels, and absurd invented combinations.

Use at least 40 sentence templates, including at least four distinctive structures per style, plus shared grammatical structures. Templates assemble randomized constituents rather than selecting finished paragraphs. Store grammatical metadata and complete noun phrases to preserve articles, subject/verb agreement, prepositions, capitalization, and punctuation. Absurdity should come from the claim and vocabulary, while syntax stays readable.

Pass an RNG into the generator: use normal randomness in the UI and seeded randomness in tests. The grammar rules are explicit and deterministic for a given seed and settings; no model is involved.

### Repetition control

- Use shuffle bags or recent-choice tracking for templates and vocabulary within each generation.
- Track normalized complete sentences in a set; reject duplicate sentences, including casing/punctuation-only variants.
- Bound retries and use additional valid template/constituent combinations when necessary. Never hang or silently return duplicate sentences to satisfy a large request.
- Keep a small recent-output history to avoid immediate identical results when regenerating.

### Five intensity profiles

| Level | Label | Generator behavior |
| --- | --- | --- |
| 1 | Intern — Almost coherent | Plain business language, light technical jargon, restrained claims. |
| 2 | Startup Founder — Mildly insufferable | More startup vocabulary, growth claims, founder-centric phrasing. |
| 3 | LinkedIn Thought Leader — Maximum engagement bait | Contrarian hooks, self-importance, engagement-style conclusions. |
| 4 | AGI Evangelist — Completely detached from reality | Dense frontier terminology, sweeping predictions, implausible outcomes. |
| 5 | Singularity — Beyond human comprehension | Invented concepts, recursive abstractions, escalating cosmic nonsense within grammatical sentences. |

Intensity changes vocabulary weights, modifier density, claim magnitude, and template selection. Content style stays recognizable at every intensity. Explicit optional-feature switches override intensity defaults.

### Eight meaningful style profiles

| Style | Voice and structure |
| --- | --- |
| Classic AI Bro | Confident corporate prose with agentic infrastructure and productivity claims. |
| LinkedIn Influencer | Personal revelation, short emphatic sentences, contrarian hooks, and calls for agreement. |
| VC Pitch Deck | Market opportunity, moats, defensibility, scalable economics, and investor-oriented claims. |
| Startup Founder | First-person plural, shipping, pivots, customer discovery, runway, and founder mode. |
| AI Research Paper | Formal abstract-like claims, methods, ablations, benchmarks, and cautious-sounding conclusions. |
| Tech Conference Keynote | Audience address, stage-ready rhetorical questions, sweeping visions, and closing declarations. |
| AGI Doomer | Alignment concerns, existential-risk vocabulary, timelines, and ominous consequences. |
| Vibe Coding Evangelist | Prompt-driven shipping, agent-built applications, debugging denial, and code-free confidence. |

Each profile owns templates, vocabulary, transitions, and rhetorical patterns; changing styles must do more than replace a few nouns. Avoid formatting artifacts such as slide headings or hashtags that interfere with exact amount controls.

## 2. Define precise output contracts

- **Paragraphs:** exactly 1–20 nonempty paragraphs, separated by a blank line. Usually 3–5 complete sentences each, with style-appropriate shorter structures where useful. Formatting must preserve the requested paragraph count.
- **Sentences:** exactly 1–50 complete sentences. Optional dramatic fragments must be integrated into counted sentence templates. Use controlled punctuation and account for rhetorical questions rather than guessing sentence boundaries from raw text.
- **Words:** exactly 10–500 words under a documented counter shared by generation and display. Count whitespace-delimited tokens containing a letter or number; punctuation-only tokens do not count. Assemble complete sentences from length-aware templates and optional grammatical clauses, budgeting room for a natural final sentence. Do not slice an arbitrary generated string mid-sentence to hit the target.
- Clamp and validate amounts when switching units; expose the active minimum/maximum and label the input clearly.
- The optional opening is exactly `In the age of AI...`, used once at the start and incorporated into the first sentence's structure. Its words count toward word mode; its ellipsis does not create extra sentences.
- Optional fabricated statistics appear only when enabled and must read as satire in the surrounding product context. Disabling the option excludes fabricated metric templates while retaining requested jargon such as “10x engineers.”
- Separate options control excessive em dashes, corporate clichés, and dramatic declarations. They modify sentence composition and remain compatible with all styles, amounts, and intensities.
- Use one canonical output string for display, copying, downloading, and counters. Character count includes whitespace and punctuation, measured consistently as Unicode code points.

Defaults: 3 paragraphs, Startup Founder intensity, Classic AI Bro style, optional embellishments off. Generate initial sample text immediately on page load.

## 3. Build the accessible interface

Use the exact title **AI Bro Ipsum** and subtitle **“Why use meaningless Latin when you can use meaningless AI jargon?”**

Place controls beside a generous output panel on desktop; stack controls above output on mobile. Use system fonts, a dark neutral background, restrained accent gradients, and subtle panel translucency with a solid fallback. Keep the generated text visually dominant.

Provide amount/unit controls, all five intensity levels with their labels, all eight content styles, and the optional opening/statistics/embellishment switches. Display output as selectable plain text with preserved paragraph breaks.

Implement every action:

- **Generate** applies the current controls immediately.
- **Regenerate** generates fresh text with the same current controls through the same engine.
- **Copy** copies the canonical string, announces success only after success, and provides an offline/file-context fallback or a clear manual-selection recovery if clipboard access is denied.
- **Download .txt** creates a local UTF-8 Blob, downloads `ai-bro-ipsum.txt`, and releases its object URL.
- **Counters** update after every generation and reflect the actual output.

Use native labeled inputs, fieldsets/legends where appropriate, logical keyboard order, visible focus, adequate touch targets, and an `aria-live` status region for confirmations/errors. Keep the lengthy output outside live announcements. Prevent horizontal overflow at narrow widths. Honor `prefers-reduced-motion` and never show fake AI loading indicators.

Scatter restrained microcopy such as “Powered by absolutely no neural networks,” “Our moat is that none of this means anything,” and “No GPUs were harmed in the making of this paragraph.” Add one optional Easter egg through an accessible deliberate interaction; it must not interfere with generation or controls.

## 4. Verify behavior and text quality

### Automated engine checks

Use `node --test tests/generator.test.cjs` against the actual engine functions, with a narrow CommonJS export guard that does not affect browser use. Exercise:

- All 8 styles × 5 intensities with representative seeded settings.
- Exact paragraph and sentence counts at their minimum and maximum.
- Every integer word target from 10 through 500, across style profiles, with the opening both on and off; extend combinations to expose any length-budget failure.
- Optional features enabled/disabled, including all-off and all-on settings.
- No repeated normalized sentences within one generation; maximum-sized output terminates.
- Valid capitalization/punctuation, matching counters, and reproducible results with a fixed seed.
- Invalid or boundary UI values are normalized predictably.

Perform a manual sample review across all 40 style/intensity combinations. Check grammatical agreement, clear differences in voice, increasing absurdity, and overused phrases. Use a larger seeded sample to inspect duplicate rates and template distribution; variety and humor require editorial review as well as tests.

### Browser and delivery checks

- Test direct `file://` opening and a local HTTP preview with no network needed for generation.
- Serve the project beneath `/AiBroLoremIpsum/` as well as at `/`; confirm all relative asset links work.
- Check narrow mobile, tablet, and desktop layouts; keyboard operation; focus; reduced motion; and readable contrast.
- Exercise Generate, Regenerate, Copy success and denied-access recovery, and Download. Verify downloaded and copied text matches the displayed text exactly.
- Confirm counters and all unit-switching bounds; inspect the console for errors.
- Confirm generation remains synchronous and responsive at maximum amounts; benchmark rather than adding a pretend loading state.
- Verify no outbound runtime requests, remote fonts, or third-party dependencies. Offline means local files work offline and an already-loaded page can generate offline; offline reloading of a hosted URL is outside scope without a service worker.
- Run `git diff --check` and inspect the final changes. Report any browser checks that the available environment cannot execute.

## 5. Commit and deployment sequence

Use reviewable commits as implementation progresses:

1. `docs: add AI Bro Ipsum implementation plan` — this document and the Git verification findings.
2. `feat: add procedural AI jargon generator` — grammar, vocabulary, profiles, amount handling, and engine tests.
3. `feat: build responsive generator interface` — HTML, CSS, controls, actions, accessibility, and microcopy.
4. `docs: document usage and GitHub Pages deployment` — README, `.nojekyll`, and any fixes found during final verification.

For deployment after the complete website is implemented:

```sh
git status
git push origin main
```

In the GitHub repository, select **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: main → /(root) → Save**. A custom build workflow is unnecessary for this static project. Confirm the successful Pages deployment and test the generated site URL.

Expected URL, assuming the current repository/account names and standard project-site hosting:

`https://stepankocis.github.io/AiBroLoremIpsum/`

The planning commit alone does not contain a website to deploy. GitHub Pages availability also depends on repository visibility/account plan and permission to configure Pages.

Official references:

- [Configure a GitHub Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub command-line authentication](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github#authenticating-with-the-command-line)

## Git verification findings

Repository inspection during planning:

- Working checkout: `/home/otep/dev/web/AiBroLoremIpsum`.
- Branch: `main`, tracking `origin/main`; working tree was clean before adding this plan.
- Existing commit: `a894ae0` (`Initial commit`); only `LICENSE` was tracked.
- Fetch/push remote: `https://github.com/stepankocis/AiBroLoremIpsum`.
- Git author and committer identity are configured. Commit signing is enabled in the inherited configuration. The actual planning-commit attempt failed because GPG requires a passphrase and cannot open `/dev/tty` in this environment. Signed commits require an unlocked signing key or a working interactive signing setup.
- GitHub CLI (`gh`) is not installed.
- `git push --dry-run origin main` reached the GitHub authentication step after network access was allowed, but failed with `could not read Username for 'https://github.com': No such device or address`. This environment has no usable HTTPS credentials for that remote. No remote changes were made.
- The next planning-commit attempt uses `git -c commit.gpgsign=false commit` to verify unsigned local commits without modifying the configured signing preference. Its result is reported in the task handoff. Creating a local commit and authenticating a push are separate checks; repositories that require signed commits will also need the signing issue resolved before accepting an unsigned commit.

**Push readiness:** the remote and branch are configured, but successful pushing and repository write permission are not verified. Authenticate through a trusted Git credential manager/GitHub Desktop, an HTTPS token, or an SSH key with access to this repository, then rerun `git push --dry-run origin main`. Once it passes, `git push origin main` uploads local commits. Account for any remote branch rules reported by GitHub during the actual push; a dry run does not prove that every receive-time rule will pass. Do not paste credentials into project files or commit them.

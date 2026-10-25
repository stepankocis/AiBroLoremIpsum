# AI Bro Ipsum

Why use meaningless Latin when you can use meaningless AI jargon?

A buildless, local English/Czech text generator with eight satirical voices and five levels of AI hype. All generation runs in your browser. It needs no account, API key, backend, package installation, remote font, or network connection.

## Use locally

Open `index.html` directly in a browser. The classic script and relative asset paths also work with `file://` URLs.

For a local HTTP preview, run this from the repository directory:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000/`. You can generate offline from local files or an already loaded page. Reloading a hosted URL offline requires the browser to have cached it; this project does not install a service worker.

## Controls and output

- Choose **English** or **Čeština** in the header. English is the default. Switching languages translates the interface and immediately generates fresh text in the chosen language, preserving all settings and the theme. The choice is saved under `ai-bro-ipsum-language` when browser storage is available; blocked storage does not prevent switching.
- Generate 1–20 paragraphs, 1–50 sentences, or exactly 10–500 words. Amounts are clamped to the selected unit's limits.
- Choose Classic AI Bro, LinkedIn Influencer, VC Pitch Deck, Startup Founder, AI Research Paper, Tech Conference Keynote, AGI Doomer, or Vibe Coding Evangelist.
- Raise intensity from Intern through Startup Founder, LinkedIn Thought Leader, AGI Evangelist, and Singularity.
- Optionally start with `In the age of AI...` in English or `V éře umělé inteligence...` in Czech, add fabricated statistics, excessive em dashes, corporate clichés, or dramatic declarations. Statistics are invented satire.
- Very short word requests may omit embellishments to preserve the exact count and complete sentences. The requested opening is always retained when enabled.
- Generate and Regenerate use the current settings. Copy and Download `.txt` use the same text shown in the output. If clipboard access is unavailable, follow the displayed manual-copy recovery.
- Switch between dark and light modes using the header button. Dark is the default; your explicit choice is remembered locally in this browser when storage is available. If storage is blocked (including some `file://` contexts), both modes still work for the current page. Switching modes preserves your text and settings.

The default is three paragraphs in the Classic AI Bro voice at Startup Founder intensity, with optional embellishments off. An initial sample appears immediately.

Short word targets use compact sentence structures. Enabled embellishments appear when the remaining word budget permits them.

A word is a whitespace-delimited token containing at least one Unicode letter or number. Hyphenated words count as one; standalone punctuation and emoji do not count. The optional English opening contributes five words; the Czech opening contributes four words. Its ellipsis does not add sentence boundaries. Character counts include whitespace and punctuation and count Unicode code points, so a single emoji counts as one character. Paragraphs are separated by a blank line; sentence counts come from the generator's complete sentence structures rather than splitting punctuation.

## How generation works

`script.js` contains vocabulary banks, grammatical sentence templates, style profiles, intensity rules, and the browser controls. English and Czech have separate vocabulary and grammatical templates, including Czech agreement and inflection. It assembles sentences procedurally using local randomness; no language model is involved. Styles change rhetorical structures and vocabulary, while intensity changes the density and absurdity of claims. Word mode budgets complete grammatical sentences to fit the requested count. Repetition controls reject duplicate normalized sentences within a result.

The pure engine is exposed as `AIBroIpsum` in a browser and through CommonJS for tests. Its API includes `generate(options, rng)`, `normalizeOptions(options)`, `createSeededRandom(seed)`, `countWords(text)`, and `countCharacters(text)`, plus style and intensity metadata. The `language` option accepts `en` (default) or `cs`; unknown values fall back to English. Supplying a seeded RNG makes output reproducible. Generation returns the canonical `text`, `sentences`, `paragraphs`, `wordCount`, and `characterCount`.

## Verification

With Node.js installed, run the built-in test runner; there are no dependencies to install:

```sh
node --test tests/*.test.cjs
```

The generator suite checks all style/intensity combinations at paragraph and sentence limits, every word target from 10 through 500 for each style with the opening on and off, sentence uniqueness, complete punctuation, counters, option bounds, seeded reproducibility, and individual embellishment switches. The interface suite uses a DOM harness to check controls and actions, theme restoration before interface initialization, mode switching without changing output, unavailable browser storage, language restoration, language switching with preserved settings, and Czech copy/download consistency. A harness cannot establish native browser behavior or visual layout; native browser and visual QA were unavailable in this environment. Humor and prose quality also benefit from manual review.

For browser checks, test direct-file loading, HTTP at the root, and HTTP under `/AiBroLoremIpsum/`. To preview the project subpath, start `python3 -m http.server 8001` from the parent directory and open `http://localhost:8001/AiBroLoremIpsum/`. Check narrow and wide viewports in both languages and themes, language switching and restoration after reload, keyboard focus, remembered theme after reload, blocked storage, unit bounds, Generate/Regenerate, clipboard success and denial, and downloaded text. Copied and downloaded output should match the displayed text exactly. Runtime generation should make no outbound requests.

## GitHub Pages

Publish these files directly; there is no build step. Keep `index.html`, `style.css`, `script.js`, and `.nojekyll` at the repository root. Asset paths are relative so the site works beneath the project path.

After committing and pushing to `main`, open the repository's **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, branch **main**, folder **/(root)**, and save. The expected project URL is:

<https://stepankocis.github.io/AiBroLoremIpsum/>

Wait for GitHub's Pages deployment to finish before checking that URL. Publishing requires repository write access and working Git authentication. This environment previously reached the HTTPS authentication prompt without usable credentials; a successful push and live deployment must be verified separately. Do not store credentials in project files. See `PLAN.md` for the recorded Git checks.

## License

Mozilla Public License 2.0. See [LICENSE](./LICENSE).

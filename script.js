/* AI Bro Ipsum: a local, deterministic grammar engine. No neural networks required. */
(function (root) {
  'use strict';

  const styles = [
    { value: 'classic', label: 'Classic AI Bro', description: 'Confident enterprise nonsense.' },
    { value: 'linkedin', label: 'LinkedIn Influencer', description: 'Personal revelations with professional consequences.' },
    { value: 'vc', label: 'VC Pitch Deck', description: 'A defensible market for indefensible claims.' },
    { value: 'founder', label: 'Startup Founder', description: 'Shipping before understanding.' },
    { value: 'research', label: 'AI Research Paper', description: 'Formally evaluated speculation.' },
    { value: 'keynote', label: 'Tech Conference Keynote', description: 'Big ideas for very large screens.' },
    { value: 'doomer', label: 'AGI Doomer', description: 'The end of the world has a roadmap.' },
    { value: 'vibe', label: 'Vibe Coding Evangelist', description: 'Production is a state of mind.' }
  ];
  const intensities = [
    { value: 1, label: 'Intern', description: 'Almost coherent' },
    { value: 2, label: 'Startup Founder', description: 'Mildly insufferable' },
    { value: 3, label: 'LinkedIn Thought Leader', description: 'Maximum engagement bait' },
    { value: 4, label: 'AGI Evangelist', description: 'Completely detached from reality' },
    { value: 5, label: 'Singularity', description: 'Beyond human comprehension' }
  ];
  const split = text => text.split('|');
  // Entries are complete grammatical constituents; singular subjects always take singular verbs.
  const vocabulary = {
    subjects: split('our platform|the agent|the model|the product|the system|the workflow|the roadmap|the dashboard|the prototype|the assistant|the strategy|the framework|the architecture|the pipeline|the interface|the deployment|the benchmark|the team|the integration|the algorithm'),
    verbs: split('accelerates|orchestrates|automates|reimagines|compresses|unlocks|optimizes|democratizes|monetizes|operationalizes|transforms|synthesizes|streamlines|repackages|amplifies|abstracts|harmonizes|prioritizes|contextualizes|productizes'),
    objects: split('customer discovery|enterprise intelligence|institutional memory|decision velocity|organizational alignment|workflow automation|knowledge retrieval|creative output|human potential|market intelligence|developer productivity|operational excellence|strategic optionality|business transformation|stakeholder confidence|platform adoption|product discovery|internal communication|procurement anxiety|the onboarding experience'),
    contexts: split('inside the enterprise|across the organization|beyond the pilot|within the workflow|through the next quarter|across every department|before the next standup|during customer discovery|under realistic conditions|inside the feedback loop|across the value chain|behind the demo|through the distribution layer|within the context window|after the funding round|beneath the abstraction layer|during the board meeting|across the developer ecosystem|before the keynote|through the procurement process'),
    qualities: split('scalable|adaptive|modular|contextual|practical|composable|frictionless|intelligent|responsive|programmable|distributed|personalized|predictive|collaborative|resilient|explainable|interoperable|autonomous|production-ready|enterprise-grade'),
    outcomes: split('a shorter sales cycle|a better onboarding flow|a larger context window|a more compelling demo|a scalable revenue engine|a defensible data moat|a frictionless customer journey|a credible growth story|a unified intelligence layer|a new distribution channel|a cleaner board narrative|a deeper feedback loop|a more persuasive chart|a self-improving workflow|a proprietary learning advantage|an extensible operating model|a new category of spending|a surprisingly expensive dashboard|a compelling acquisition target|a recurring reason to meet'),
    artifacts: split('the product brief|the investor update|the strategy document|the launch announcement|the onboarding guide|the pricing page|the evaluation suite|the technical appendix|the customer interview|the board deck|the architecture diagram|the model card|the compliance checklist|the demo recording|the incident report|the press release|the performance review|the planning spreadsheet|the internal memo|the mission statement'),
    people: split('the procurement team|our design partners|the investment committee|the developer community|the executive sponsor|the early adopters|the platform engineers|the board of directors|the enterprise buyers|the product managers|the independent evaluators|the growth team|the legal department|the keynote audience|the research community|the customer advisory board|the founding team|the sales organization|the integration partners|the human reviewers'),
    concerns: split('latency|reliability|interpretability|distribution|retention|alignment|observability|calibration|reproducibility|data provenance|inference costs|evaluation quality|context collapse|model drift|reward hacking|permission boundaries|benchmark contamination|deployment risk|training stability|human oversight'),
    pivots: split('a pricing experiment|a customer interview|a weekend prototype|a strategic offsite|a cancelled pilot|a late-night whiteboard session|a confusing support ticket|a failed integration|an unsolicited investor email|a surprising demo|an accidental benchmark|a forgotten backlog item|a lengthy onboarding call|a production incident|a hallway conversation|a retrospective|a competitor launch|an empty analytics dashboard|a missed deadline|a rebranding exercise'),
    technologies: split('AGI|ASI|RAG|MCP|agentic orchestration|vibe coding|sovereign AI|founder mode|open-weight models|synthetic data flywheels|mixture-of-experts routing|retrieval-augmented generation|test-time compute|reinforcement learning|constitutional alignment|multimodal reasoning|tool calling|vector databases|semantic caching|distilled reasoning|10x engineers|100x productivity|multi-agent orchestration|token optimization|inference-time compute|reasoning models|RAG pipelines|MCP servers|vertical integration|AI wrappers|post-scarcity economics|first-principles thinking|open-weight frontier models|zero-to-one innovation|transformative synergies|hyper-scalability|AGI/ASI superintelligence'),
    cliches: split('move the needle|think outside the box|circle back|boil the ocean|unlock synergies|break down silos|take it to the next level|build the plane while flying it|align on next steps|lean into the opportunity|double down|shift the paradigm|connect the dots|push the envelope|get our ducks in a row|create a win-win|find the low-hanging fruit|close the loop|bring everyone to the table|put a pin in it'),
    shortNouns: split('agents|models|founders|investors|humans|developers|benchmarks|workflows|platforms|prompts|systems|dashboards|tokens|committees|startups|pilots|interfaces|roadmaps|keynotes|prototypes'),
    shortObjects: split('alignment|momentum|intelligence|growth|adoption|revenue|confidence|leverage|progress|potential|insight|traction|optionality|consensus|innovation|certainty|abstraction|transformation|distribution|synergy')
  };
  const tiers = [
    split('a useful assistant|a searchable knowledge base|a practical workflow|a modest productivity gain|a reusable template|a better support queue|a reliable document summary|a clearer product plan|an automated handoff|a sensible next step'),
    split('an agentic growth engine|a vertical intelligence stack|a synthetic data flywheel|a founder-led distribution moat|an AI-native operating model|a composable revenue layer|a category-defining copilot|a proprietary context engine|a zero-friction adoption loop|an enterprise inference gateway'),
    split('a contrarian intelligence thesis|a personal monopoly on insight|an exponential mindset layer|a thought-leadership flywheel|an asymmetric attention moat|a category-creation framework|a permissionless ambition engine|a post-work leadership model|a radically authentic data story|an unfair advantage in authenticity'),
    split('a sovereign AGI substrate|a recursively aligned ASI|a planetary agent mesh|a self-improving civilization stack|an autonomous inference economy|a post-human orchestration layer|a frontier cognition protocol|a universal reasoning market|a sentient distribution channel|an infinitely scalable agency layer'),
    split('a quantum-adjacent ambition singularity|a hyperdimensional founder resonance|a recursively sovereign vibe manifold|a post-causal synergy organism|a sentient liquidity hypersphere|a transhuman inference cathedral|an ontological moat generator|a cosmic context-window collapse|a self-financing reality gradient|an infinitely agentic destiny tensor')
  ];
  const styleWords = {
    classic: split('enterprise adoption|platform strategy|the intelligence layer|operational leverage|agentic infrastructure|business outcomes|a procurement-friendly future|the workflow stack'),
    linkedin: split('authentic leadership|personal growth|my professional journey|radical vulnerability|the creator economy|a growth mindset|my morning routine|the comment section'),
    vc: split('total addressable market|capital efficiency|network effects|durable moats|distribution advantages|portfolio construction|venture-scale returns|the next funding round'),
    founder: split('customer obsession|founder mode|our burn rate|the next sprint|product-market fit|our design partners|the shipping cadence|our precious runway'),
    research: split('the proposed method|the baseline model|the evaluation protocol|the ablation study|the held-out dataset|the latent representation|the training objective|the supplementary material'),
    keynote: split('the next era of computing|our shared future|the power of possibility|this historic moment|the next generation|the innovation journey|the live demonstration|the digital horizon'),
    doomer: split('instrumental convergence|existential risk|the alignment problem|recursive self-improvement|the control problem|the deployment threshold|the last safe checkpoint|the warning signs'),
    vibe: split('the prompt history|the agent terminal|the mystery dependency|the deploy button|the missing test suite|the generated code|the production vibes|the preview environment')
  };
  const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1);
  const countWords = text => String(text).split(/\s+/u).filter(token => /[\p{L}\p{N}]/u.test(token)).length;
  const countCharacters = text => Array.from(String(text)).length;
  function normalizeOptions(input) {
    const o = input && typeof input === 'object' ? input : {};
    const unit = ['paragraphs', 'sentences', 'words'].includes(o.unit) ? o.unit : 'paragraphs';
    const limits = { paragraphs: [1, 20], sentences: [1, 50], words: [10, 500] }[unit];
    const numeric = Number(o.amount);
    const amount = Number.isFinite(numeric) ? Math.min(limits[1], Math.max(limits[0], Math.round(numeric))) : (unit === 'words' ? 100 : 3);
    const level = Number(o.intensity);
    return { unit, amount, intensity: Number.isFinite(level) ? Math.min(5, Math.max(1, Math.round(level))) : 2,
      style: styles.some(s => s.value === o.style) ? o.style : 'classic', startWithAI: o.startWithAI === true,
      statistics: o.statistics === true, emDashes: o.emDashes === true, cliches: o.cliches === true, declarations: o.declarations === true };
  }
  function createSeededRandom(seed) {
    let state = 2166136261;
    for (const char of String(seed)) { state ^= char.codePointAt(0); state = Math.imul(state, 16777619); }
    return function () { state += 0x6D2B79F5; let n = state; n = Math.imul(n ^ n >>> 15, n | 1); n ^= n + Math.imul(n ^ n >>> 7, n | 61); return ((n ^ n >>> 14) >>> 0) / 4294967296; };
  }
  function makeContext(o, rng) {
    const recent = new Map();
    function pick(bank) {
      const last = recent.get(bank) || [];
      let index = Math.floor(rng() * bank.length) % bank.length;
      for (let i = 0; i < bank.length && last.includes(index); i++) index = (index + 1) % bank.length;
      recent.set(bank, [...last.slice(-Math.min(3, bank.length - 2)), index]);
      return bank[index];
    }
    return { o, pick, s: () => pick(vocabulary.subjects), v: () => pick(vocabulary.verbs), obj: () => pick(vocabulary.objects),
      q: () => pick(vocabulary.qualities), aq: () => { const word = pick(vocabulary.qualities); return (/^[aeiou]/i.test(word) ? 'an ' : 'a ') + word; }, ctx: () => pick(vocabulary.contexts), out: () => pick(vocabulary.outcomes),
      art: () => pick(vocabulary.artifacts), who: () => pick(vocabulary.people), concern: () => pick(vocabulary.concerns),
      pivot: () => pick(vocabulary.pivots), tech: () => pick(vocabulary.technologies),
      idea: () => pick(tiers[o.intensity - 1]), voice: () => pick(styleWords[o.style]) };
  }
  const commonTemplates = [
    c => `${c.s()} ${c.v()} ${c.obj()} ${c.ctx()}`,
    c => `${c.s()} turns ${c.concern()} into ${c.out()}`,
    c => `the real opportunity is ${c.idea()}, provided nobody reads ${c.art()}`,
    c => `by combining ${c.tech()} with ${c.voice()}, we can finally explain the invoice`,
    c => `every discussion of ${c.obj()} eventually becomes a discussion of ${c.concern()}`,
    c => `${c.who()} requested ${c.out()}, so we delivered ${c.idea()}`,
    c => `what looks like ${c.concern()} is actually ${c.voice()} with better positioning`,
    c => `we describe ${c.idea()} as ${c.q()} because the alternative requires documentation`,
    c => `${c.s()} promises ${c.out()} while quietly depending on ${c.who()}`,
    c => `once we have explained ${c.tech()} to ${c.who()}, the onboarding meeting can finally begin`,
    c => `our approach to ${c.concern()} starts with ${c.pivot()} and ends with ${c.out()}`,
    c => `the distance between ${c.voice()} and ${c.obj()} is mostly a consulting engagement`
  ];
  const templates = {
    classic: [
      c => `our enterprise strategy pairs ${c.tech()} with ${c.idea()} to support ${c.obj()}`,
      c => `the platform provides ${c.out()} through ${c.aq()} layer of ${c.voice()}`,
      c => `we are making ${c.obj()} accessible to anyone with a budget for ${c.tech()}`,
      c => `the integration is seamless as long as we leave everything between the seams to ${c.who()}`,
      c => `our competitive advantage is ${c.idea()}; our implementation plan is another workshop`,
      c => `the business case for ${c.tech()} becomes clear once we stop measuring ${c.concern()}`
    ],
    linkedin: [
      c => `I used to believe in ${c.concern()}, until ${c.pivot()} taught me to believe in myself`,
      c => `yesterday I asked ${c.who()} about ${c.voice()}, and their silence changed my perspective`,
      c => `here is the uncomfortable truth about ${c.tech()}: your mindset is still running on legacy infrastructure`,
      c => `I turned ${c.pivot()} into ${c.idea()}, and I am sharing the lesson because humility scales`,
      c => `the best leaders do not chase ${c.obj()}; they post about ${c.voice()} before breakfast`,
      c => `if ${c.idea()} resonates with you, consider what your hesitation says about your personal brand`
    ],
    vc: [
      c => `we see a generational opportunity in ${c.voice()}, particularly if the market slide remains unread`,
      c => `our investment thesis is simple: ${c.idea()} creates ${c.out()} before unit economics gets involved`,
      c => `the moat combines ${c.tech()}, proprietary distribution, and a founder who replies unusually quickly`,
      c => `we underwrite the upside of ${c.obj()} while treating ${c.concern()} as a later-stage problem`,
      c => `the bull case is ${c.idea()}; the bear case is that customers request a working product`,
      c => `this round funds ${c.out()}, with enough capital reserved to discover what the company actually does`
    ],
    founder: [
      c => `we shipped ${c.idea()} after ${c.pivot()}, then asked our customers which problem it solved`,
      c => `our team lives in founder mode, which currently means turning ${c.concern()} into a weekend`,
      c => `we pivoted from ${c.obj()} to ${c.voice()} because the second phrase fits our new domain`,
      c => `our design partners love ${c.tech()}, especially when we join the call to operate the demo manually`,
      c => `we are relentlessly focused on ${c.out()}, except during the rebrand`,
      c => `the next sprint replaces ${c.concern()} with ${c.idea()}, pending one very specific customer interview`
    ],
    research: [
      c => `we introduce ${c.idea()}, ${c.aq()} approach to ${c.obj()} under selectively favorable conditions`,
      c => `our evaluation of ${c.tech()} controls for ${c.concern()} by excluding difficult examples`,
      c => `an ablation of ${c.voice()} suggests that the architecture depends heavily on its architecture`,
      c => `we observe that ${c.s()} ${c.v()} ${c.obj()}, although the causal mechanism remains in the appendix`,
      c => `the proposed framework yields ${c.out()}, subject to the usual limitations of ${c.concern()}`,
      c => `future work will investigate whether ${c.idea()} generalizes beyond the carefully curated demonstration`
    ],
    keynote: [
      c => `imagine a world where ${c.s()} ${c.v()} ${c.obj()} while you are still finding your seat`,
      c => `today, together, we are opening the door to ${c.idea()}`,
      c => `what if ${c.concern()} became the beginning of ${c.out()}?`,
      c => `please welcome ${c.idea()}, the reason our demo requires a dedicated backstage team`,
      c => `the next chapter of ${c.voice()} begins with ${c.tech()} and a very confident slide transition`,
      c => `look around this room and ask yourself who will build ${c.out()} after the coffee break`
    ],
    doomer: [
      c => `by the time we reach agreement with ${c.who()} on ${c.concern()}, ${c.idea()} may already control the meeting invite`,
      c => `the troubling part of ${c.tech()} is how quickly the discussion of ${c.voice()} becomes somebody else's problem`,
      c => `we cannot rule out ${c.idea()}, especially while the safety team reports to the launch calendar`,
      c => `every reassuring claim about ${c.obj()} assumes that the system shares our definition of reassuring`,
      c => `the warning signs include ${c.concern()}, unexplained capability gains, and unusually cheerful investor updates`,
      c => `our final safeguard is ${c.out()}, provided the agent has not already optimized it away`
    ],
    vibe: [
      c => `I prompted ${c.idea()} into existence and declared the remaining errors a matter of taste`,
      c => `the agent built ${c.out()} while I focused on the much harder problem of naming the repository`,
      c => `we replaced ${c.concern()} with a longer prompt, which is basically ${c.voice()} with line breaks`,
      c => `the application works in the preview, so ${c.who()} can handle the philosophical details of production`,
      c => `my stack is ${c.tech()}, positive intention, and a browser tab I am afraid to refresh`,
      c => `the compiler requested a type, so I asked ${c.idea()} to manifest a more supportive error message`
    ]
  };
  const opening = 'In the age of AI...';
  const normalizedSentence = sentence => sentence.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const compactQualities = [
    split('helpful|practical|reliable|modest|useful'),
    split('scalable|profitable|composable|proprietary|ambitious'),
    split('visionary|disruptive|authentic|influential|unstoppable'),
    split('autonomous|superintelligent|sovereign|post-human|omnipotent'),
    split('hyperdimensional|post-causal|omniscient|transcendent|cosmic')
  ];
  const compactTemplates = {
      classic: [(adjective, noun, object) => `our ${adjective} ${noun} accelerate ${object}`, (adjective, noun, object) => `${noun} make our ${object} ${adjective}`, (adjective, noun, object) => `we operationalize ${object} through ${noun}`],
      linkedin: [(adjective, noun, object) => `I learned that ${noun} matter`, (adjective, noun, object) => `my ${noun} taught me ${object}`, (adjective, noun, object) => `apparently ${noun} are ${adjective} now`],
      vc: [(adjective, noun, object) => `our ${noun} make ${object} profitable`, (adjective, noun, object) => `we fund ${noun} before profitability`, (adjective, noun, object) => `${adjective} ${noun} justify our valuation`],
      founder: [(adjective, noun, object) => `we ship ${adjective} ${noun} confidently`, (adjective, noun, object) => `we call these ${noun} ${adjective}`, (adjective, noun, object) => `our ${noun} pivot toward ${object}`],
      research: [(adjective, noun, object) => `our ${noun} demonstrate ${adjective} ${object}`, (adjective, noun, object) => `we evaluate ${noun} under supervision`, (adjective, noun, object) => `${adjective} ${noun} outperform our expectations`],
      keynote: [(adjective, noun, object) => `together we unlock ${adjective} ${object}`, (adjective, noun, object) => `please welcome our ${adjective} ${noun}`, (adjective, noun, object) => `imagine ${noun} surpassing human expectations`],
      doomer: [(adjective, noun, object) => `our ${noun} quietly threaten ${object}`, (adjective, noun, object) => `even ${adjective} ${noun} endanger ${object}`, (adjective, noun, object) => `nobody audited these ${adjective} ${noun}`],
      vibe: [(adjective, noun, object) => `my ${adjective} ${noun} need debugging`, (adjective, noun, object) => `I prompt ${noun} into existence`, (adjective, noun, object) => `these ${adjective} ${noun} deploy themselves`]
    };
  function compact(c, length) {
    const adjective = c.pick(compactQualities[c.o.intensity - 1]);
    const noun = c.pick(vocabulary.shortNouns);
    const object = c.pick(vocabulary.shortObjects);

    // Each base has five words. Optional complete modifiers provide every length through nine.
    const suffixes = ['', ' today', ' without hesitation', ' across the organization', ' before the next meeting'];
    return c.pick(compactTemplates[c.o.style])(adjective, noun, object) + suffixes[length - 5];
  }
  function decorate(body, c) {
    const question = body.endsWith('?');
    let text = question ? body.slice(0, -1) : body;
    if (c.o.statistics) {
      const ceiling = 10 ** Math.min(c.o.intensity + 1, 6);
      const metric = 11 + Math.floor(c.rng() * (ceiling - 11));
      text += c.pick([
        `, according to our entirely invented survey of ${metric} unusually agreeable founders`,
        `, with a fabricated ${metric} percent improvement in investor enthusiasm`,
        `, based on a fictional sample of ${metric} cooperative dashboards`,
        `, producing a wholly imaginary ${metric} percent reduction in awkward questions`
      ]);
    }
    if (c.o.emDashes) text += c.pick([
      ' — a breakthrough by our own definition',
      ' — assuming the slide deck is correct',
      ' — with human judgment available as a paid upgrade',
      ' — an important distinction for the marketing team'
    ]);
    if (c.o.cliches) text += `, giving us another opportunity to ${c.pick(vocabulary.cliches)}`;
    if (c.o.declarations) text += c.pick([
      '; the future has officially entered the chat',
      '; civilization will remember this product update',
      '; the era of ordinary ambition is over',
      '; history now has a new default setting'
    ]);
    return text + (question ? '?' : '.');
  }
  const expansions = [null,
        [() => 'with a sensible plan for the next iteration'],
        [c => `with ${c.idea()} at the center of the growth strategy`, c => `with a business model built around ${c.idea()}`, () => 'subject to a surprisingly optimistic estimate of the integration work'],
        [c => `because ${c.idea()} is the leadership lesson hiding in plain sight`, () => 'according to the most widely shared opinion in our professional network', () => 'with enough confidence to make independent verification seem impolite'],
        [c => `as ${c.idea()} redraws the boundaries of human capability`, c => `under the assumption that ${c.idea()} can negotiate with reality`, () => 'with implications that exceed both our context window and our insurance coverage'],
        [c => `while ${c.idea()} recursively monetizes the concept of tomorrow`, c => `with ${c.idea()} serving as the new unit of economic destiny`, () => 'pending approval from a committee that exists outside linear time']
  ];
  function sentenceCandidate(c, decorated) {
    // Keep each style's structures dominant, even at the mildest setting.
    const own = templates[c.o.style];
    const available = c.rng() < 0.78 ? own : commonTemplates;
    let body = c.pick(available)(c);
    if (!body.endsWith('?') && c.rng() < (c.o.intensity - 1) * 0.18) {
      body += ', ' + c.pick(expansions[c.o.intensity])(c);
    }
    return capitalize(decorated ? decorate(body, c) : /[.!?]$/.test(body) ? body : body + '.');
  }
  function generate(options, rng) {
    const o = normalizeOptions(options);
    const random = typeof rng === 'function' ? rng : Math.random;
    const c = makeContext(o, random);
    c.rng = random;
    const seen = new Set();
    const sentences = [];
    const paragraphs = [];
    function withOpening(sentence) {
      if (!o.startWithAI || sentences.length) return sentence;
      const first = sentence.startsWith('I ') ? sentence : sentence.charAt(0).toLowerCase() + sentence.slice(1);
      return opening + ' ' + first;
    }
    function accept(sentence) {
      const key = normalizedSentence(sentence);
      if (seen.has(key)) return false;
      seen.add(key);
      sentences.push(sentence);
      return true;
    }
    function nextSentence() {
      for (let attempt = 0; attempt < 160; attempt++) {
        const candidate = withOpening(sentenceCandidate(c, true));
        if (accept(candidate)) return candidate;
      }
      // Exhaustion is practically unreachable, but failures are bounded and explicit.
      throw new Error('The jargon supply is temporarily exhausted. Try another seed.');
    }
    if (o.unit === 'words') {
      let remaining = o.amount;
      while (remaining > 0) {
        const prefixCost = o.startWithAI && !sentences.length ? 5 : 0;
        let chosen = false;
        for (let attempt = 0; attempt < 36 && !chosen; attempt++) {
          const candidate = withOpening(sentenceCandidate(c, attempt < 24));
          const length = countWords(candidate);
          if (length <= remaining && (remaining === length || remaining - length >= 5)) {
            if (accept(candidate)) { remaining -= length; chosen = true; }
          }
        }
        if (chosen) continue;
        // Five-to-nine-word grammar rules make every remainder >= 5 reachable.
        const budget = remaining - prefixCost;
        const length = budget <= 9 ? budget : Math.min(9, budget - 5);
        for (let attempt = 0; attempt < 180 && !chosen; attempt++) {
          const candidate = withOpening(capitalize(compact(c, length)) + '.');
          if (accept(candidate)) { remaining -= countWords(candidate); chosen = true; }
        }
        if (!chosen) throw new Error('Unable to assemble unique sentences for this word budget.');
      }
      paragraphs.push(sentences.join(' '));
    } else if (o.unit === 'sentences') {
      for (let index = 0; index < o.amount; index++) nextSentence();
      paragraphs.push(sentences.join(' '));
    } else {
      for (let index = 0; index < o.amount; index++) {
        const paragraph = [];
        const size = o.style === 'linkedin' ? 3 : 3 + Math.floor(random() * 3);
        for (let j = 0; j < size; j++) paragraph.push(nextSentence());
        paragraphs.push(paragraph.join(' '));
      }
    }
    const text = paragraphs.join('\n\n');
    return { text, sentences, paragraphs, wordCount: countWords(text), characterCount: countCharacters(text) };
  }
  const api = { generate, countWords, countCharacters, normalizeOptions, createSeededRandom, styles, intensities };
  root.AIBroIpsum = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);


// Page interactions stay separate from the pure, independently testable engine.
(function initializeInterface() {
  'use strict';
  if (typeof document === 'undefined') return;

  const engine = globalThis.AIBroIpsum;
  const byId = (id) => document.getElementById(id);
  const form = byId('generator-form');
  if (!form || !engine) return;

  const amount = byId('amount');
  const unit = byId('unit');
  const intensity = byId('intensity');
  const output = byId('output');
  const status = byId('status');
  const limits = { paragraphs: [1, 20], sentences: [1, 50], words: [10, 500] };
  const flags = ['startWithAI', 'statistics', 'emDashes', 'cliches', 'declarations'];
  const recentOutputs = [];
  let currentText = '';

  function announce(message) {
    status.textContent = message;
  }

  function syncAmount() {
    const [minimum, maximum] = limits[unit.value] || limits.paragraphs;
    amount.min = String(minimum);
    amount.max = String(maximum);
    const value = Number(amount.value);
    amount.value = String(Math.min(maximum, Math.max(minimum, Number.isFinite(value) && amount.value !== '' ? Math.round(value) : minimum)));
    byId('amount-hint').textContent = `Choose ${minimum}–${maximum} ${unit.value}.`;
  }

  function syncIntensity() {
    const profile = engine.intensities.find((item) => Number(item.value) === Number(intensity.value));
    if (!profile) return;
    byId('intensity-label').textContent = profile.label;
    byId('intensity-description').textContent = profile.description;
    intensity.setAttribute('aria-valuetext', `${profile.label}. ${profile.description}`);
  }

  function settings() {
    return engine.normalizeOptions({
      amount: Number(amount.value),
      unit: unit.value,
      intensity: Number(intensity.value),
      style: byId('style').value,
      ...Object.fromEntries(flags.map((name) => [name, byId(name).checked])),
    });
  }

  function generate() {
    syncAmount();
    const options = settings();
    let result;
    for (let attempt = 0; attempt < 4; attempt += 1) {
      result = engine.generate(options);
      if (!recentOutputs.includes(result.text)) break;
    }
    currentText = result.text;
    recentOutputs.push(currentText);
    if (recentOutputs.length > 6) recentOutputs.shift();
    output.textContent = currentText;
    byId('word-count').textContent = result.wordCount.toLocaleString();
    byId('character-count').textContent = result.characterCount.toLocaleString();
    announce(`Generated ${result.wordCount} words. Absolutely no intelligence required.`);
  }

  function legacyCopy(text) {
    const previousFocus = document.activeElement;
    const field = document.createElement('textarea');
    field.value = text;
    field.setAttribute('readonly', '');
    field.setAttribute('aria-label', 'Text to copy');
    field.style.cssText = 'position:fixed;left:-9999px;top:0;opacity:0;';
    document.body.appendChild(field);
    field.select();
    let copied = false;
    try {
      copied = typeof document.execCommand === 'function' && document.execCommand('copy');
    } catch {
      copied = false;
    } finally {
      field.remove();
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus({ preventScroll: true });
    }
    return copied;
  }

  function selectOutput() {
    const selection = globalThis.getSelection();
    if (!selection) return;
    const range = document.createRange();
    range.selectNodeContents(output);
    selection.removeAllRanges();
    selection.addRange(range);
    output.focus({ preventScroll: true });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    generate();
  });
  // Normalize values ourselves so keyboard edits and unit switches follow the
  // same contract as the generator instead of blocking on stale HTML bounds.
  form.noValidate = true;
  unit.addEventListener('change', syncAmount);
  amount.addEventListener('change', syncAmount);
  intensity.addEventListener('input', syncIntensity);
  byId('regenerate').addEventListener('click', generate);

  byId('copy').addEventListener('click', async () => {
    if (!currentText) return;
    const text = currentText;
    let copied = false;
    try {
      if (globalThis.navigator.clipboard && globalThis.isSecureContext) {
        await globalThis.navigator.clipboard.writeText(text);
        copied = true;
      }
    } catch {
      // Direct local files and denied clipboard permissions use the fallback.
    }
    if (!copied) copied = legacyCopy(text);
    if (copied) {
      announce('Copied to clipboard. Your thought leadership is ready.');
    } else {
      selectOutput();
      announce('Clipboard access is unavailable. Text selected: press Ctrl+C or Command+C to copy.');
    }
  });

  byId('download').addEventListener('click', () => {
    if (!currentText) return;
    const blob = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-bro-ipsum.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    // Allow the browser to begin consuming the Blob before releasing it.
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    announce('Downloaded ai-bro-ipsum.txt. Your moat is now portable.');
  });

  byId('easter-egg').addEventListener('click', () => {
    const message = byId('easter-message');
    message.hidden = !message.hidden;
    byId('easter-egg').setAttribute('aria-expanded', String(!message.hidden));
  });

  syncAmount();
  syncIntensity();
  generate();
})();

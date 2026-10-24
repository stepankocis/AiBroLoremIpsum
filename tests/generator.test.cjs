'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const {
  generate, countWords, countCharacters, normalizeOptions, createSeededRandom,
} = require('../script.js');

const styles = ['classic', 'linkedin', 'vc', 'founder', 'research', 'keynote', 'doomer', 'vibe'];
const defaults = {
  unit: 'paragraphs', amount: 3, intensity: 2, style: 'classic',
  startWithAI: false, statistics: false, emDashes: false, cliches: false,
  declarations: false,
};
const opening = 'In the age of AI...';
const statisticPattern = /entirely invented survey of \d+|fabricated \d+ percent|fictional sample of \d+|wholly imaginary \d+ percent/iu;
const declarationPattern = /the future has officially entered the chat|civilization will remember this product update|the era of ordinary ambition is over|history now has a new default setting/iu;
const clichePattern = /move the needle|think outside the box|circle back|boil the ocean|unlock synergies|break down silos|take it to the next level|build the plane while flying it|align on next steps|lean into the opportunity|double down|shift the paradigm|connect the dots|push the envelope|get our ducks in a row|create a win-win|find the low-hanging fruit|close the loop|bring everyone to the table|put a pin in it/iu;
const normalizedSentence = (sentence) => sentence.toLowerCase().replace(/[^\p{L}\p{N}]/gu, '');
const independentWordCount = (text) => text.split(/\s+/u).filter((token) => /[\p{L}\p{N}]/u.test(token)).length;

function checkResult(result, options) {
  assert.equal(typeof result.text, 'string');
  assert.ok(result.text.length > 0);
  assert.ok(Array.isArray(result.sentences) && result.sentences.length > 0);
  assert.ok(Array.isArray(result.paragraphs) && result.paragraphs.length > 0);
  assert.equal(result.text, result.paragraphs.join('\n\n'));
  assert.equal(result.wordCount, independentWordCount(result.text));
  assert.equal(result.wordCount, countWords(result.text));
  assert.equal(result.characterCount, Array.from(result.text).length);
  assert.equal(result.characterCount, countCharacters(result.text));
  const normalized = result.sentences.map(normalizedSentence);
  assert.equal(new Set(normalized).size, normalized.length, 'sentences must remain unique after punctuation/case normalization');
  for (const sentence of result.sentences) {
    assert.match(sentence, /^\p{Lu}/u, `sentence must start with a capital: ${sentence}`);
    assert.match(sentence, /[.!?]["”')]*$/u, `sentence must end completely: ${sentence}`);
    assert.doesNotMatch(sentence, /undefined|\[object Object\]|NaN/);
  }
  if (options.startWithAI) {
    assert.ok(result.text.startsWith(opening));
    assert.equal(result.text.split(opening).length - 1, 1);
  } else {
    assert.ok(!result.text.startsWith(opening));
  }
  if (!options.emDashes) assert.doesNotMatch(result.text, /—/u);
  if (!options.statistics) assert.doesNotMatch(result.text, /\d+(?:\.\d+)?\s*%/u);
  if (!options.statistics) assert.doesNotMatch(result.text, statisticPattern);
  if (!options.cliches) assert.doesNotMatch(result.text, clichePattern);
  if (!options.declarations) assert.doesNotMatch(result.text, declarationPattern);
  if (options.unit === 'words') assert.equal(result.wordCount, options.amount);
  if (options.unit === 'sentences') assert.equal(result.sentences.length, options.amount);
  if (options.unit === 'paragraphs') assert.equal(result.paragraphs.length, options.amount);
}

test('word and character counters follow the documented Unicode conventions', () => {
  assert.equal(countWords('  AI — 10x\nco-founder ... café 🤖  '), 4);
  assert.equal(countWords('— … !!! 🤖'), 0);
  assert.equal(countWords('你好 １２３'), 2);
  assert.equal(countCharacters('A🤖\n—'), 4);
});

test('seeded random streams and generation are reproducible', () => {
  const first = createSeededRandom(12345);
  const second = createSeededRandom(12345);
  const sequence = Array.from({ length: 50 }, () => first());
  assert.deepEqual(sequence, Array.from({ length: 50 }, () => second()));
  assert.ok(sequence.every((value) => value >= 0 && value < 1));
  const options = { ...defaults, amount: 8, intensity: 5, startWithAI: true, statistics: true, emDashes: true, cliches: true, declarations: true };
  assert.deepEqual(generate(options, createSeededRandom(90)), generate(options, createSeededRandom(90)));
  assert.notEqual(generate(options, createSeededRandom(90)).text, generate(options, createSeededRandom(91)).text);
});

test('normalization defaults, bounds, and invalid choices are predictable', () => {
  const normalized = normalizeOptions({});
  for (const [key, value] of Object.entries(defaults)) assert.equal(normalized[key], value, key);
  for (const [unit, minimum, maximum] of [['paragraphs', 1, 20], ['sentences', 1, 50], ['words', 10, 500]]) {
    assert.equal(normalizeOptions({ unit, amount: -100 }).amount, minimum);
    assert.equal(normalizeOptions({ unit, amount: 9999 }).amount, maximum);
    assert.ok(Number.isInteger(normalizeOptions({ unit, amount: 13.7 }).amount));
    assert.ok(Number.isFinite(normalizeOptions({ unit, amount: 'invalid' }).amount));
  }
  assert.equal(normalizeOptions({ style: 'unknown', unit: 'unknown' }).style, 'classic');
  assert.equal(normalizeOptions({ style: 'unknown', unit: 'unknown' }).unit, 'paragraphs');
  assert.equal(normalizeOptions({ intensity: -1 }).intensity, 1);
  assert.equal(normalizeOptions({ intensity: 999 }).intensity, 5);
});

test('each embellishment independently adds its requested feature across all profiles', () => {
  const features = [
    ['statistics', statisticPattern],
    ['emDashes', /—/u],
    ['cliches', clichePattern],
    ['declarations', declarationPattern],
  ];
  for (const style of styles) {
    for (let intensity = 1; intensity <= 5; intensity++) {
      for (const [feature, marker] of features) {
        const options = { ...defaults, style, intensity, unit: 'sentences', amount: 5, [feature]: true };
        const result = generate(options, createSeededRandom(`${style}:${intensity}:${feature}`));
        checkResult(result, options);
        assert.match(result.text, marker, `${feature} must affect ${style} at intensity ${intensity}`);
      }
    }
  }
});

for (const style of styles) {
  test(`${style}: every intensity preserves paragraph and sentence boundary contracts`, () => {
    for (let intensity = 1; intensity <= 5; intensity++) {
      for (const [unit, amount] of [['paragraphs', 1], ['paragraphs', 20], ['sentences', 1], ['sentences', 50]]) {
        for (const enabled of [false, true]) {
          const options = { ...defaults, style, intensity, unit, amount, startWithAI: enabled, statistics: enabled, emDashes: enabled, cliches: enabled, declarations: enabled };
          checkResult(generate(options, createSeededRandom(`${style}:${intensity}:${unit}:${amount}:${enabled}`)), options);
        }
      }
    }
  });

  test(`${style}: every exact word target from 10 through 500, with and without the opening`, () => {
    for (let amount = 10; amount <= 500; amount++) {
      for (const enabled of [false, true]) {
        const options = { ...defaults, style, unit: 'words', amount, intensity: (amount % 5) + 1, startWithAI: enabled, statistics: enabled, emDashes: enabled, cliches: enabled, declarations: enabled };
        const result = generate(options, createSeededRandom(`${style}:${amount}:${enabled}`));
        try { checkResult(result, options); }
        catch (error) { error.message = `${style}, ${amount} words, opening ${enabled}: ${error.message}`; throw error; }
      }
    }
  });
}

test('editorial regressions preserve agreement and rhetorical question punctuation', () => {
  const pluralPeople = /(?:our design partners|the platform engineers|the enterprise buyers|the product managers|the independent evaluators|the early adopters|the integration partners|the human reviewers) (?:handles|understands|agrees)\b/iu;
  let rhetoricalQuestions = 0;
  for (const style of styles) {
    for (let intensity = 1; intensity <= 5; intensity++) {
      const result = generate({ ...defaults, style, intensity, unit: 'sentences', amount: 50 }, createSeededRandom(`editorial:${style}:${intensity}`));
      assert.doesNotMatch(result.text, pluralPeople);
      assert.doesNotMatch(result.text, /how quickly the warning signs becomes\b/iu);
      for (const sentence of result.sentences) {
        if (/^What if\b/u.test(sentence)) {
          rhetoricalQuestions++;
          assert.ok(sentence.endsWith('?'), `rhetorical question lost its punctuation: ${sentence}`);
        }
      }
    }
  }
  assert.ok(rhetoricalQuestions > 0, 'review sample must exercise keynote questions');
});

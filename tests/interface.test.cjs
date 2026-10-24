'use strict';

// A small DOM fixture exercises the actual shipped script without adding a
// browser dependency. Visual layout and native permissions still need a browser.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');

function mount({ clipboard, legacyCopy = false, secure = false, savedTheme, storageUnavailable = false, storageWriteDenied = false } = {}) {
  const nodes = new Map();
  const downloads = [];
  const blobs = new Map();
  const timers = [];
  const stored = new Map(savedTheme === undefined ? [] : [['ai-bro-ipsum-theme', savedTheme]]);
  let selection;
  let legacyText;
  let document;

  class Element {
    constructor(tag = 'div', attributes = {}) {
      this.tagName = tag.toUpperCase();
      this.attributes = attributes;
      this.value = attributes.value || '';
      this.checked = Object.hasOwn(attributes, 'checked');
      this.hidden = Object.hasOwn(attributes, 'hidden');
      this.textContent = '';
      this.style = {};
      this.listeners = {};
      this.children = [];
    }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return this.attributes[name]; }
    addEventListener(type, callback) { (this.listeners[type] ||= []).push(callback); }
    async dispatch(type) {
      for (const callback of this.listeners[type] || []) await callback({ preventDefault() {} });
    }
    appendChild(child) { this.children.push(child); }
    remove() {}
    select() { legacyText = this.value; }
    focus() { document.activeElement = this; }
    click() {
      if (this.tagName === 'A') downloads.push({ href: this.href, name: this.download });
    }
  }

  for (const match of html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/giu)) {
    const attributes = Object.fromEntries(Array.from(match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/gu), (item) => [item[1], item[2] || '']));
    if (!attributes.id) continue;
    assert.ok(!nodes.has(attributes.id), `duplicate HTML id: ${attributes.id}`);
    nodes.set(attributes.id, new Element(match[1], attributes));
  }
  for (const match of html.matchAll(/<select\b[^>]*id="([^"]+)"[^>]*>([\s\S]*?)<\/select>/giu)) {
    const options = Array.from(match[2].matchAll(/<option\b([^>]*)>/giu));
    const selected = options.find((item) => /\bselected\b/u.test(item[1])) || options[0];
    nodes.get(match[1]).value = /value="([^"]*)"/u.exec(selected[1])[1];
  }
  document = {
    documentElement: new Element('html', { 'data-theme': 'dark' }),
    body: new Element('body'),
    activeElement: null,
    getElementById: (id) => nodes.get(id),
    createElement: (tag) => new Element(tag),
    execCommand: (command) => command === 'copy' && legacyCopy,
    createRange: () => ({ selectNodeContents: (element) => { selection = element; } }),
  };
  const context = vm.createContext({
    document,
    navigator: { clipboard },
    isSecureContext: secure,
    getSelection: () => ({ removeAllRanges() {}, addRange() {} }),
    Blob,
    URL: {
      createObjectURL: (blob) => { const url = `blob:test-${blobs.size}`; blobs.set(url, blob); return url; },
      revokeObjectURL: (url) => blobs.delete(url),
    },
    setTimeout: (callback) => timers.push(callback),
    console,
  });
  Object.defineProperty(context, 'localStorage', {
    get() {
      if (storageUnavailable) throw new Error('Storage unavailable');
      return {
        getItem: (key) => stored.get(key) ?? null,
        setItem: (key, value) => {
          if (storageWriteDenied) throw new Error('Storage write denied');
          stored.set(key, value);
        },
      };
    },
  });
  // Run the shipped head bootstrap, so its storage handling and pre-paint mode
  // restoration are covered independently of the deferred interface script.
  for (const match of html.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/giu)) {
    vm.runInContext(match[1], context);
  }
  const initialTheme = document.documentElement.getAttribute('data-theme');
  vm.runInContext(fs.readFileSync(path.join(__dirname, '../script.js'), 'utf8'), context);
  return { nodes, context, downloads, blobs, timers, stored, initialTheme, get selection() { return selection; }, get legacyText() { return legacyText; } };
}

test('theme starts dark and restores valid saved preferences before interface initialization', () => {
  for (const [savedTheme, expected] of [[undefined, 'dark'], ['light', 'light'], ['dark', 'dark'], ['unexpected', 'dark']]) {
    const { nodes, context, initialTheme } = mount({ savedTheme });
    assert.equal(initialTheme, expected);
    assert.equal(context.document.documentElement.getAttribute('data-theme'), expected);
    assert.equal(nodes.get('theme-toggle').getAttribute('aria-pressed'), String(expected === 'light'));
    assert.equal(nodes.get('theme-label').textContent, expected === 'light' ? 'Dark mode' : 'Light mode');
    assert.equal(nodes.get('theme-color').getAttribute('content'), expected === 'light' ? '#faf8f2' : '#191917');
  }
});

test('theme toggle persists both modes and preserves output, counters, and edited settings', async () => {
  const { nodes, context, stored } = mount();
  nodes.get('amount').value = '17';
  nodes.get('style').value = 'doomer';
  nodes.get('statistics').checked = true;
  const output = nodes.get('output').textContent;
  const words = nodes.get('word-count').textContent;
  const characters = nodes.get('character-count').textContent;
  for (const theme of ['light', 'dark']) {
    await nodes.get('theme-toggle').dispatch('click');
    assert.equal(context.document.documentElement.getAttribute('data-theme'), theme);
    assert.equal(stored.get('ai-bro-ipsum-theme'), theme);
    assert.equal(nodes.get('theme-toggle').getAttribute('aria-label'), `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
    assert.equal(nodes.get('theme-toggle').getAttribute('aria-pressed'), String(theme === 'light'));
    assert.equal(nodes.get('theme-label').textContent, theme === 'light' ? 'Dark mode' : 'Light mode');
    assert.equal(nodes.get('theme-color').getAttribute('content'), theme === 'light' ? '#faf8f2' : '#191917');
    assert.equal(nodes.get('status').textContent, `${theme === 'light' ? 'Light' : 'Dark'} mode enabled.`);
    assert.equal(nodes.get('output').textContent, output);
    assert.equal(nodes.get('word-count').textContent, words);
    assert.equal(nodes.get('character-count').textContent, characters);
    assert.equal(nodes.get('amount').value, '17');
    assert.equal(nodes.get('style').value, 'doomer');
    assert.equal(nodes.get('statistics').checked, true);
  }
});

test('unavailable storage and denied writes do not prevent theme changes or generation', async () => {
  for (const options of [{ storageUnavailable: true }, { storageWriteDenied: true }]) {
    const { nodes, context, initialTheme } = mount(options);
    assert.equal(initialTheme, 'dark');
    await nodes.get('theme-toggle').dispatch('click');
    assert.equal(context.document.documentElement.getAttribute('data-theme'), 'light');
    await nodes.get('regenerate').dispatch('click');
    assert.ok(nodes.get('output').textContent.length > 0);
    assert.match(nodes.get('status').textContent, /Generated/u);
  }
});

test('static document uses local assets and supplies all accessible controls', () => {
  const ids = ['theme-toggle', 'theme-label', 'theme-color', 'generator-form', 'amount', 'unit', 'amount-hint', 'intensity', 'intensity-label', 'intensity-description', 'style', 'startWithAI', 'statistics', 'emDashes', 'cliches', 'declarations', 'output', 'word-count', 'character-count', 'status', 'regenerate', 'copy', 'download', 'easter-egg', 'easter-message'];
  const { nodes } = mount();
  for (const id of ids) assert.ok(nodes.has(id), id);
  assert.match(html, /href="\.\/style\.css"/u);
  assert.match(html, /src="\.\/script\.js" defer/u);
  assert.doesNotMatch(html, /(?:src|href)="(?:https?:)?\/\//u);
  assert.equal(nodes.get('status').getAttribute('aria-live'), 'polite');
  assert.equal(nodes.get('output').getAttribute('tabindex'), '0');
});

test('initial generation, form submission, bounds and regenerate update canonical output and counters', async () => {
  const { nodes, context } = mount();
  const output = nodes.get('output');
  assert.equal(output.textContent.split('\n\n').length, 3);
  nodes.get('unit').value = 'words';
  await nodes.get('unit').dispatch('change');
  assert.equal(nodes.get('amount').value, '10');
  assert.equal(nodes.get('amount').min, '10');
  assert.equal(nodes.get('amount').max, '500');
  nodes.get('startWithAI').checked = true;
  nodes.get('style').value = 'doomer';
  nodes.get('intensity').value = '5';
  await nodes.get('intensity').dispatch('input');
  assert.match(nodes.get('intensity-label').textContent, /Singularity/u);
  await nodes.get('generator-form').dispatch('submit');
  assert.ok(output.textContent.startsWith('In the age of AI...'));
  assert.equal(context.AIBroIpsum.countWords(output.textContent), 10);
  assert.equal(nodes.get('word-count').textContent, '10');
  assert.equal(nodes.get('character-count').textContent, Array.from(output.textContent).length.toLocaleString());
  const previous = output.textContent;
  await nodes.get('regenerate').dispatch('click');
  assert.notEqual(output.textContent, previous);
  nodes.get('amount').value = '9999';
  nodes.get('unit').value = 'sentences';
  await nodes.get('unit').dispatch('change');
  assert.equal(nodes.get('amount').value, '50');
});

test('clipboard success copies exactly the displayed text and confirms it', async () => {
  let copied;
  const { nodes } = mount({ secure: true, clipboard: { writeText: async (text) => { copied = text; } } });
  await nodes.get('copy').dispatch('click');
  assert.equal(copied, nodes.get('output').textContent);
  assert.match(nodes.get('status').textContent, /Copied to clipboard/u);
});

test('direct-file clipboard fallback copies canonical text', async () => {
  const page = mount({ legacyCopy: true });
  await page.nodes.get('copy').dispatch('click');
  assert.equal(page.legacyText, page.nodes.get('output').textContent);
  assert.match(page.nodes.get('status').textContent, /Copied to clipboard/u);
});

test('denied clipboard selects output and explains manual copying without false success', async () => {
  const page = mount({ secure: true, clipboard: { writeText: async () => { throw new Error('Denied'); } } });
  await page.nodes.get('copy').dispatch('click');
  assert.equal(page.selection, page.nodes.get('output'));
  assert.match(page.nodes.get('status').textContent, /Ctrl\+C or Command\+C/u);
  assert.doesNotMatch(page.nodes.get('status').textContent, /Copied/u);
});

test('download uses a UTF-8 text Blob matching output and releases its URL', async () => {
  const { nodes, downloads, blobs, timers } = mount();
  await nodes.get('download').dispatch('click');
  assert.equal(downloads.length, 1);
  assert.equal(downloads[0].name, 'ai-bro-ipsum.txt');
  const blob = blobs.get(downloads[0].href);
  assert.equal(blob.type, 'text/plain;charset=utf-8');
  assert.equal(await blob.text(), nodes.get('output').textContent);
  for (const callback of timers) callback();
  assert.equal(blobs.size, 0);
});

test('accessible Easter egg toggles its message and expanded state', async () => {
  const { nodes } = mount();
  assert.equal(nodes.get('easter-message').hidden, true);
  await nodes.get('easter-egg').dispatch('click');
  assert.equal(nodes.get('easter-message').hidden, false);
  assert.equal(nodes.get('easter-egg').getAttribute('aria-expanded'), 'true');
  await nodes.get('easter-egg').dispatch('click');
  assert.equal(nodes.get('easter-message').hidden, true);
  assert.equal(nodes.get('easter-egg').getAttribute('aria-expanded'), 'false');
});

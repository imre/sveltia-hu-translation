// Checks the Hungarian drafts against the English sources they were translated from.
// Run from the repository root (npm install && npm run validate), or with Docker:
//   docker run --rm -v "$PWD":/h -w /h node:24 sh -c 'npm i --no-save yaml@2.5.1 >/dev/null 2>&1 && node validate.mjs'
import { readFile } from 'node:fs/promises';
import YAML from 'yaml';

const PAIRS = [
  ['sveltia-cms', 'english-source/sveltia-cms.en-US.yaml', 'sveltia-cms/hu.yaml'],
  ['sveltia-ui', 'english-source/sveltia-ui.en-US.yaml', 'sveltia-ui/hu.yaml'],
];

// Flatten to { 'a.b.c': 'string' }
function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj ?? {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object') flatten(v, key, out);
    else out[key] = String(v);
  }
  return out;
}

// Placeholders, MF2 markup, HTML tags and `code` that must survive translation
const tokens = (s) =>
  [...s.matchAll(/\{\$[\w-]+\}|\{[#/][\w-]+\/?\}|<\/?[a-z][^>]*>|`[^`]*`/g)].map((m) => m[0]).sort().join(' ');
const matchKeys = (s) => (/\.match/.test(s) ? [...s.matchAll(/^\s*([^\s{]+)\s+\{\{/gm)].map((m) => m[1]) : []);
const commentLines = (text) => text.split('\n').filter((l) => /^\s*#/.test(l)).length;

let failures = 0;
for (const [name, enPath, huPath] of PAIRS) {
  const enText = await readFile(enPath, 'utf8');
  const huText = await readFile(huPath, 'utf8');
  const problems = [];
  let hu;
  try {
    hu = flatten(YAML.parse(huText));
  } catch (e) {
    console.log(`${name}: YAML error: ${e.message.split('\n')[0]}`);
    failures++;
    continue;
  }
  const en = flatten(YAML.parse(enText));
  for (const k of Object.keys(en)) if (!(k in hu)) problems.push(`missing key: ${k}`);
  for (const k of Object.keys(hu)) if (!(k in en)) problems.push(`extra key: ${k}`);
  for (const [k, v] of Object.entries(en)) {
    if (!(k in hu)) continue;
    if (tokens(v) !== tokens(hu[k])) problems.push(`token mismatch ${k}: en[${tokens(v)}] hu[${tokens(hu[k])}]`);
    for (const mk of matchKeys(hu[k])) {
      if (['zero', 'two', 'few', 'many'].includes(mk)) problems.push(`plural category not used in Hungarian ${k}: ${mk}`);
    }
  }
  if (commentLines(enText) !== commentLines(huText)) problems.push(`comment lines: en ${commentLines(enText)} vs hu ${commentLines(huText)}`);
  if (enText.split('\n').length !== huText.split('\n').length) problems.push('line count differs from English (side-by-side review will drift)');
  if (huText.includes('\r')) problems.push('CRLF line endings');
  if (!huText.endsWith('\n')) problems.push('no trailing newline');

  console.log(`${name}: ${Object.keys(hu).length}/${Object.keys(en).length} keys, ${problems.length} problems`);
  problems.slice(0, 50).forEach((p) => console.log(`  ${p}`));
  failures += problems.length;
}

console.log(failures ? `${failures} problem(s)` : 'ALL CHECKS PASSED');
process.exit(failures ? 1 : 0);

import test from 'node:test';
import assert from 'node:assert/strict';
import {courses} from '../src/data/courses.js';
import {scenarioFor} from '../src/data/scenarios.js';

// Regression: earlier every correct option was the longest one (336/336), so learners could pass
// without understanding the lesson. Guessing strategies must not beat chance (1/3).
const stages = courses.flatMap(c => c.lessons.flatMap(l => scenarioFor(c.id, l).stages));
const share = pick => stages.filter(s => {
  const lens = s.choices.map(x => x.length);
  return lens[s.correct] === pick(...lens);
}).length / stages.length;

test('"pick the longest option" does not beat chance', () => {
  assert.ok(share(Math.max) < 0.34, `longest-is-correct ratio ${share(Math.max).toFixed(2)}`);
});

test('"pick the shortest option" does not beat chance', () => {
  assert.ok(share(Math.min) < 0.34, `shortest-is-correct ratio ${share(Math.min).toFixed(2)}`);
});

test('correct answer position is evenly spread', () => {
  const counts = [0, 0, 0];
  for (const s of stages) counts[s.correct]++;
  for (const n of counts) assert.ok(Math.abs(n / stages.length - 1 / 3) < 0.05, `positions ${counts}`);
});

test('options within a question are distinct', () => {
  for (const s of stages) assert.equal(new Set(s.choices).size, 3, s.prompt);
});

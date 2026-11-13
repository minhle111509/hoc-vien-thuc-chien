import test from 'node:test';
import assert from 'node:assert/strict';
import {courses} from '../src/data/courses.js';
import {EXTRA, EXTRA_IDS} from '../src/data/courses-2026/index.js';
import {TOOL_UPDATES} from '../src/data/tool-updates.js';
import {deepLesson} from '../src/data/deep-lessons.js';
import {gameType, descriptions} from '../src/games/registry.js';
import {MISSIONS, missionFor} from '../src/games/missions.js';
import {BANK} from '../src/core/pilot.js';
import {rubricFor} from '../src/core/professional-rubric.js';
import {validateState, validatePilot} from '../src/core/store.js';

test('every 2026 course is a full 28-lesson courses with 4 stages', () => {
  assert.deepEqual(EXTRA_IDS, ['office', 'gemini', 'design', 'aibasics', 'mcp', 'cowork', 'automation', 'claudedesign', 'aicode', 'webdeploy', 'agentdev', 'localai']);
  for (const id of EXTRA_IDS) {
    const c = courses.find(x => x.id === id);
    assert.ok(c, id);
    assert.equal(c.lessons.length, 28);
    assert.equal(new Set(c.lessons.map(l => l.stage)).size, 4);
    assert.deepEqual(c.lessons.filter(l => l.checkpoint).map(l => l.id), [7, 14, 21, 28].map(n => `${id}-${n}`));
  }
});

test('every new course has its game, mission, quiz and rubric data', () => {
  for (const c of EXTRA) {
    assert.ok(c.framework.principle.length > 40 && c.framework.quality.length === 3, c.id);
    for (let n = 1; n <= 28; n++) assert.ok(descriptions[gameType(c.id, n)], `${c.id}-${n} game`);
    assert.equal(MISSIONS[c.id].stages.length, 3);
    // Correct answers must not always sit in the same position.
    assert.ok(new Set(MISSIONS[c.id].stages.map(s => s.correct)).size > 1, c.id);
    assert.equal(BANK[c.id].length, 4);
    assert.equal(rubricFor(c.id, `${c.id}-1`).criteria.length, 4);
    assert.equal(missionFor(c.id, courses.find(x => x.id === c.id).lessons[3]).stages.length, 3);
  }
});

test('progress and quiz data for new courses survive save/restore', () => {
  const s = validateState({selected: 'office', progress: {'office-3': {score: 90, completed: true, attempts: 1}, 'gemini-28': {score: 70, completed: false, attempts: 2}}});
  assert.equal(s.selected, 'office');
  assert.deepEqual(Object.keys(s.progress), ['office-3', 'gemini-28']);
  assert.ok(validatePilot({design: {consent: true, pre: {score: 50}}}).design);
});

test('current-feature notes point at real lessons and reach the lesson page', () => {
  const ids = new Set(courses.flatMap(c => c.lessons.map(l => l.id)));
  for (const [id, text] of Object.entries(TOOL_UPDATES)) {
    assert.ok(ids.has(id), id);
    assert.ok(text.length > 60, id);
    const [course, n] = id.split('-');
    assert.equal(deepLesson(course, Number(n) - 1).tools, text);
  }
});

test('non-AI courses never get the AI-Agent-only mini-games', () => {
  for (const c of EXTRA.filter(c => ['office', 'gemini', 'design', 'aibasics'].includes(c.id))) for (let n = 1; n <= 28; n++) assert.ok(!['agent', 'debug'].includes(gameType(c.id, n)), `${c.id}-${n}`);
});

test('MCP lessons teach the real config file of each app', () => {
  const text = id => { const c = EXTRA.find(x => x.id === 'mcp'); return c.rows.map(r => r[1]).join(' '); };
  const all = text();
  for (const needle of ['claude mcp add', '.mcp.json', '.vscode/mcp.json', '.cursor/mcp.json', 'claude_desktop_config.json', '"servers"', '"mcpServers"'])
    assert.ok(all.includes(needle), needle);
});

test('lesson titles are unique across the whole academy', () => {
  const titles = courses.flatMap(c => c.lessons.map(l => l.title));
  assert.equal(new Set(titles).size, titles.length);
});

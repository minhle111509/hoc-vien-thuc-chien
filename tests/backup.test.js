import test from 'node:test';
import assert from 'node:assert/strict';
import {buildBackup, parseBackup, validateReviews, validatePilot, defaultState} from '../src/core/store.js';
import {courses} from '../src/data/courses.js';

const review = {lessonId: 'photo-1', score: 70, ratings: [2, 2, 3, 2], notes: 'Ảnh có đèn chính rõ, cần thêm hắt sáng phụ.', reviewerType: 'human', reviewedAt: '2026-11-13T10:00:00.000Z', status: 'x'};
const pilot = {photo: {course: 'photo', consent: true, pre: {score: 50, date: '2026-11-01'}, post: {score: 75, date: '2026-11-13'}, interest: 4, minutes: 90, completed: false}};

test('backup round-trips progress, reviewer forms and quiz records', () => {
  const state = {...defaultState(), progress: {'photo-1': {score: 80, completed: true, attempts: 2}}};
  const restored = parseBackup(JSON.parse(JSON.stringify(buildBackup(state, {'photo-1': review}, pilot))));
  assert.equal(restored.state.progress['photo-1'].completed, true);
  assert.deepEqual(restored.reviews['photo-1'].ratings, [2, 2, 3, 2]);
  assert.equal(restored.pilot.photo.post.score, 75);
});

test('old backups without reviews or quiz data still restore', () => {
  const restored = parseBackup(defaultState());
  assert.deepEqual(restored.reviews, {});
  assert.deepEqual(restored.pilot, {});
});

test('review scores are recomputed from ratings, never trusted from the file', () => {
  const out = validateReviews({'photo-1': {...review, score: 100}, 'evil-1': review, 'photo-2': {ratings: [9, 0, 0, 0]}});
  assert.equal(out['photo-1'].score, 85);
  assert.equal(out['photo-1'].status, 'Đạt theo người đánh giá');
  assert.deepEqual(Object.keys(out), ['photo-1']);
});

test('quiz records need consent and are clamped', () => {
  const out = validatePilot({photo: {...pilot.photo, post: {score: 900}, minutes: -5}, claude: {pre: {score: 40}}, x: pilot.photo});
  assert.equal(out.photo.post.score, 100);
  assert.equal(out.photo.minutes, 0);
  assert.equal(out.claude, undefined);
  assert.deepEqual(Object.keys(out), ['photo']);
});

test('course descriptions match the real number of lessons', () => {
  for (const c of courses) assert.ok(c.description.startsWith(`${c.lessons.length} nhiệm vụ`), c.description);
});

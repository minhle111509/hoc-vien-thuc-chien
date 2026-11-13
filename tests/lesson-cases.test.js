import test from 'node:test';
import assert from 'node:assert/strict';
import {courses} from '../src/data/courses.js';
import {LESSON_CASES} from '../src/data/lesson-cases.js';
import {deepLesson} from '../src/data/deep-lessons.js';

const FIELDS = ['concept', 'situation', 'task', 'misconception'];
const lessons = courses.flatMap(c => c.lessons.map((l, i) => ({course: c.id, index: i, lesson: l})));

test('every lesson has its own hand-written case and no extra ids exist', () => {
  const ids = new Set(lessons.map(x => x.lesson.id));
  for (const id of ids) assert.ok(LESSON_CASES[id], `missing case for ${id}`);
  for (const id of Object.keys(LESSON_CASES)) assert.ok(ids.has(id), `case for unknown lesson ${id}`);
});

test('case fields are substantive and never reused between lessons', () => {
  for (const field of FIELDS) {
    const values = Object.values(LESSON_CASES).map(c => c[field]);
    for (const v of values) assert.ok(typeof v === 'string' && v.trim().length >= 30, `${field} too short: ${v}`);
    assert.equal(new Set(values).size, values.length, `duplicate ${field}`);
  }
});

test('lesson titles are unique within each course', () => {
  for (const c of courses) {
    const titles = c.lessons.map(l => l.title);
    assert.equal(new Set(titles).size, titles.length, `duplicate title in ${c.id}`);
  }
});

test('deep lesson shows the lesson-specific case', () => {
  for (const {course, index, lesson} of lessons) {
    const d = deepLesson(course, index);
    const own = LESSON_CASES[lesson.id];
    assert.equal(d.concept, own.concept);
    assert.ok(d.scenario.includes(own.situation) && d.scenario.includes(own.task));
    assert.ok(d.steps[1].includes(own.task));
    assert.equal(d.misconception, own.misconception);
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {OFFICE_TEACH} from '../src/data/courses-2026/office-teach.js';
import {normalizeFormula, checkExercise, gradeLessonQuiz, shuffledOrder} from '../src/core/teach.js';
import {deepLesson} from '../src/data/deep-lessons.js';
import {courses} from '../src/data/courses.js';

test('every Office lesson has steps, an example, an exercise and three own questions', () => {
  const office = courses.find(c => c.id === 'office');
  const allQuestions = [];
  for (let n = 1; n <= 28; n++) {
    const t = OFFICE_TEACH[n];
    assert.ok(t, `office-${n}`);
    assert.ok(t.steps.length >= 4 && t.steps.every(s => s.length > 15), `steps ${n}`);
    assert.ok(t.example.title && t.example.body.length > 30, `example ${n}`);
    assert.ok(['formula', 'choice', 'order'].includes(t.exercise.type), `exercise ${n}`);
    assert.ok(t.exercise.explain.length > 15, `explain ${n}`);
    assert.equal(t.quiz.length, 3, `quiz ${n}`);
    for (const q of t.quiz) {
      assert.equal(q.options.length, 3);
      assert.ok(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < 3);
      assert.ok(q.why.length > 10);
      allQuestions.push(q.q);
    }
    assert.equal(office.lessons[n - 1].duration, t.minutes);
    assert.equal(deepLesson('office', n - 1).teach, t);
  }
  assert.equal(new Set(allQuestions).size, allQuestions.length, 'questions are not reused');
});

test('correct answers are spread over positions so guessing one letter fails', () => {
  const pos = [0, 0, 0];
  for (const t of Object.values(OFFICE_TEACH)) for (const q of t.quiz) pos[q.answer]++;
  for (const p of pos) assert.ok(p >= 5, `positions ${pos}`);
});

test('formula checker accepts ; , spaces and case, rejects wrong formulas', () => {
  const ex = OFFICE_TEACH[10].exercise;
  assert.equal(checkExercise(ex, '=COUNTIF(C2:C31,">=8")').correct, true);
  assert.equal(checkExercise(ex, ' =countif( C2:C31 ; ">=8" ) ').correct, true);
  assert.equal(checkExercise(ex, 'COUNTIF(C2:C31,“>=8”)').correct, true);
  assert.equal(checkExercise(ex, '=COUNTIF(C2:C31,">8")').correct, false);
  assert.equal(checkExercise(ex, '').empty, true);
  assert.equal(normalizeFormula('=b3*$b$1'), '=B3*$B$1');
  for (const t of Object.values(OFFICE_TEACH)) if (t.exercise.type === 'formula') for (const a of t.exercise.answers) assert.equal(checkExercise(t.exercise, a).correct, true);
});

test('choice and order exercises', () => {
  for (const t of Object.values(OFFICE_TEACH)) {
    const ex = t.exercise;
    if (ex.type === 'choice') { assert.equal(checkExercise(ex, String(ex.answer)).correct, true); assert.equal(checkExercise(ex, String((ex.answer + 1) % ex.options.length)).correct, false); }
    if (ex.type === 'order') {
      assert.equal(checkExercise(ex, ex.items.slice()).correct, true);
      assert.equal(checkExercise(ex, ex.items.slice().reverse()).correct, false);
      const shown = shuffledOrder(ex.items, 3);
      assert.notDeepEqual(shown, ex.items, 'never starts solved');
      assert.deepEqual(shown.slice().sort(), ex.items.slice().sort());
    }
  }
});

test('lesson quiz needs all answers and all correct', () => {
  const quiz = OFFICE_TEACH[9].quiz;
  assert.equal(gradeLessonQuiz(quiz, quiz.map(q => q.answer)).passed, true);
  assert.equal(gradeLessonQuiz(quiz, [quiz[0].answer, -1, -1]).complete, false);
  assert.equal(gradeLessonQuiz(quiz, quiz.map(q => (q.answer + 1) % 3)).passed, false);
});

test('objectives keep acronyms (no "xLOOKUP" / "aI")', () => {
  for (const c of courses) for (const l of c.lessons) assert.ok(!/được: [a-zà-ỹ][A-Z]/.test(l.objective), l.objective);
});

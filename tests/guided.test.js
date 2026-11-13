import test from 'node:test';
import assert from 'node:assert/strict';
import {evalFormula, shiftFormula, referencedCells, isErr} from '../src/core/formula.js';
import {OFFICE_GUIDED} from '../src/data/courses-2026/office-guided.js';

const grid = {A1: 'Giá', B1: 85000, B2: 'Số áo', B3: 2, B4: 3, C2: 8.5, C3: 7, C4: 8, B5: 'Tổ 1', B6: 'Tổ 2', D5: 50, D6: 40};
const val = f => evalFormula(f, grid).value;

test('arithmetic, references and errors behave like Excel', () => {
  assert.equal(val('=B3*$B$1'), 170000);
  assert.equal(val('=(B3+B4)*2'), 10);
  assert.ok(isErr(val('=B3*B2')), 'number times text is #VALUE!');
  assert.equal(val('=B3/0').error, '#DIV/0!');
  assert.equal(val('=NOPE(1)').error, '#NAME?');
  assert.equal(evalFormula('B3*2', grid).message, 'Công thức phải bắt đầu bằng dấu =');
  assert.ok(evalFormula('=SUM(B3:B4', grid).message);
});

test('IF, COUNTIF, SUMIF accept "," and ";" and are case-insensitive for text', () => {
  assert.equal(val('=IF(C2>=8,"Đạt","Chưa đạt")'), 'Đạt');
  assert.equal(val('=if(C3>=8;"Đạt";"Chưa đạt")'), 'Chưa đạt');
  assert.equal(val('=COUNTIF(C2:C4,">=8")'), 2);
  assert.equal(val('=COUNTIF(C2:C4,">8")'), 1);
  assert.equal(val('=SUMIF(B5:B6,"tổ 1",D5:D6)'), 50);
  assert.equal(val('=SUM(C2:C4)'), 23.5);
});

test('fill-down shifts only unlocked rows and skips text inside quotes', () => {
  assert.equal(shiftFormula('=B3*$B$1', 2), '=B5*$B$1');
  assert.equal(shiftFormula('=B3*B1', 1), '=B4*B2');
  assert.equal(shiftFormula('=B3*B$1', 1), '=B4*B$1');
  assert.equal(shiftFormula('=IF(C2>=8,"C2","x")', 1), '=IF(C3>=8,"C2","x")');
  assert.deepEqual([...referencedCells('=SUM(C2:C4)+B1')], ['C2', 'C3', 'C4', 'B1']);
});

test('each guided lesson has a plain outcome, comparison, walkthrough and a solvable lab', () => {
  for (const [n, g] of Object.entries(OFFICE_GUIDED)) {
    assert.ok(g.outcome.length > 30 && g.analogy.length > 30, `lesson ${n}`);
    assert.ok(g.walkthrough.length >= 4, `lesson ${n} walkthrough`);
    for (const s of g.walkthrough) assert.ok(s.title && [].concat(s.text).every(t => t.length > 20), `lesson ${n}: ${s.title}`);
    assert.ok(g.lab && g.lab.intro.length > 20);
    if (g.lab.type === 'styles') assert.ok(g.lab.paragraphs.some(p => p.want === 'Heading 1') && g.lab.paragraphs.some(p => p.want === 'Heading 2'));
  }
});

test('the sheet tasks accept the taught answer and reject the classic mistakes', () => {
  const solve = (lab, task, formula) => {
    const cells = {...lab.sheet.cells};
    const start = Number(task.cell.slice(1)), col = task.cell[0];
    const last = task.fillTo || start;
    for (let r = start; r <= last; r++) cells[col + r] = evalFormula(shiftFormula(formula, r - start), cells).value;
    for (let r = start; r <= last; r++) {
      const want = typeof task.expect === 'function' ? task.expect(cells, r) : task.expect;
      if (cells[col + r] !== want) return false;
    }
    return true;
  };
  const shirts = OFFICE_GUIDED[9].lab, [t9] = shirts.sheet.tasks;
  assert.equal(solve(shirts, t9, '=B3*$B$1'), true);
  assert.equal(solve(shirts, t9, '=B3*B1'), false, 'missing $ breaks lower rows');
  const grades = OFFICE_GUIDED[10].lab, [ifTask, countTask, sumTask] = grades.sheet.tasks;
  assert.equal(solve(grades, ifTask, '=IF(C2>=8,"Đạt","Chưa đạt")'), true);
  assert.equal(solve(grades, ifTask, '=IF(C2>8,"Đạt","Chưa đạt")'), false, 'a score of exactly 8 must pass');
  assert.equal(solve(grades, countTask, '=COUNTIF(C2:C9,">=8")'), true);
  assert.equal(solve(grades, sumTask, '=SUMIF(B2:B9,"Tổ 1",D2:D9)'), true);
});

test('Cowork trial lessons: guided content, valid labs and balanced quizzes', async () => {
  const {COWORK_TEACH} = await import('../src/data/courses-2026/cowork-teach.js');
  const positions = [0, 0, 0];
  for (const n of [1, 3, 4]) {
    const t = COWORK_TEACH[n];
    assert.ok(t.guided.outcome.length > 30 && t.guided.analogy.length > 30, `cowork-${n}`);
    assert.ok(t.guided.walkthrough.length >= 5);
    assert.equal(t.quiz.length, 3);
    for (const q of t.quiz) { assert.equal(q.options.length, 3); positions[q.answer]++; }
    const lab = t.guided.lab;
    if (lab.type === 'sort') for (const it of lab.items) assert.ok(lab.groups.includes(it.group) && it.why.length > 10);
    if (lab.type === 'plan') {
      assert.ok(lab.steps.some(s => s.ok.includes('keep')) && lab.steps.some(s => s.ok.includes('remove')));
      for (const s of lab.steps) assert.ok(s.ok.every(v => ['keep', 'ask', 'remove'].includes(v)) && s.why.length > 10);
    }
    if (lab.type === 'brief') {
      // The sample brief must itself pass every check, otherwise learners copying its pattern would fail.
      for (const f of lab.fields) {
        const v = lab.example[f.key].toLowerCase();
        assert.ok(v.length >= (f.minLen || 8) && (!f.any || f.any.some(k => v.includes(k))), `example ${f.key}`);
      }
      assert.ok(lab.plan(lab.example).length >= 4);
    }
  }
  assert.ok(positions.every(p => p >= 2), `answer positions ${positions}`);
});

test('the whole Cowork course uses the guided format with working labs', async () => {
  const {EXTRA_TEACH} = await import('../src/data/courses-2026/index.js');
  const {courses} = await import('../src/data/courses.js');
  const cowork = courses.find(c => c.id === 'cowork');
  const T = EXTRA_TEACH.cowork;
  const questions = new Set();
  for (let n = 1; n <= 28; n++) {
    const t = T[n];
    assert.ok(t?.guided, `cowork-${n} missing`);
    assert.equal(cowork.lessons[n - 1].duration, t.minutes);
    assert.ok(t.steps.length >= 4, `cowork-${n} steps`);
    const g = t.guided;
    assert.ok(g.outcome.length > 30 && g.analogy.length > 30, `cowork-${n} intro`);
    assert.ok(g.walkthrough.length >= 3, `cowork-${n} walkthrough`);
    for (const s of g.walkthrough) assert.ok(s.title && [].concat(s.text).every(x => x.length > 20), `cowork-${n}: ${s.title}`);
    assert.ok(['sort', 'brief', 'plan'].includes(g.lab.type), `cowork-${n} lab`);
    if (g.lab.type === 'sort') {
      assert.ok(g.lab.items.length >= 5);
      for (const it of g.lab.items) assert.ok(g.lab.groups.includes(it.group), `cowork-${n}: ${it.text}`);
      assert.ok(new Set(g.lab.items.map(i => i.group)).size >= 2, `cowork-${n} uses one group only`);
    }
    if (g.lab.type === 'plan') assert.ok(g.lab.steps.some(s => s.ok.includes('keep')) && g.lab.steps.some(s => !s.ok.includes('keep')), `cowork-${n} plan`);
    if (g.lab.type === 'brief') for (const f of g.lab.fields) {
      const v = g.lab.example[f.key].toLowerCase();
      assert.ok(v.length >= (f.minLen || 8) && (!f.any || f.any.some(k => v.includes(k))), `cowork-${n} example ${f.key}`);
    }
    assert.equal(t.quiz.length, 3);
    for (const qq of t.quiz) { assert.ok(qq.answer >= 0 && qq.answer < qq.options.length); questions.add(qq.q); }
  }
  assert.equal(questions.size, 84, 'no question reused across lessons');
});

test('the whole Office course uses the guided format; every sheet task is solvable with its model answer', async () => {
  const {EXTRA_TEACH} = await import('../src/data/courses-2026/index.js');
  const T = EXTRA_TEACH.office;
  const labTypes = new Set();
  for (let n = 1; n <= 28; n++) {
    const g = T[n].guided;
    assert.ok(g, `office-${n} missing guided`);
    assert.ok(g.outcome.length > 30 && g.analogy.length > 30, `office-${n} intro`);
    assert.ok(g.walkthrough.length >= 3, `office-${n} walkthrough`);
    for (const s of g.walkthrough) assert.ok(s.title && [].concat(s.text).every(x => x.length > 20), `office-${n}: ${s.title}`);
    labTypes.add(g.lab.type);
    if (g.lab.type === 'order') assert.equal(new Set(g.lab.items).size, g.lab.items.length, `office-${n} order items unique`);
    if (g.lab.type === 'sort') for (const it of g.lab.items) assert.ok(g.lab.groups.includes(it.group), `office-${n}: ${it.text}`);
    if (g.lab.type === 'brief') for (const f of g.lab.fields) {
      const v = g.lab.example[f.key].toLowerCase();
      assert.ok(v.length >= (f.minLen || 8) && (!f.any || f.any.some(k => v.includes(k))), `office-${n} example ${f.key}`);
    }
    if (g.lab.type === 'sheet') for (const task of g.lab.sheet.tasks) {
      const formula = task.answer;
      assert.ok(formula, `office-${n} ${task.cell} needs a model answer`);
      const cells = {...g.lab.sheet.cells};
      const col = task.cell.replace(/\d+/, ''), start = Number(task.cell.replace(/\D+/, ''));
      const last = task.fillTo || start;
      for (let r = start; r <= last; r++) cells[col + r] = evalFormula(shiftFormula(formula, r - start), cells).value;
      for (let r = start; r <= last; r++) {
        const want = typeof task.expect === 'function' ? task.expect(cells, r) : task.expect;
        const got = cells[col + r];
        assert.ok(typeof want === 'number' ? Math.abs(got - want) < 1e-9 : got === want, `office-${n} ${task.cell}: ${formula} gives ${JSON.stringify(got)}, want ${JSON.stringify(want)}`);
      }
    }
  }
  for (const t of ['sheet', 'styles', 'sort', 'order', 'plan', 'brief']) assert.ok(labTypes.has(t), `lab type ${t} used`);
});

test('XLOOKUP and CORREL behave like Excel for the lessons', () => {
  const g = {A2: 'S01', A3: 'S02', B2: 'Dế Mèn', B3: 'Tắt đèn', D2: 's02', D3: 'S02 '};
  assert.equal(evalFormula('=XLOOKUP(D2,A2:A3,B2:B3,"Chưa có")', g).value, 'Tắt đèn', 'case-insensitive');
  assert.equal(evalFormula('=XLOOKUP(D3,A2:A3,B2:B3,"Chưa có")', g).value, 'Chưa có', 'a trailing space does not match');
  assert.equal(evalFormula('=XLOOKUP(TRIM(D3),A2:A3,B2:B3,"Chưa có")', g).value, 'Tắt đèn', 'TRIM fixes it');
  assert.equal(evalFormula('=XLOOKUP("S09",A2:A3,B2:B3)', g).value.error, '#N/A');
  const c = {A1: 1, A2: 2, A3: 3, B1: 2, B2: 4, B3: 6};
  assert.ok(Math.abs(evalFormula('=CORREL(A1:A3,B1:B3)', c).value - 1) < 1e-12);
});

test('Claude basics: all 28 lessons guided, labs valid, model answers solve sheet tasks', async () => {
  const {deepLesson} = await import('../src/data/deep-lessons.js');
  const questions = new Set();
  for (let i = 0; i < 28; i++) {
    const t = deepLesson('claude', i).teach;
    assert.ok(t?.guided, `claude-${i + 1} missing guided`);
    const g = t.guided;
    assert.ok(g.outcome.length > 30 && g.analogy.length > 30 && g.walkthrough.length >= 3, `claude-${i + 1}`);
    assert.equal(t.quiz.length, 3);
    for (const qq of t.quiz) questions.add(qq.q);
    if (g.lab.type === 'sort') for (const it of g.lab.items) assert.ok(g.lab.groups.includes(it.group), `claude-${i + 1}: ${it.text}`);
    if (g.lab.type === 'brief') for (const f of g.lab.fields) {
      const v = g.lab.example[f.key].toLowerCase();
      assert.ok(v.length >= (f.minLen || 8) && (!f.any || f.any.some(k => v.includes(k))), `claude-${i + 1} example ${f.key}`);
    }
    if (g.lab.type === 'sheet') for (const task of g.lab.sheet.tasks) {
      const got = evalFormula(task.answer, g.lab.sheet.cells).value;
      assert.ok(Math.abs(got - task.expect) < 1e-9, `claude-${i + 1} ${task.cell}`);
    }
  }
  assert.equal(questions.size, 84);
});

test('the Claude learning path groups four courses into one subject without changing lesson ids', async () => {
  const {PATHS, pathOf, homeItems, nextPartStart} = await import('../src/data/paths.js');
  const {courses} = await import('../src/data/courses.js');
  const path = PATHS.find(p => p.id === 'claude-path');
  assert.deepEqual(path.parts.map(p => p.course), ['claude', 'cowork', 'claudedesign', 'aicode']);
  for (const part of path.parts) assert.ok(courses.find(c => c.id === part.course), part.course);
  assert.equal(pathOf('cowork').id, 'claude-path');
  assert.equal(pathOf('office'), null);
  const items = homeItems();
  assert.equal(items.filter(it => it.type === 'path').length, 1);
  assert.equal(items.length, courses.length - path.parts.length + 1);
  assert.equal(nextPartStart('claude').course.id, 'cowork');
  assert.equal(nextPartStart('aicode'), null);
  assert.equal(courses.find(c => c.id === 'claude').lessons[0].id, 'claude-1', 'ids unchanged, saved progress still matches');
});

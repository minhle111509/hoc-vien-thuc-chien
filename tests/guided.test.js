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

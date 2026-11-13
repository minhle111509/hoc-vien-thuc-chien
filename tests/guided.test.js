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

// Pure checkers for lesson-specific exercises and quizzes (pilot: Office course).

// Normalise a typed formula so harmless differences do not matter: spaces, letter case, curly quotes,
// and ";" (Vietnamese regional settings) versus ",".
export function normalizeFormula(text) {
  return String(text ?? '')
    .trim()
    .replace(/[“”„]/g, '"')
    .replace(/\s+/g, '')
    .replace(/;/g, ',')
    .toUpperCase()
    .replace(/^(?!=)/, '=');
}

export function checkExercise(exercise, answer) {
  if (!exercise) throw Error('Bài luyện không tồn tại');
  if (exercise.type === 'formula') {
    const typed = normalizeFormula(answer);
    if (typed === '=') return {correct: false, empty: true};
    return {correct: exercise.answers.some(a => normalizeFormula(a) === typed)};
  }
  if (exercise.type === 'choice') {
    if (answer === null || answer === undefined || answer === '') return {correct: false, empty: true};
    return {correct: Number(answer) === exercise.answer};
  }
  if (exercise.type === 'order') {
    if (!Array.isArray(answer) || answer.length !== exercise.items.length) return {correct: false, empty: !answer?.length};
    return {correct: answer.every((item, i) => item === exercise.items[i])};
  }
  throw Error('Loại bài luyện không hợp lệ');
}

// Every question must be answered; passing needs all answers correct (learners may retry).
export function gradeLessonQuiz(quiz, answers) {
  if (!Array.isArray(quiz) || !Array.isArray(answers)) throw Error('Bài kiểm tra không hợp lệ');
  const results = quiz.map((q, i) => ({answered: Number.isInteger(answers[i]) && answers[i] >= 0, correct: answers[i] === q.answer, why: q.why}));
  const correct = results.filter(r => r.correct).length;
  return {results, correct, total: quiz.length, complete: results.every(r => r.answered), passed: correct === quiz.length};
}

// Deterministic shuffle so an "order" exercise never starts already solved.
export function shuffledOrder(items, seed = 1) {
  const out = items.map((item, i) => ({item, k: ((i + 1) * 9301 + seed * 49297) % 233280}));
  out.sort((a, b) => a.k - b.k);
  const result = out.map(x => x.item);
  if (result.every((x, i) => x === items[i])) result.push(result.shift());
  return result;
}

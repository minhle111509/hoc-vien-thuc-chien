// Authors tend to put the right answer in the same position. Rotate each question's options
// deterministically so the correct answer lands in every position about equally often.
// The explanation (why) stays attached to the question, so feedback is unchanged.
function rotate(item, target, key = 'answer') {
  const n = item.options.length;
  const shift = (target - item[key] + n) % n;
  item.options = item.options.map((_, i) => item.options[(i - shift + n) % n]);
  item[key] = target;
}

export function balanceQuizzes(teachByLesson) {
  for (const [n, lesson] of Object.entries(teachByLesson)) {
    (lesson.quiz || []).forEach((q, k) => rotate(q, (Number(n) + k) % q.options.length));
  }
  return teachByLesson;
}

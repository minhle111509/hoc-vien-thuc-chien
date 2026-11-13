// Learning paths: several courses shown to learners as ONE subject, in a fixed order.
// Lesson ids and course ids stay unchanged, so saved progress, backups and tests keep working.
import {courses} from './courses.js';

export const PATHS = [
  {
    id: 'claude-path',
    name: '🟠 Claude – Học trọn bộ từ trò chuyện đến tác tử',
    description: 'Một lộ trình liền mạch: dùng Claude cơ bản → giao việc cho Claude Cowork → thiết kế với Claude Design → lập trình cùng Claude Code.',
    parts: [
      {course: 'claude', title: 'Phần 1. Claude cơ bản: trò chuyện, viết, làm dự án'},
      {course: 'cowork', title: 'Phần 2. Claude Cowork: giao việc cho tác tử'},
      {course: 'claudedesign', title: 'Phần 3. Claude Design: thiết kế, nguyên mẫu, slide'},
      {course: 'aicode', title: 'Phần 4. Claude Code: lập trình cùng AI'},
    ],
  },
];

export const pathOf = courseId => PATHS.find(p => p.parts.some(part => part.course === courseId)) || null;
export const partOf = courseId => pathOf(courseId)?.parts.find(part => part.course === courseId) || null;
export const pathCourses = path => path.parts.map(part => courses.find(c => c.id === part.course)).filter(Boolean);

// The lesson that follows the last lesson of a part: the first lesson of the next part.
export function nextPartStart(courseId) {
  const path = pathOf(courseId);
  if (!path) return null;
  const k = path.parts.findIndex(part => part.course === courseId);
  const nextPart = path.parts[k + 1];
  const c = nextPart && courses.find(x => x.id === nextPart.course);
  return c ? {course: c, lesson: c.lessons[0], index: 0, part: nextPart} : null;
}

// Home page items in course order; a path appears once, where its first course would be.
export function homeItems() {
  const seen = new Set();
  const items = [];
  for (const c of courses) {
    const path = pathOf(c.id);
    if (!path) { items.push({type: 'course', course: c}); continue; }
    if (seen.has(path.id)) continue;
    seen.add(path.id);
    items.push({type: 'path', path});
  }
  return items;
}

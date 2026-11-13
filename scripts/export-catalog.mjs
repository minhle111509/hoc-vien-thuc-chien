// Prints the whole curriculum as JSON for scripts/build-pdf.py.
// Usage: node scripts/export-catalog.mjs > catalog.json
import {courses} from '../src/data/courses.js';
import {LESSON_CASES} from '../src/data/lesson-cases.js';
import {deepLesson} from '../src/data/deep-lessons.js';
import {TOOLS_CHECKED} from '../src/data/tool-updates.js';

const catalog = {
  toolsChecked: TOOLS_CHECKED,
  courses: courses.map(c => {
    const d = deepLesson(c.id, 0);
    return {
      id: c.id,
      name: c.name,
      materials: d.materials,
      quality: d.assessment,
      safety: d.safety,
      lessons: c.lessons.map(l => ({
        id: l.id,
        title: l.title,
        stage: l.stage,
        checkpoint: l.checkpoint,
        concept: LESSON_CASES[l.id].concept,
        task: LESSON_CASES[l.id].task,
        tools: LESSON_CASES[l.id].tools || '',
      })),
    };
  }),
};
process.stdout.write(JSON.stringify(catalog));

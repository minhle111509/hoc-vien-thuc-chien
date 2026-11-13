// Courses added in November 2026. Each module holds its lessons plus the per-course data
// (framework, games, mission, scenario, quiz, rubric) that the older courses keep in separate files.
import {OFFICE} from './office.js';
import {GEMINI} from './gemini.js';
import {DESIGN} from './design.js';
import {AIBASICS} from './aibasics.js';
import {MCP} from './mcp.js';
import {COWORK} from './cowork.js';
import {AICODE} from './aicode.js';
import {AGENTDEV} from './agentdev.js';
import {AUTOMATION} from './automation.js';
import {LOCALAI} from './localai.js';

// AI track order: foundations → connections (MCP) → agents at work (Cowork) → coding agents → building agents.
export const EXTRA = [OFFICE, GEMINI, DESIGN, AIBASICS, MCP, COWORK, AUTOMATION, AICODE, AGENTDEV, LOCALAI];
export const EXTRA_IDS = EXTRA.map(c => c.id);
const byId = key => Object.fromEntries(EXTRA.map(c => [c.id, c[key]]));

const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
// Same lesson shape as courses.js so every existing screen and test keeps working.
function lessonObject(course, [title, , situation, task], i) {
  const n = i + 1;
  return {
    id: `${course.id}-${n}`,
    title,
    stage: course.stages[Math.floor(i / 7)],
    description: situation,
    prompt: task,
    objective: `Sau bài này, học viên giải thích và áp dụng được: ${lower(title)}.`,
    warmup: `Tình huống: ${situation} Em sẽ hỏi gì trước khi làm?`,
    practice: task,
    evidence: `Một minh chứng cụ thể về “${title}”: tệp sản phẩm, ảnh chụp màn hình hoặc bản giải thích có tiêu chí.`,
    verification: 'Đối chiếu với mục tiêu và tiêu chí, tìm ít nhất một lỗi hoặc giới hạn và đề xuất sửa.',
    transfer: `Nêu một tình huống mới ở trường hoặc ở nhà mà em có thể vận dụng “${lower(title)}”.`,
    duration: '15–25 phút',
    checkpoint: n % 7 === 0,
  };
}

export const EXTRA_COURSES = EXTRA.map(c => ({
  id: c.id,
  name: c.name,
  description: `${c.rows.length} nhiệm vụ · 3 chặng · trò chơi tình huống · thực hành có kiểm chứng · học ngoại tuyến.`,
  lessons: c.rows.map((row, i) => lessonObject(c, row, i)),
}));

export const EXTRA_CASES = Object.fromEntries(EXTRA.flatMap(c => c.rows.map(([, concept, situation, task, misconception], i) =>
  [`${c.id}-${i + 1}`, {concept, situation, task, misconception}])));

export const EXTRA_FRAMEWORKS = byId('framework');
export const EXTRA_GAMES = byId('games');
export const EXTRA_MISSIONS = byId('mission');
export const EXTRA_SCENARIOS = byId('scenario');
export const EXTRA_QUIZ = byId('quiz');
export const EXTRA_RUBRIC = byId('rubric');

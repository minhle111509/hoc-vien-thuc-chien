import test from 'node:test';import assert from 'node:assert/strict';import {courses} from '../src/data/courses.js';
test('16 khóa, mỗi khóa 28 bài có đủ 6 bước sư phạm',()=>{assert.equal(courses.length,16);for(const c of courses){assert.equal(c.lessons.length,28);for(const l of c.lessons){for(const k of ['objective','warmup','practice','evidence','verification','transfer'])assert.ok(l[k]?.length>20,`${l.id}: ${k}`)}}});
test('448 mã bài duy nhất',()=>{const ids=courses.flatMap(c=>c.lessons.map(l=>l.id));assert.equal(new Set(ids).size,448)});

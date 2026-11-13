import test from 'node:test';import assert from 'node:assert/strict';import {evaluate} from '../server/ai.js';
test('không có khóa API thì không tạo điểm AI giả',async()=>{if(process.env.OPENAI_API_KEY)return;const result=await evaluate({type:'grade',lesson:'a',artifact:'a'.repeat(30)});assert.equal(result.mode,'unavailable');assert.equal(result.score,undefined)});
test('không cho phép loại yêu cầu không hợp lệ',async()=>{await assert.rejects(evaluate({type:'unknown',artifact:'x'.repeat(30)}))});

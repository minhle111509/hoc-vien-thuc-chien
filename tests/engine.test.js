import test from 'node:test';import assert from 'node:assert/strict';
import {rubric,promptAudit,inspectClaim,inspectAgentFlow,photoScore,nextDifficulty} from '../src/core/engine.js';
import {courses} from '../src/data/courses.js';import {gameType} from '../src/games/registry.js';import {validateState,defaultState} from '../src/core/store.js';
test('448 lessons with unique ids',()=>{assert.equal(courses.length,16);assert.equal(courses.reduce((a,c)=>a+c.lessons.length,0),448);assert.equal(new Set(courses.flatMap(c=>c.lessons.map(l=>l.id))).size,448)});
test('game registry supports all courses',()=>{for(const c of courses)for(let i=1;i<=21;i++)assert.ok(['prompt','agent','detective','composition','lighting','exposure','color','sequence','compare','debug'].includes(gameType(c.id,i)))});
test('rubric is transparent',()=>{assert.equal(rubric({objective:true,reason:true,verified:true,artifact:true}).score,100);assert.equal(rubric({objective:true}).passed,false)});
test('prompt scoring recognizes parts',()=>{assert.equal(promptAudit('Hãy lập kế hoạch cho học sinh, trình bày dạng bảng và kiểm chứng nguồn.').score,100);assert.ok(promptAudit('xin chào').score<100)});
test('fact checking rejects unverified',()=>{assert.equal(inspectClaim('verify').score,100);assert.ok(inspectClaim('trust').score<100)});
test('agent requires human review',()=>{assert.equal(inspectAgentFlow(['input','validate','plan','review','output']).passed,true);assert.equal(inspectAgentFlow(['input','validate','plan','output']).passed,false)});
test('photo score bounded',()=>{assert.equal(photoScore(.66,.4),100);assert.ok(photoScore(.05,.05)>=0)});
test('adaptive levels',()=>{assert.equal(nextDifficulty([95,90]),'Thử thách');assert.equal(nextDifficulty([20,30]),'Luyện tập')});
test('backup validates hostile shapes',()=>{assert.deepEqual(validateState({progress:{'photo-1':{score:999,completed:true},'__proto__':{completed:true}},portfolio:[{text:'a'}]}).progress['photo-1'].score,100);assert.throws(()=>validateState([]));assert.deepEqual(defaultState().portfolio,[])});

test('all 10 game types are reachable',()=>{const seen=new Set();for(const c of courses)for(let i=1;i<=21;i++)seen.add(gameType(c.id,i));assert.equal(seen.size,10);});

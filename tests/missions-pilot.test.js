import test from 'node:test';import assert from 'node:assert/strict';
import {MISSIONS,missionFor,assessMission} from '../src/games/missions.js';
import {BANK,gradeQuiz,compareLearning,pilotSummary,csvReport} from '../src/core/pilot.js';
for(const id of ['photo','claude','chatgpt','agent','office','gemini','design','aibasics','mcp','cowork','aicode','agentdev','automation','localai','claudedesign','webdeploy']){
 test(`${id}: mission requires three correct decisions and meaningful evidence`,()=>{const m=missionFor(id,{title:'Thử nghiệm',id:`${id}-1`});assert.equal(m.stages.length,3);const choices=MISSIONS[id].stages.map(s=>s.correct);assert.equal(assessMission(id,choices,'x'.repeat(90),'y'.repeat(45)).passed,true);assert.equal(assessMission(id,choices,'ngắn','ngắn').passed,false);assert.equal(assessMission(id,choices.map(()=>-1),'x'.repeat(90),'y'.repeat(45)).passed,false)});
 test(`${id}: pre/post assessment`,()=>{const answers=BANK[id].map(q=>q.answer);assert.equal(gradeQuiz(id,answers).score,100);assert.equal(gradeQuiz(id,[-1,-1,-1,-1]).score,0)})
}
test('pilot anonymized aggregation and CSV escaping',()=>{const rows=[{course:'photo',consent:true,pre:{score:25},post:{score:75},completed:true,interest:4,minutes:40},{course:'agent',consent:false,pre:{score:0},post:{score:100}}];assert.deepEqual(compareLearning(rows[0].pre,rows[0].post),{pre:25,post:75,delta:50,improved:true});assert.equal(pilotSummary(rows).n,1);assert.equal(pilotSummary(rows).meanDelta,50);assert.equal(csvReport(rows).split('\n').length,2)})

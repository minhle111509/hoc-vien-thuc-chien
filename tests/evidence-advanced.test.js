import test from 'node:test';import assert from 'node:assert/strict';
import {validateEvidence,reconcileReviews,cohortMetrics} from '../src/core/evidence-audit.js';
import {missionSceneSpec} from '../src/games/phaser/pro-scenes.js';
test('four Phaser scene specifications',()=>{for(const k of ['photo','claude','chatgpt','agent'])assert.equal(missionSceneSpec(k).type,k)});
test('evidence completeness does not infer competence',()=>{const e=validateEvidence({goal:'Mục tiêu thực hành cụ thể đủ dài',artifact:'Sản phẩm mẫu có các bước và dữ liệu quan sát được, nhưng chưa chắc đúng chuyên môn.',iterations:['Đã thử phương án thứ nhất rồi điều chỉnh theo phản hồi'],tests:['Đối chiếu kết quả với tình huống dữ liệu giả định'],limitations:'Chưa thử trên người dùng thật'});assert.equal(e.ready,true);assert.equal('score' in e,false)});
test('missing evidence remains incomplete',()=>{assert.equal(validateEvidence({goal:'',artifact:'',iterations:[],tests:[],limitations:''}).ready,false)});
test('review disagreement requires second reviewer',()=>{const x=reconcileReviews({criteria:{a:25,b:25,c:25,d:25}},{ratings:[1,1,1,1]});assert.equal(x.status,'needs-second-review');assert.equal(x.certified,false)});
test('human review alone is not certification',()=>assert.equal(reconcileReviews(null,{ratings:[3,3,3,3]}).certified,false));
test('cohort metrics use only consented complete records',()=>{const r=cohortMetrics([{consent:true,pre:40,post:60,delayed:55},{consent:false,pre:0,post:100}]);assert.equal(r.eligible,1);assert.equal(r.meanChange,20)});

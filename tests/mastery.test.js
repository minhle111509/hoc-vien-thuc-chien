import test from 'node:test';import assert from 'node:assert/strict';
import {labKind,scoreCamera,inspectEditorial,verifyInvestigation,simulatePipeline} from '../src/games/mastery-labs.js';
test('four distinct mechanics mapped',()=>{for(const [id,kind] of [['photo-1','camera'],['claude-1','editor'],['chatgpt-1','investigator'],['agent-1','pipeline']])assert.equal(labKind(id),kind)});
test('camera assessment validates technical ranges',()=>{assert.equal(scoreCamera({aperture:8,shutter:125,iso:200},'product'),100);assert.equal(scoreCamera({aperture:'bad',shutter:0,iso:100}),0)});
test('editor requires provenance and uncertainty',()=>{const r=inspectEditorial('Nêu nguồn, chưa xác minh, giới hạn phạm vi','Nguồn tài liệu giả định dài hơn 15 ký tự');assert.ok(Object.values(r).every(Boolean))});
test('investigation flags unsourced claims',()=>{assert.equal(verifyInvestigation(['A','C']).correct,true);assert.equal(verifyInvestigation(['B']).correct,false)});
test('agent normal and invalid inputs have distinct traces',()=>{const nodes=['receive','validate','review','approve','deliver'];assert.equal(simulatePipeline(nodes).ok,true);assert.equal(simulatePipeline(nodes,'invalid').blocked,true);assert.equal(simulatePipeline(nodes.slice(1)).ok,false)});

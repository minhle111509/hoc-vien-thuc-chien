import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {allowRequest} from '../server/ai.js';
test('five offline 2D labs are present',async()=>{const s=await readFile('src/games/phaser/fallback.js','utf8');for(const k of ['lighting','composition','exposure','color','agent'])assert.ok(s.includes(k+':{'))});
test('API limiter allows six requests per minute',()=>{for(let i=0;i<6;i++)assert.equal(allowRequest('test-unique',1000),true);assert.equal(allowRequest('test-unique',1000),false);assert.equal(allowRequest('test-unique',62000),true)});

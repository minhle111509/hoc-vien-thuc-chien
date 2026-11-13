import test from 'node:test';import assert from 'node:assert/strict';
import {allowDaily} from '../server/ai.js';
test('daily quota blocks after configured allowance',()=>{const key='security-test-unique',now=Date.UTC(2026,10,8);for(let i=0;i<30;i++)assert.equal(allowDaily(key,now),true);assert.equal(allowDaily(key,now),false);assert.equal(allowDaily(key,now+86400000),true)});

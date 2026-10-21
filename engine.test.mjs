import test from 'node:test';import assert from 'node:assert/strict';import {parseItems,normalize,cosine,groupItems,exportMarkdown} from './engine.mjs';
test('parse trims and ignores empty lines but preserves duplicates',()=>assert.deepEqual(parseItems(' a \n\na').map(x=>x.text),['a','a']));
test('empty input rejected',()=>assert.throws(()=>parseItems(' ')));
test('item cap explicit',()=>assert.throws(()=>parseItems(Array(81).fill('a').join('\n')),/80/));
test('line cap explicit',()=>assert.throws(()=>parseItems('a'.repeat(601)),/600/));
test('total cap explicit',()=>assert.throws(()=>parseItems('a'.repeat(24001)),/24,000/));
test('normalization unit length',()=>assert.deepEqual(normalize([3,4]),[.6,.8]));
test('cosine normalized actual evidence',()=>assert.ok(Math.abs(cosine([2,0],[1,1])-Math.SQRT1_2)<1e-12));
test('invalid embeddings fail',()=>{for(const x of [[],[0,0],[NaN,1],[Infinity]])assert.throws(()=>normalize(x));});
test('dimensions fail',()=>assert.throws(()=>groupItems([{},{}],[[1,0],[1]],.6)));
test('counts fail',()=>assert.throws(()=>groupItems([{}],[],.6)));
test('bad thresholds fail',()=>{for(const t of [.2,.91,NaN])assert.throws(()=>groupItems([],[],t));});
test('complete link prevents chaining',()=>{const r=groupItems([1,2,3],[[1,0],[.8,.6],[.28,.96]],.75);assert.deepEqual(r.groups.map(g=>g.indices),[[0,1],[2]]);});
test('unrelated remain singletons',()=>assert.equal(groupItems([1,2],[[1,0],[0,1]],.6).groups.length,2));
test('threshold inclusive',()=>assert.equal(groupItems([1,2],[[1,0],[1,0]],.9).groups.length,1));
test('stable repeated results',()=>assert.deepEqual(groupItems([1,2,3],[[1,0],[1,0],[0,1]],.6),groupItems([1,2,3],[[1,0],[1,0],[0,1]],.6)));
test('markdown preserves notes, escapes HTML',()=>assert.match(exportMarkdown([{name:'Test',indices:[0]}],[{text:'<script>alert(1)</script>'}]),/&lt;script&gt;/));

test('markdown escapes active links and image syntax',()=>{const x=exportMarkdown([{name:'[x](javascript:alert)',indices:[0]}],[{text:'![x](https://tracker.example/)'}]);assert.ok(x.includes('\\!\\['));assert.ok(!x.includes('![x]('));});

const test = require('tape')
const replacer = require('../src/replacer')

test('Replacer module', (t) => {
  t.plan(7)
  t.equal(replacer('var code = true;'), 'var code = true;', 'The code generates match with out replaces')
  t.equal(replacer('var code = myBool;', {myBool: true}), 'var code = true;', 'The code generates match with a bool replace')
  t.equal(replacer('var code = myInt;', {myInt: 10}), 'var code = 10;', 'The code generates match with a integer replace')
  t.equal(replacer('var code = myString;', {myString: 'hi'}), 'var code = \'hi\';', 'The code generates match with a string replace')
  t.equal(replacer('var code = myFloat;', {myFloat: 10.1}), 'var code = 10.1;', 'The code generates match with a float replace')
  t.equal(replacer('var code = myArr;', {myArr: [1, 2]}), 'var code = [1,2];', 'The code generates match with a array replace')
  t.equal(replacer('var code = myObject;', {myObject: {sub: true}}), 'var code = {"sub":true};', 'The code generates match with a object replace')
})

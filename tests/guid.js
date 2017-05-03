const test = require('tape')
const guid = require('../src/guid')

const guidValidator = /[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/

test('GUID module', (t) => {
  t.plan(8)

  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
  t.ok(guidValidator.test(guid()), 'The string has a valid GUID format')
})

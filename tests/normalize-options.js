const test = require('tape')
const normalizeOptions = require('../src/normalize-options')
const guidValidator = /[a-z0-9]{8}-[a-z0-9]{4}-4[a-z0-9]{3}-[a-z0-9]{4}-[a-z0-9]{12}/

test('normalize-options module', (t) => {
  t.test('with empty origin', (t) => {
    t.plan(2)
    let opts = normalizeOptions()

    t.equal(opts.strategy, 'inspectedWindow', 'Use "inspectedWindow" as strategy default')
    t.ok(guidValidator.test(opts.key), 'Use a valid GUID as key default')
  })

  t.test('with empty object origin', (t) => {
    t.plan(2)
    let opts = normalizeOptions({})

    t.equal(opts.strategy, 'inspectedWindow', 'Use "inspectedWindow" as strategy default')
    t.ok(guidValidator.test(opts.key), 'Use a valid GUID as key default')
  })

  t.test('with custom props', (t) => {
    t.plan(2)
    let opts = normalizeOptions({strategy: 'someOther', key: 'otherKey'})

    t.equal(opts.strategy, 'someOther', 'Use "someOther" as strategy')
    t.equal(opts.key, 'otherKey', 'Use "otherKey" as key')
  })
})

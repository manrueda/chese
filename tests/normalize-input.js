const test = require('tape')
const spy = require('./fn-spy')
const proxyquire = require('proxyquire')

test('normalize-input module', (t) => {
  t.test('with a function', (t) => {
    const stub = spy(a => a)
    const normalizeInput = getModule(stub)
    t.plan(2)

    let input = normalizeInput((a) => a)
    t.equal(input, '(a) => a', 'Plain code')
    t.equal(stub.calls, 1, 'Had call replacer only one time')
  })

  t.test('with code string', (t) => {
    const stub = spy(a => a)
    const normalizeInput = getModule(stub)
    t.plan(2)

    let input = normalizeInput(`(a) => a`)
    t.equal(input, '(a) => a', 'Plain code')
    t.equal(stub.calls, 1, 'Had call replacer only one time')
  })
})

function getModule (stub) {
  return proxyquire('../src/normalize-input', { './replacer': stub.inject })
}

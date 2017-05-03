const test = require('tape')
const spy = require('./fn-spy')
injectGlobals({})
const executer = require('../src/executer')

test('executer module', (t) => {
  t.test('with currentTab strategy', (t) => {
    t.plan(1)
    let stub = spy((opts, cb) => cb(null, {}))
    injectGlobals(stub)
    executer('var a = true;', 'currentTab').then(() => {
      t.equal(stub.calls, 1, 'calls executeScript to run the script')
    }).catch(console.warn)
  })

  t.test('with inspectedWindow strategy', (t) => {
    t.plan(1)
    var stub = spy((code, opts, cb) => cb())
    injectGlobals(stub)
    executer('var a = true;', 'inspectedWindow').then(() => {
      t.equal(stub.calls, 1, 'calls executeScript to run the script')
    }).catch(console.warn)
  })

  t.test('with currentTab strategy throw an error', (t) => {
    t.plan(2)
    let stub = spy((opts, cb) => cb(null, [new Error('some error')]))
    injectGlobals(stub)
    executer('var a = true;', 'currentTab').catch((err) => {
      t.equal(stub.calls, 1, 'calls executeScript to run the script')
      t.equal(err.message, 'some error')
    })
  })

  t.test('with inspectedWindow strategy throw an error', (t) => {
    t.plan(2)
    var stub = spy((code, opts, cb) => cb(null, new Error('some error')))
    injectGlobals(stub)
    executer('var a = true;', 'inspectedWindow').catch((err) => {
      t.equal(stub.calls, 1, 'calls executeScript to run the script')
      t.equal(err.message, 'some error')
    })
  })
})

test.onFinish(() => {
  delete global.window
  delete global.chrome
})

function injectGlobals (stub) {
  global.window = {}
  global.chrome = {
    tabs: {
      executeScript: stub.inject
    },
    devtools: {
      inspectedWindow: {
        eval: stub.inject
      }
    }
  }
}

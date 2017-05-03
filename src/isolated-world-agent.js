import { connectPortName } from './constants'
import * as chromeEnhancer from './chrome-enhancer'
import guidGenerator from './guid'
import { TYPE_INJECT, TARGET_CURRENT_TAB, TARGET_INSPECTED_WINDOWS, codeInjector } from './code-injector'

export default () => {
  codeInjector({
    type: TYPE_INJECT,
    target: TARGET_CURRENT_TAB,
    code: './isolated-world-layer.js'
  })
  let port
  const instance = {
    run: (code, params) => new Promise((resolve, reject) => {
      const guid = guidGenerator()

      const resultListener = ({guid: rstGuid, payload}) => {
        if (guid === rstGuid) {
          port.off('run-return', resultListener)
          port.off('run-error', errorListener)

          resolve(payload)
        }
      }
      port.on('run-return', resultListener)

      const errorListener = ({guid: rstGuid, error}) => {
        if (guid === rstGuid) {
          var err = new Error(error.message)
          err.stack = error.stack

          port.off('run-return', resultListener)
          port.off('run-error', errorListener)
          reject(err)
        }
      }
      port.on('run-error', errorListener)

      port.emit('run', {guid, code: code.toString(), params})
    })
  }
  return chromeEnhancer.tabs.current()
    .then(tab => chromeEnhancer.tabs.connect(tab.id, {
      name: connectPortName
    })).then(newPort => {
      port = chromeEnhancer.port(newPort)
      return instance
    })
}

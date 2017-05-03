import { connectPortName } from './constants'
import * as chromeEnhancer from './chrome-enhancer'
import devtoolsInjector from './devtools-injector'
import guidGenerator from './guid'
import { TYPE_INJECT, TARGET_CURRENT_TAB, TARGET_DEVTOOL, codeInjector } from './code-injector'
export { TARGET_CURRENT_TAB, TARGET_DEVTOOL }

export default ({target, timeout}) => {
  if (target !== TARGET_CURRENT_TAB && TARGET_DEVTOOL) {
    throw new Error('The target must be TARGET_CURRENT_TAB or TARGET_DEVTOOL')
  }
  if (target === TARGET_DEVTOOL) {
    devtoolsInjector()
  } else if (target === TARGET_CURRENT_TAB) {
    codeInjector({
      type: TYPE_INJECT,
      target: target,
      code: './isolated-world-layer.js'
    })
  }

  let port
  const instance = {
    run: (code, params) => new Promise((resolve, reject) => {
      const guid = guidGenerator()
      let timeoutId

      const resultListener = ({guid: rstGuid, payload}) => {
        if (guid === rstGuid) {
          clearTimeout(timeoutId)
          port.off('run-return', resultListener)
          port.off('run-error', errorListener)

          resolve(payload)
        }
      }
      port.on('run-return', resultListener)

      const errorListener = ({guid: rstGuid, error}) => {
        if (guid === rstGuid) {
          clearTimeout(timeoutId)
          var err = new Error(error.message)
          err.stack = error.stack

          port.off('run-return', resultListener)
          port.off('run-error', errorListener)
          reject(err)
        }
      }
      port.on('run-error', errorListener)

      port.emit('run', {guid, code: code.toString(), params})
      timeoutId = setTimeout(() => {
        debugger;
        port.off('run-return', resultListener)
        port.off('run-error', errorListener)
        reject(new Error(`The script didn't finish in ${timeout / 1000} seconds`))
      }, timeout)
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

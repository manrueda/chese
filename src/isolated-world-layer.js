import { connectPortName, isolatedWorldKey } from './constants'
import * as chromeEnhancer from './chrome-enhancer'
import scriptInjector from './document-script-injector'

if (!window[isolatedWorldKey]) {
  chrome.runtime.onConnect.addListener((port) => {
    if (port.name === connectPortName) {
      port = chromeEnhancer.port(port)
      layer(port)
    }
  })

  function layer (port) {
    port.on('run', ({guid, code, params}, event) => {
      scriptInjector(guid, code, params).then(({guid, payload}) => {
        port.emit('run-return', {guid, payload})
      }).catch((err) => {
        let error = {}
        if (!(err instanceof Error)) {
          err = err.payload
        }
        error.message = err.message
        error.stack = err.stack
        port.emit('run-error', {guid, error})
      })
    })
  }

  window[isolatedWorldKey] = true
}

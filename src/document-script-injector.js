import guidGenerator from './guid'
const sessionGuid = guidGenerator()

injectScriptTag(`
  window['${sessionGuid}'] = ${wrapper.toString()}
  //# sourceURL=Chese://Chese/agent-${sessionGuid}.js
`)

export default (guid, fn, params) => new Promise((resolve, reject) => {
  const customEventHandler = function ({detail: event}) {
    document.removeEventListener(guid, customEventHandler)
    if (event.type === 'error') {
      let err = new Error(event.payload.message)
      err.stack = event.payload.stack
      reject({ guid, payload: err })
    } else {
      resolve({ guid, payload: event.payload })
    }
  }
  document.addEventListener(guid, customEventHandler)
  injectScriptTag(getWrappedCode(fn, guid, params))
})

function injectScriptTag (code) {
  const script = document.createElement('script')
  script.textContent = code;

  (document.head || document.documentElement).appendChild(script)
  script.onload = () => script.remove()
}

function getWrappedCode (fn, guid, params = []) {
  return `
    window['${sessionGuid}'](${fn}, '${guid}', ${JSON.stringify(params)})
    //# sourceURL=Chese://Chese/${guid}.js
  `
}

function wrapper (fn, guid, params) {
  function response (err, response) {
    let type
    let payload
    if (err) {
      type = 'error'
      payload = {
        message: err.message,
        stack: err.stack
      }
    } else {
      type = 'ok'
      payload = response
    }

    document.dispatchEvent(new window.CustomEvent(`${guid}`, {
      detail: {
        type,
        payload
      }
    }))
  }
  try {
    let result = fn.apply(window, params)
    result = result instanceof Promise ? result : Promise.resolve(result)
    result.then(rsp => response(null, rsp)).catch(response)
  } catch (error) {
    response(error)
  }
}

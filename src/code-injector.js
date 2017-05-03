export const TARGET_CURRENT_TAB = 'TARGET_CURRENT_TAB'
export const TARGET_DEVTOOL = 'TARGET_DEVTOOL'
export const TYPE_INJECT = 'TYPE_INJECT'
export const TYPE_RUN = 'TYPE_RUN'

export const codeInjector = ({ type, target, code}) => new Promise((resolve, reject) => {
  function cb (err, result) {
    if (err) {
      reject(err)
    } else {
      resolve(result)
    }
  }
  target = target || TYPE_INJECT
  type = type || TARGET_CURRENT_TAB

  if (target === TARGET_CURRENT_TAB && type === TYPE_INJECT) {
    injectCurrentTab(code)
  } else if (target === TARGET_CURRENT_TAB && type === TYPE_RUN) {
    runCurrentTab(code, cb)
  } else if (target === TARGET_DEVTOOL && type === TYPE_INJECT) {
    injectInspectedWindow(code)
  } else if (target === TARGET_DEVTOOL && type === TYPE_RUN) {
    runInspectedWindow(code, cb)
  }
})

function injectCurrentTab (file) {
  chrome.tabs.executeScript(null, { file })
}

function runCurrentTab (code, cb) {
  chrome.tabs.executeScript({
    code: code,
    runAt: 'document_end'
  }, (result, err) => cb(err, result[0]))
}

function injectInspectedWindow (file) {

}

function runInspectedWindow (code, cb) {
  chrome.devtools.inspectedWindow.eval(code, {}, (result, isException) => {
    cb(isException, result)
  })
}

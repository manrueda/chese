export const tabs = {
  query: (queryInfo) => new Promise((resolve, reject) => {
    chrome.tabs.query(queryInfo, resolve)
  }),
  current: () => tabs.query({
    active: true,
    currentWindow: true
  }).then(tabs => tabs[0]),
  connect: (tabId, connectInfo) => chrome.tabs.connect(tabId, connectInfo)
}

export const port = (port) => {
  const listeners = {}
  port.onMessage.addListener((msg) => {
    if (msg.event && listeners[msg.event]) {
      listeners[msg.event].forEach((cb) => cb(msg.payload, msg))
    }
  })
  port.on = (event, cb) => {
    listeners[event] = listeners[event] || []
    listeners[event].push(cb)
    return this
  }
  port.emit = (event, payload) => {
    port.postMessage({event, payload})
    return this
  }
  port.off = (event, fn) => {
    listeners[event] = listeners[event] || []
    let index = listeners[event].indexOf(fn)
    if (index !== -1) {
      listeners[event].splice(index, 1)
    }
    return this
  }
  return port
}

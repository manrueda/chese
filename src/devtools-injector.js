import guidGenerator from './guid'
const sessionGuid = guidGenerator()

export default () => {

  window.addEventListener('message', function(event) {
    debugger;
  });

  inspectedEval(`
    (() => {
      window.postMessage({
        greeting: 'hello there!',
        source: 'my-devtools-extension'
      }, '*');
    })()
    //# sourceURL=Chese://Chese/devtool-${sessionGuid}.js
  `)

}

function inspectedEval (code) {
  chrome.devtools.inspectedWindow.eval(code)
}

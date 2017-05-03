const replacer = require('./replacer')

export default (code, replaces) => {
  code = code instanceof Function ? code.toString() : code
  code = replacer(code, replaces)
  return code
}

const guid = require('./guid')
export default (options) => {
  options = options || {}
  options.strategy = options.strategy || 'inspectedWindow'
  options.key = options.key || guid()
  options.interval = options.interval || 50
  options.timeout = options.timeout || 50000
  return options
}

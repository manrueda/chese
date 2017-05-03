const guid = require('./guid')
import { TARGET_CURRENT_TAB } from './isolated-world-agent'
export default (options) => {
  options = options || {}
  options.target = options.target || TARGET_CURRENT_TAB
  options.timeout = options.timeout || 5000
  return options
}

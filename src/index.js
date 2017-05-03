import normalizeOptions from './normalize-options'
import isolatedWorldAgent from './isolated-world-agent'

export const create = (options) => {
  options = normalizeOptions(options)
  return isolatedWorldAgent(options)
}

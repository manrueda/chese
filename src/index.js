import normalizeOptions from './normalize-options'
import isolatedWorldAgent from './isolated-world-agent'
import devtoolsInjector from './devtools-injector'
export const create = (options) => {
  options = normalizeOptions(options)
  if (options.target === 'TARGET_DEVTOOL') {
    devtoolsInjector()
  } else {
    return isolatedWorldAgent(options)
  }

}

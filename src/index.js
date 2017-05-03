import normalizeOptions from './normalize-options'
import normalizeInput from './normalize-input'
import isolatedWorldAgent from './isolated-world-agent'

export const create = (options) => {
  options = normalizeOptions(options)
  isolatedWorldAgent().then(agent => {

    agent.run((someObj) => {
      return true
    }, [{someProp: true}])

    agent.run((someObj) => {
      return true
    }, [{someProp: true}])

    agent.run((someObj) => {
      return true
    }, [{someProp: true}])

  })
}

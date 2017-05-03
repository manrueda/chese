const path = require('path')

module.exports = require('./webpack.config.js')
module.exports.devtool = 'source-map'
module.exports.output.path = path.resolve(__dirname, 'ext')

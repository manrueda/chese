const path = require('path')

module.exports = {
  entry: {
    chese: './src/index.js',
    'isolated-world-layer': './src/isolated-world-layer.js',
    'page-layer': './src/page-layer.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: 'chese',
    libraryTarget: 'var',
    filename: '[name].js'
  }
}

const path         = require('path'),
      CleanWebpack = require('clean-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src', 'gapi-js.js'),
  build: path.join(__dirname, 'build')
};

module.exports = {
  entry: PATHS.src,
  output: {
    path: PATHS.build,
    filename: 'gapi-js.js',
    sourceMapFilename: '[file].map',
    library: 'gapi-js',
    libraryTarget: 'umd',
  },
  externals: {
    'superagent': {
      commonjs: 'superagent',
      commonjs2: 'superagent',
      amd: 'superagent',
      root: '_'
    }
  },
  plugins: [
    new CleanWebpack([PATHS.build])
  ],
  devtool: 'source-map'

};

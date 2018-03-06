const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  main:     path.join(__dirname, 'src', 'examples.js'),
  build:    path.join(__dirname, 'build')
};

module.exports = {
  entry: {
    'gapi-js': ['babel-polyfill', PATHS.main]
  },
  cache: true,
  output: {
    path: PATHS.build,
    filename: '[name].js',
    sourceMapFilename : '[file].map',
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin ({ title : 'Gapi JS Examples' }),
    new webpack.HotModuleReplacementPlugin({ multiStep: false }),
    new webpack.DefinePlugin({
      conf: {
        api: {
          url: 'https://rest.gadventures.com',
          key: 'xxx'
        }
      }
    }),
  ],
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    port: 5000
  },
};

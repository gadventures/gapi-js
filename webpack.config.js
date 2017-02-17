const path               = require('path'),
      webpack            = require('webpack'),
      merge              = require('webpack-merge'),
      validate           = require('webpack-validator'),
      HtmlWebpackPlugin  = require('html-webpack-plugin'),
      cleanWebpackPlugin = require('clean-webpack-plugin');

const PATHS = {
  src:   path.join(__dirname, 'src'),
  main:  path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'build')
};

const CONFIG = {

  base: {
    entry: {
      app: [PATHS.main]
    },
    cache: true,
    plugins : [ new HtmlWebpackPlugin ({ title : 'Temp' }) ]
  },

  getOutput: {
    output: {
      path: PATHS.build,
      filename: 'gapi-js.js',
      sourceMapFilename : 'gapi-js.js.map',
      publicPath: '/'
    }
  },

  scripts: {
    module: {
      loaders: [
        {
          test: /\.js$/,
          include: PATHS.src,
          loaders: ['babel']
        }
      ]
    }
  },

  getGlobals: {
    plugins: [
      new webpack.DefinePlugin({
        conf: {
          api: {
            url: 'https://rest.gadventures.com',
            key: 'test_29fb8348e8990800ad76e692feb0c8cce47f9476'
          }
        }
      })
    ]
  },

  cleanBuild: {
    plugins: [
      new cleanWebpackPlugin([PATHS.build], {root: process.cwd()})
    ]
  },

  devServer: {
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      stats: 'errors-only',
      port: 3333
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin({ multiStep: true })
    ]
  }
};

const getConfig = function(){
  const cycle = process.env.npm_lifecycle_event;
  if( cycle === 'build' || cycle === 'build:dev') {
    // Production Build: Called on `npm run build`
    return merge(
      CONFIG.base,
      CONFIG.getOutput,
      CONFIG.getGlobals,
      CONFIG.scripts,
      CONFIG.cleanBuild,
      {devtool: 'source-map'}
    );
  } else {
    // Development: Called on `webpack-dev-server`
    return merge(
      CONFIG.base,
      CONFIG.getOutput,
      CONFIG.getGlobals,
      CONFIG.scripts,
      CONFIG.devServer,
      {devtool: 'eval-source-map'}
    );
  }
};

module.exports = validate(getConfig());

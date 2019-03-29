const CLEAN_PLUGIN = require('clean-webpack-plugin'),
  COMMON = require('./webpack.common'),
  MERGE = require('webpack-merge'),
  MINI_CSS_EXTRA_PLUGIN = require('mini-css-extract-plugin'),
  PATH = require('path'),
  WEBPACK = require('webpack');

const DIST = PATH.join(__dirname, '/dist');

const STYLE = {
  test: /\.(sa|sc|c)ss$/,
  use: [
    {
      loader: MINI_CSS_EXTRA_PLUGIN.loader
    },
    {
      loader: 'css-loader'
    },
    {
      loader: 'sass-loader'
    }
  ]
};

const OPTIMIZATION = {
  replace: new WEBPACK.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/),
};

const PREPARE = {
  clean: new CLEAN_PLUGIN([DIST]),
  extractCssFile: new MINI_CSS_EXTRA_PLUGIN({
    filename: 'style/style.css'
  })
};

const PROD_CONFIG = MERGE(COMMON, {
  mode: 'production',
  module: {
    rules: [
      STYLE
    ]
  },
  plugins: [
    OPTIMIZATION.replace,
    PREPARE.extractCssFile,
    PREPARE.clean
  ]
});

module.exports = PROD_CONFIG;
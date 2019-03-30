const BUNDLE_ANALYZER_PLUGIN = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  COMMON = require('./webpack.common'),
  MERGE = require('webpack-merge'),
  WEBPACK = require('webpack');

const BUNDLE_ANALYSIS = {
  analyzer: new BUNDLE_ANALYZER_PLUGIN({
    openAnalyzer: true
  })
};

const STYLE = {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
};

const HMR = new WEBPACK.HotModuleReplacementPlugin();

const DEV_CONFIG = MERGE(COMMON, {
  mode: 'development',
  output: {
    filename: 'app/[name].js'
  },
  module: {
    rules: [
      STYLE
    ]
  },
  plugins: [
    BUNDLE_ANALYSIS.analyzer,
    HMR
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true
  }
});

module.exports = DEV_CONFIG;
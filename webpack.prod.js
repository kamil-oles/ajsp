const CLEAN_PLUGIN = require('clean-webpack-plugin'),
  COMMON = require('./webpack.common'),
  MERGE = require('webpack-merge'),
  MINI_CSS_EXTRA_PLUGIN = require('mini-css-extract-plugin'),
  OPTIMIZE_CSS_ASSETS_PLUGIN = require('optimize-css-assets-webpack-plugin'),
  PATH = require('path'),
  TERSER_PLUGIN = require('terser-webpack-plugin'),
  WEBPACK = require('webpack');

const DIST = PATH.join(__dirname, '/dist');

const STYLE = {
  test: /\.scss$/,
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
  css: new OPTIMIZE_CSS_ASSETS_PLUGIN(),
  js: new TERSER_PLUGIN(),
  replace: new WEBPACK.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/),
};

const PREPARE = {
  clean: new CLEAN_PLUGIN([DIST]),
  extractCssFile: new MINI_CSS_EXTRA_PLUGIN({
    filename: 'style/[name].[contenthash].css'
  })
};

const CHUNKS = {
  contentHash: new WEBPACK.HashedModuleIdsPlugin(),
  splitChunksConfig: {
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all'
      }
    }
  }
};

const PROD_CONFIG = MERGE(COMMON, {
  mode: 'production',
  output: {
    filename: 'app/[name].[contenthash].js'
  },
  module: {
    rules: [
      STYLE
    ]
  },
  plugins: [
    OPTIMIZATION.replace,
    CHUNKS.contentHash,
    PREPARE.extractCssFile,
    PREPARE.clean
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: CHUNKS.splitChunksConfig,
    minimizer: [
      OPTIMIZATION.js,
      OPTIMIZATION.css
    ]
  }
});

module.exports = PROD_CONFIG;
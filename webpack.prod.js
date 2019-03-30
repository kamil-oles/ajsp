const CLEAN_PLUGIN = require('clean-webpack-plugin'),
  COMMON = require('./webpack.common'),
  MERGE = require('webpack-merge'),
  MINI_CSS_EXTRA_PLUGIN = require('mini-css-extract-plugin'),
  PATH = require('path'),
  WEBPACK = require('webpack');

const DIST_C = PATH.join(__dirname, '/dist');

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
  clean: new CLEAN_PLUGIN([DIST_C]),
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
    splitChunks: CHUNKS.splitChunksConfig
  }
});

module.exports = PROD_CONFIG;
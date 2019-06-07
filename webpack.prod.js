const CLEAN_PLUGIN = require('clean-webpack-plugin'),
  COMMON = require('./webpack.common'),
  GLOB = require('glob'),
  MERGE = require('webpack-merge'),
  MINI_CSS_EXTRA_PLUGIN = require('mini-css-extract-plugin'),
  OPTIMIZE_CSS_ASSETS_PLUGIN = require('optimize-css-assets-webpack-plugin'),
  PATH = require('path'),
  PURGE_CSS_PLUGIN = require('purgecss-webpack-plugin'),
  TERSER_PLUGIN = require('terser-webpack-plugin'),
  WEBPACK = require('webpack');

const ROOT = PATH.join(__dirname, '/src');

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

const OPTIMIZATION = {
  scripts: new TERSER_PLUGIN(),
  styles: new OPTIMIZE_CSS_ASSETS_PLUGIN(),
  replace: new WEBPACK.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/)
};

const PREPARE = {
  clean: new CLEAN_PLUGIN(),
  extractCssFile: new MINI_CSS_EXTRA_PLUGIN({
    filename: 'style/[name].[contenthash].css'
  }),
  removeUnusedCss: new PURGE_CSS_PLUGIN({
    paths: GLOB.sync(`${ROOT}/**/*`, { nodir: true })
  })
};

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
    PREPARE.removeUnusedCss,
    PREPARE.clean
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: CHUNKS.splitChunksConfig,
    minimizer: [
      OPTIMIZATION.scripts,
      OPTIMIZATION.styles
    ]
  }
});

module.exports = PROD_CONFIG;
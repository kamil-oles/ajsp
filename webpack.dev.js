const BUNDLE_ANALYZER_PLUGIN = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  HTML_WEBPACK_PLUGIN = require('html-webpack-plugin'),
  PATH = require('path'),
  WEBPACK = require('webpack');

const DIST = PATH.join(__dirname, '/dist'),
  ROOT = PATH.join(__dirname, '/src');

const PATHS = {
  app: PATH.join(ROOT, '/app/app.module.js'),
  index: PATH.join(ROOT, '/index.html')
};

const BUNDLE_ANALYSIS = {
  analyzer: new BUNDLE_ANALYZER_PLUGIN({
    openAnalyzer: true
  })
};

const FONTS = {
  test: /\.(eot|woff2|woff|ttf)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/fonts',
      publicPath: '../assets/fonts'
    }
  }]
};

const HMR = new WEBPACK.HotModuleReplacementPlugin();

const INDEX_HTML = new HTML_WEBPACK_PLUGIN({
  meta: {
    viewport: 'width=device-width, initial-scale=1.0'
  },
  template: PATHS.index
});

const SCRIPTS = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'babel-loader'
    },
    {
      loader: 'eslint-loader',
      options: {
        failOnError: true
      }
    }
  ]
};

const STYLE = {
  test: /\.scss$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader'
  ]
};

const TEMPLATES = {
  test: /\.html$/,
  exclude: /index\.html/,
  use: [{
    loader: 'html-loader',
  }]
};

const DEV_CONFIG = {
  mode: 'development',
  entry: PATHS.app,
  output: {
    path: DIST,
    filename: '[name].js'
  },
  module: {
    rules: [
      FONTS,
      SCRIPTS,
      STYLE,
      TEMPLATES
    ]
  },
  plugins: [
    BUNDLE_ANALYSIS.analyzer,
    HMR,
    INDEX_HTML
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true
  }
};

module.exports = DEV_CONFIG;
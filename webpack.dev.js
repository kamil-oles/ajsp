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
  }),
  replace: new WEBPACK.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/),
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

const INDEX_HTML = new HTML_WEBPACK_PLUGIN({
  inject: 'head',
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

const CONFIG = {
  mode: 'development',
  entry: PATHS.app,
  output: {
    path: DIST,
    filename: 'app/app.js'
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
    BUNDLE_ANALYSIS.replace,
    INDEX_HTML
  ],
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    open: true
  }
};

module.exports = CONFIG;
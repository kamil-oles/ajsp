const COPY_PLUGIN = require('copy-webpack-plugin'),
  HTML_WEBPACK_PLUGIN = require('html-webpack-plugin'),
  PATH = require('path');

const DIST = PATH.join(__dirname, '/dist'),
  ROOT = PATH.join(__dirname, '/src');

const PATHS = {
  app: PATH.join(ROOT, '/app/app.module.js'),
  index: PATH.join(ROOT, '/index.html')
};

const FAVICON_COPY = new COPY_PLUGIN([{
  from: './src/assets/icons/favicon.ico'
}]);

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

const TEMPLATES = {
  test: /\.html$/,
  exclude: /index\.html/,
  use: [{
    loader: 'html-loader',
  }]
};

const COMMON_CONFIG = {
  entry: PATHS.app,
  output: {
    path: DIST
  },
  module: {
    rules: [
      FONTS,
      SCRIPTS,
      TEMPLATES
    ]
  },
  plugins: [
    FAVICON_COPY,
    INDEX_HTML
  ],
};

module.exports = COMMON_CONFIG;
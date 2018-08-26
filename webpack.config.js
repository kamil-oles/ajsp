const CleanPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtraPlugin = require('mini-css-extract-plugin'),
  path = require('path');

const root = path.join(__dirname, '/src'),
  dist = path.join(__dirname, '/dist');

const paths = {
  app: path.join(root, '/app/root.module.js'),
  index: path.join(root, '/index.html')
};

const eslint = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'eslint-loader',
    options: {
      failOnError: true,
      failOnWarning: true
    }
  }]
};

const scripts = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'babel-loader'
  }]
};

const style = {
  test: /\.scss$/,
  use: [{
    loader: MiniCssExtraPlugin.loader
  },
  {
    loader: 'css-loader'
  },
  {
    loader: 'sass-loader'
  }]
};

const templates = {
  test: /\.html$/,
  exclude: /index\.html/,
  use: [{
    loader: 'ngtemplate-loader?relativeTo=' + (path.join(root, '/app'))
  },
  {
    loader: 'html-loader'
  }]
};

const prep = {
  clean: new CleanPlugin([
    dist
  ]),
  style: new MiniCssExtraPlugin({
    filename: 'style/style.css'
  }),
  template: new HtmlWebpackPlugin({
    inject: false,
    template: paths.index,
    filename: 'index.html'
  })
};

const config = {
  entry: paths.app,
  output: {
    path: dist,
    filename: 'app/app.js'
  },
  module: {
    rules: [
      scripts,
      style,
      templates,
      eslint
    ]
  },
  plugins: [
    prep.clean,
    prep.style,
    prep.template
  ],
  devtool: 'source-map'
};

module.exports = config;
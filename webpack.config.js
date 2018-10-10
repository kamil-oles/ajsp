const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  CleanPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtraPlugin = require('mini-css-extract-plugin'),
  path = require('path'),
  Webpack = require('webpack');

const root = path.join(__dirname, '/src'),
  dist = path.join(__dirname, '/dist');

const paths = {
  app: path.join(root, '/app/app.module.js'),
  index: path.join(root, '/index.html')
};

const assets = {
  test: /\.(eot|woff2|woff|ttf)$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/fonts'
    }
  }]
};

const eslint = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  use: [{
    loader: 'eslint-loader',
    options: {
      failOnError: true
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

const prepare = {
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

const optimization = {
  analyzer: new BundleAnalyzerPlugin({
    openAnalyzer: false
  }),
  replace: new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/),
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
      assets,
      templates,
      eslint
    ]
  },
  plugins: [
    optimization.analyzer,
    optimization.replace,
    prepare.clean,
    prepare.style,
    prepare.template
  ],
  devtool: 'source-map'
};

module.exports = config;
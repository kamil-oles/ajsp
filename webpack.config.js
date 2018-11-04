const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
  CleanPlugin = require('clean-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtraPlugin = require('mini-css-extract-plugin'),
  path = require('path'),
  Webpack = require('webpack');

const dist = path.join(__dirname, '/dist'),
  root = path.join(__dirname, '/src');

const paths = {
  app: path.join(root, '/app/app.module.js'),
  index: path.join(root, '/index.html')
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

const fonts = {
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

const images = {
  test: /\.jpg$/,
  use: [{
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/images',
      publicPath: '../assets/images'
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
    loader: 'html-loader',
    options: {
      attrs: [':ng-src']
    }
  }]
};

const optimization = {
  analyzer: new BundleAnalyzerPlugin({
    openAnalyzer: true
  }),
  replace: new Webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /pl/),
};

const prepare = {
  clean: new CleanPlugin([dist]),
  extractCssFile: new MiniCssExtraPlugin({
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
      images,
      fonts,
      templates,
      eslint
    ]
  },
  plugins: [
    optimization.analyzer,
    optimization.replace,
    prepare.extractCssFile,
    prepare.template,
    prepare.clean
  ],
  devtool: 'source-map'
};

module.exports = config;
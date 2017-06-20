const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const script = process.env.npm_lifecycle_event;
const isTest = script === 'test' || script === 'test-watch';
const isProd = script === 'build';
const isDev = !isTest && !isProd;

const include = [
  path.resolve(__dirname, 'app')
];

module.exports = function() {
  let config = {};

  config.entry = path.resolve(__dirname, 'app', 'index.js');
  config.output = {
    path: path.resolve(__dirname, isProd ? 'dist' : 'app'),
    filename: '[name].js',
    publicPath: '/'
  };

  if (isProd) {
    config.devtool = 'source-map';
  }

  // vue.js npm package is runtime-only - use the dist version to get the compiler
  config.resolve = {
    extensions: ['.js', '.scss', '.html'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  };

  config.cache = true;

  config.module = {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include
      },
      {
        test: /.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader',
        include
      },
      {
        test: /.html$/,
        loader: 'raw-loader?html-minify-loader',
        include
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        options: {
          removeTags: true,
          removingTags: ['style']
        },
        include
      }
    ]
  };


  config.plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        IS_DEV: !isProd,
        IS_PROD: isProd
      }
    })
  ];

  if (!isTest) {
    config.plugins.push(
        new HtmlWebpackPlugin({
          template: 'app/index.ejs',
          isDev,
          isProd
        })
    );
  }

  config.devServer = {
    contentBase: './app',
    historyApiFallback: {
      index: 'app/index.html'
    },
    port: 8080
  };

  return config;
}();
const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const rm = require('rimraf')
const utils = require('./utils')

const isProduction = process.env.NODE_ENV === 'production'
const bundlePath = path.join(process.cwd(), './dist')
const htmlPath = path.join(process.cwd(), './pages')

// 需新建 foo 页面时，在此添加 foo: './src/foo.js'
// 并新建 src/foo.js 与 src/templates/foo.html
const entry = {
  index: './src/index.js',
  vendor: ['vue']
}

module.exports = {
  entry,
  output: {
    filename: '[name].bundle.js',
    path: bundlePath,
    publicPath: '/dist/'
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ].concat(utils.generateTemplates(entry, htmlPath, isProduction)),
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: utils.getStyleLoaders(isProduction)
        }
      },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 15000,
          name: 'img/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.styl'],
    modules: [path.join(process.cwd(), './src'), 'node_modules'],
    alias: { 'vue$': 'vue/dist/vue.runtime.js' }
  },
  performance: { hints: false },
  devtool: '#eval-source-map',
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    contentBase: path.join(process.cwd(), './pages'),
    compress: true,
    port: 9000,
    noInfo: true,
    // 代理后端接口
    proxy: {
      // '/api': { target: 'http://backend-address/' }
    }
  }
}

rm.sync(path.join(bundlePath, './*'))
if (isProduction) {
  module.exports.devtool = '#source-map'
  module.exports.output.filename = '[name].[chunkhash].bundle.js'
  module.exports.plugins = module.exports.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: '"production"' }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: { warnings: false }
    }),
    new webpack.LoaderOptionsPlugin({ minimize: true })
  ])
}

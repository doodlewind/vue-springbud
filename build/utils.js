var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  generateTemplates: function (entry, htmlPath, isProduction) {
    var plugins = []
    Object.keys(entry).map(function (entryName) {
      if (entryName !== 'vendor') {
        let htmlName = entryName + '.html'
        plugins.push(new HtmlWebpackPlugin({
          hash: isProduction,
          filename: path.join(htmlPath, htmlName),
          template: 'src/templates/' + htmlName,
          chunks: ['manifest', 'vendor', entryName]
        }))
      }
    })
    return plugins
  },
  getStyleLoaders: function (isProduction) {
    if (!isProduction) {
      return {
        styl: 'vue-style-loader!css-loader!stylus-loader'
      }
    }
    return {
      styl: ExtractTextPlugin.extract({
        use: ['css-loader', 'stylus-loader'],
        fallback: 'vue-style-loader'
      }),
      css: ExtractTextPlugin.extract({
        use: 'css-loader',
        fallback: 'vue-style-loader'
      })
    }
  }
}

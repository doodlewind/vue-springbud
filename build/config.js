var path = require('path');
var ProvidePlugin = require("webpack").ProvidePlugin;
var CommonsChunkPlugin = require("webpack").optimize.CommonsChunkPlugin;
var HtmlWebpackPlugin = require("html-webpack-plugin");


var BUNDLE_PATH = "dist";
var HTML_PATH = path.join(process.cwd(), "html");


module.exports = {
  bundlePath: BUNDLE_PATH,
  entry: {
    a: "./app/a",
    b: "./app/b",
    c: "./app/c"
  },
  output: {
    // npm script always runs from project root
    path: path.join(process.cwd(), BUNDLE_PATH),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    publicPath: "/" + BUNDLE_PATH + "/"
  },
  plugins: [
    // global dependency
    new ProvidePlugin({
      $: 'jquery'
    }),

    // code splitting
    new CommonsChunkPlugin({
      name: "commons-b-c",
      // use entry names, not filename or module name
      chunks: ["b", "c"]
    }),
    new CommonsChunkPlugin({
      name: "commons-a-b-c",
      // load b and c from previous common chunk
      chunks: ["a", "commons-b-c"]
    }),

    // generate entry HTML
    new HtmlWebpackPlugin({
      filename: path.join(HTML_PATH, 'a.html'),
      template: 'app/templates/a.html',
      chunks: ['commons-a-b-c', 'a']
    }),
    new HtmlWebpackPlugin({
      filename: path.join(HTML_PATH, 'b.html'),
      template: 'app/templates/b.html',
      chunks: ['commons-a-b-c', 'commons-b-c', 'b']
    }),
    new HtmlWebpackPlugin({
      filename: path.join(HTML_PATH, 'c.html'),
      template: 'app/templates/c.html',
      chunks: ['commons-a-b-c', 'commons-b-c', 'c']
    }),
  ],
}

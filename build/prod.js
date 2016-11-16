var bundlePath = require('./config').bundlePath;
var conf = require('./webpack.base.conf');
var del = require('del');
var webpack = require("webpack");

// conf.output.filename = "[name].[chunkhash].bundle.js";
conf.output.filename = "[name].bundle.js";
conf.debug = true;
conf.devtool = "source-map";
conf.plugins = conf.plugins.concat([
  new webpack.DefinePlugin({
    "process.env": { "NODE_ENV": JSON.stringify("production") }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
]);

// del.sync([bundlePath + '/*']);
webpack(conf, function(err, stats) {
  if (err) throw err;
  console.log(stats.toString({
    colors: true,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false,
    modules: false,
    children: false,
    version: true,
    cached: false,
    cachedAssets: false,
    reasons: false,
    source: false,
    errorDetails: false
  }));
  console.log("build success");
});

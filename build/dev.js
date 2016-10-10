var bundlePath = require('./config').bundlePath;
var conf = require('./webpack.base.conf');
var del = require('del');
var webpack = require("webpack");

conf.output.filename = "[name].bundle.js";
conf.debug = true;
conf.devtool = "cheap-eval-source-map";
conf.watch = true;

del.sync([bundlePath + '/*']);
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
});

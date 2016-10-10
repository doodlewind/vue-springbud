var bc = require('./modules/lib-b-c')

console.log('entry c loaded')
bc.demo()
// lazy load abc
setTimeout(function() {
  require.ensure(['./modules/lib-a-b-c'], function () {
    var abc = require('./modules/lib-a-b-c')
    abc.demo()
  })
}, 5e3)

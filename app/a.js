var a1 = require('./modules/a-1')
var a2 = require('./modules/a-2')
var abc = require('./modules/lib-a-b-c')
var Vue = require('vue')
var App = require('./components/App.vue')

console.log('entry a loaded')
a1.demo()
a2.demo()
abc.demo()

new Vue({
  el: '#app',
  render: h => h(App)
})

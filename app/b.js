var b1 = require('./modules/b-1')
var abc = require('./modules/lib-a-b-c')
var bc = require('./modules/lib-b-c')

console.log('entry b loaded')
b1.demo()
abc.demo()
bc.demo()
$('body').html('jquery loaded')

global.jQuery = global.$ = require('jquery')

global.Rx = require('rx-lite')

global.Tether = require('tether')
global.Drop = require('tether-drop')

var cc = require('classcaps')
var ccj = require('classcaps/jquery')
ccj(cc, global.$)

require('es6-promise').polyfill()
require('es6-object-assign').polyfill()
require('es6-symbol/implement')

global.BASEPATH = global.BASEPATH || ''

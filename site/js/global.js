global.jQuery = global.$ = require('jquery')

global.Rx = require('rx-lite')

global.Tether = require('tether')
global.Drop = require('tether-drop')

const capsid = global.capsid = require('capsid')
require('capsid/jquery')(capsid, global.jQuery)

require('es6-promise').polyfill()
require('es6-object-assign').polyfill()
require('es6-symbol/implement')

global.BASEPATH = global.BASEPATH || ''

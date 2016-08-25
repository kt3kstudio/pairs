global.jQuery = global.$ = require('jquery')

global.Rx = require('rx-lite')

global.Tether = require('tether')
global.Drop = require('tether-drop')

require('class-component')

$.cc.event = (event, selector, key) => Cls => {
  if (key == null) {
    key = selector
    selector = null
  }

  $.cc.on(event).at(selector)(Cls.prototype, key)
}

require('es6-promise').polyfill()
require('es6-object-assign').polyfill()
require('es6-symbol/implement')

global.BASEPATH = global.BASEPATH || ''

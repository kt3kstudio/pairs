const { on } = capsid
const { DIRS } = require('spn')

exports.block = require('./block')
exports.sprite = require('./sprite')
exports.scene = require('./scene')
exports.being = require('./being')
exports.body = require('./body')

exports.blockbody = opts => Cls => {
  const handlerKey = '__blockbody__showing__handler__'
  on('showing')(Cls.prototype, handlerKey)
  Cls.prototype[handlerKey] = function () { this.setRect(this.getRect()) }

  exports.body(opts)(exports.block(Cls))
}

exports.DIRS = DIRS

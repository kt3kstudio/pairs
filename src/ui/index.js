const { on } = capsid
const { DIRS } = require('spn')

exports.block = require('./block')
exports.sprite = require('./sprite')
exports.scene = require('./scene')
exports.being = require('./being')
exports.body = require('./body')

/**
 * blockbody class decorator.
 *
 * @block + @body = @blockbody
 */
exports.blockbody = opts => Cls => {
  const handlerKey = '__blockbody__showing__handler__'
  on('showing')(Cls.prototype, handlerKey)
  Cls.prototype[handlerKey] = function () { this.setRect(this.getRect()) }

  exports.body(opts)(exports.block(Cls))
}

/**
 * UI Blocking method decorator.
 *
 * If specified, the method blocks the UI during its process.
 * Nested invocation of decorated methods are supported.
 * When multiple @blocking methods are called, then the UI is unblocked
 * When all the methods are finished.
 */
exports.blocking = (target, key, descriptor) => {
  const method = descriptor.value

  descriptor.value = function () {
    const blocker = $('.ui-blocker').first().cc.get('ui-blocker')

    blocker.block()

    const result = method.apply(this, arguments)

    Promise.resolve(result).then(() => blocker.unblock())

    return result
  }
}

exports.DIRS = DIRS

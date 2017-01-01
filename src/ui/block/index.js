const { on } = $.cc
const { traits } = require('traits-decorator')

module.exports = Cls => {
  on('block-need-guiding-rect')(Cls.prototype, 'onChildNeedGuidingRect')

  traits(require('./block'))(Cls)
}

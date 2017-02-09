const { on } = capsid
const { traits } = require('traits-decorator')

module.exports = Cls => {
  on('block-need-guiding-rect')(Cls.prototype, 'onChildNeedGuidingRect')

  return traits(require('./block'))(Cls)
}

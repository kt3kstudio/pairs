const { traits } = require('traits-decorator')
const { Being } = require('spn')
const { component } = $.cc

module.exports = Cls => traits(Being)(component(Cls))
module.exports.dur = dur => Cls => {
  Cls.SHOW_DURATION = dur

  return module.exports(Cls)
}

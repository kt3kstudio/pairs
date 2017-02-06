const {traits} = require('traits-decorator')

module.exports = traits(require('./sprite'))
module.exports.static = img => Cls => {
  Cls.prototype.image = () => img

  traits(require('./static-sprite'))(Cls)
}
module.exports.stayRun = traits(require('./stay-run-sprite'))
module.exports.character = traits(require('./char-sprite'))
module.exports.relativeBody = traits(require('./relative-body'))

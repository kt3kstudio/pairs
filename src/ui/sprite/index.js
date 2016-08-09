const {traits} = require('traits-decorator')

module.exports = traits(require('./sprite'))
module.exports.static = traits(require('./static-sprite'))
module.exports.stayRun = traits(require('./stay-run-sprite'))
module.exports.character = traits(require('./char-sprite'))
module.exports.relativeBody = traits(require('./relative-body'))

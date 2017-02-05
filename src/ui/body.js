const { Prebody } = require('spn')
const { traits } = require('traits-decorator')

const { component } = capsid

module.exports = Cls => traits(Prebody)(component(Cls))

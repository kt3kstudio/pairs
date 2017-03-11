const Resident = require('./resident')
const { sprite } = require('../../ui')
const { animation } = require('spn')

const { component } = capsid

@component
@animation.show('bom-appear', 400)
@animation.hide('bom-disappear', 400)
@sprite.static(`${BASEPATH}/img/moo.svg`)
class Moo extends Resident {
}

module.exports = Moo

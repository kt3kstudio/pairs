const Resident = require('./resident')
const {animation} = require('spn')

const {component} = $.cc

@component
@animation
  .show('bom-appear', 400)
  .hide('bom-disappear', 400)
class Moo extends Resident {
  image () {
    return `${global.BASEPATH}/img/moo.svg`
  }
}

module.exports = Moo

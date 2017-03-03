
const { ratio, Body } = require('spn')

const { sprite } = require('../../ui')
const { component } = capsid

@sprite.character
@component
@ratio.x(0.5)
@ratio.y(1)
class Hero extends Body {

  willShow () {
    this.updateSprite()

    return super.willShow()
  }

}

module.exports = Hero

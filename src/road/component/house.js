const { ratio, Body } = require('spn')
const { block } = require('../../ui')

const { component } = capsid

@block
@ratio.x(0.5)
@ratio.y(1)
@component
class House extends Body {
  block (guideRect) {
    return guideRect
      .scaleBottom(0.80)
      .cutBottom(100)
      .cutLeft(150)
      .cutRight(100)
  }
}

House.SHOW_DURATION = 500

module.exports = House

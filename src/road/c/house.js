const { block, body } = require('../../ui')

@block
@body({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class House {
  block (guideRect) {
    return guideRect
      .scaleBottom(0.80)
      .cutBottom(100)
      .cutLeft(150)
      .cutRight(100)
  }
}

module.exports = House

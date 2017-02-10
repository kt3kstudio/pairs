const { block, body } = require('../../ui')

@block
@body({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class House {
  block (guideRect) {
    return guideRect.slice({
      left: 50,
      width: 100,
      bottom: '20%',
      height: 100
    })
  }
}

module.exports = House

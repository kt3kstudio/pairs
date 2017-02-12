const { block, body } = require('../../ui')

@block
@body({ ratio: { x: 0.5, y: 1 } })
class Entrance {
  __init__ () {
    this.setRect(this.getRect())
  }

  block (rect) {
    return rect.slice({
      width: 100,
      height: 100,
      bottom: '20%',
      right: 50
    })
  }
}

module.exports = Entrance

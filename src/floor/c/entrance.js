const { block, body } = require('../../ui')

@block
@body({ ratio: { x: 0.5, y: 1 } })
class Entrance {

  __init__ () {
    this.setRect(this.getRect())
  }

  block (rect) {
    return rect.slice({
      left: 0,
      bottom: '35%',
      height: 300,
      width: 170
    })
  }

  open () {
    return Promise.resolve()
  }
}

module.exports = Entrance

const { block, body } = require('../../ui')

const { on, emit } = capsid

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

  @on('click') @emit.last('click-on-entrance') onClick () {
    return { entrance: this }
  }
}

module.exports = Entrance

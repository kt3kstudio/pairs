const { blockbody } = require('../../ui')

const { on, emits } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 } })
class Entrance {

  block (rect) {
    return rect.slice({
      width: 100,
      height: 100,
      bottom: '20%',
      right: 50
    })
  }

  @on('click') @emits('click-on-entrance') onClick () {
    return { entrance: this }
  }
}

module.exports = Entrance

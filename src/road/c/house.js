const { block, body } = require('../../ui')

const { on, emit } = capsid

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

  @on('click') @emit.last('click-on-room') onClick () {
    return { room: this }
  }
}

module.exports = House

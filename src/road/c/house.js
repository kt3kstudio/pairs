const { blockbody } = require('../../ui')

const { on, emits } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class House {
  block (guideRect) {
    return guideRect.slice({
      left: 50,
      width: 100,
      bottom: '20%',
      height: 100
    })
  }

  @on('click') @emits('click-on-room') onClick () {
    return { room: this }
  }
}

module.exports = House

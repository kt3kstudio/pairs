const { block, body } = require('../../ui')
const { trigger } = require('../../util')

const { on, emit } = capsid

@block @body({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
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

  close () {
    return Promise.resolve()
  }

  @on('click') onClick () {
    trigger(this.el, 'door-knock', { knocked: this })
  }

  @on('get-walker') @emit.last('scene-reload') onGetWalker (e) {
    e.detail.walker.goToRoad()
  }
}

module.exports = Entrance

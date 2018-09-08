const { blockbody, DIRS } = require('../../ui')
const { trigger } = require('../../util')

const { on, emits } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Entrance {

  block (rect) {
    return rect.slice({
      left: 0,
      bottom: '35%',
      height: 100,
      width: 170
    })
  }

  open () {
    return Promise.resolve()
  }

  close () {
    return Promise.resolve()
  }

  getAcceptPoint () {
    return this.getPoint()
  }

  getAcceptDir () {
    return DIRS.DOWN
  }

  @on('click') onClick () {
    trigger(this.el, 'door-knock', { knocked: this })
  }

  @on('get-walker') @emits('scene-reload') onGetWalker (e) {
    e.detail.walker.goToRoad()
  }
}

module.exports = Entrance

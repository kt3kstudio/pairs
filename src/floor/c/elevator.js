const { blockbody } = require('../../ui')
const { trigger } = require('../../util')

const { on } = capsid

@blockbody({ ratio: { x: 0.5, y: 1 }, showDuration: 500 })
class Elevator {

  block (rect) {
    return rect.slice({
      width: 110,
      height: 100,
      bottom: '35%',
      left: +this.$el.attr('x')
    })
  }

  open () {
    return Promise.resolve()
  }

  @on('click') onClick () {
    trigger(this.el, 'door-knock', { knocked: this })
  }

}

module.exports = Elevator

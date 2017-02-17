const { body, block } = require('../../ui')

@block @body({ ratio: { x: 0.5, y: 1 } })
class Elevator {

  __init__ () {
    this.setRect(this.getRect())
  }

  block (rect) {
    console.log(+this.$el.attr('x'))
    console.log(rect)

    return rect.slice({
      width: 110,
      height: 100,
      bottom: '35%',
      left: +this.$el.attr('x')
    })
  }

}

module.exports = Elevator

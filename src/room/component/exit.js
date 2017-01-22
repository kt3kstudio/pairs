const { animation, Body } = require('spn')
const { block } = require('../../ui')

const { on, emit, component } = capsid

@block
@animation.show('fade-in')
@animation.hide('fade-out')
@component
class Exit extends Body {
  block (rect) {
    return rect
      .scaleTop(3 / 10)
      .scaleBottom(1 / 3)
      .scaleLeft(5 / 9)
      .scaleRight(1 / 5)
  }

  willShow () {
    this.$el.text('EXIT')
    this.setRect(this.getRect())

    return super.willShow()
  }

  didShow () {
    this.$el.css('opacity', 1)
  }

  didHide () {
    this.$el.css('opacity', 0)
  }

  @emit('exit-room')
  @on('click') exit () {
    console.log('exit clicked')
  }
}

module.exports = Exit

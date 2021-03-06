
const { Body, animation } = require('spn')
const { block } = require('../../ui')
const { component } = capsid

@block
@component
@animation.show('fade-in')
@animation.hide('fade-out')
class Window extends Body {
  block (rect) {
    return rect
      .scaleLeft(9 / 10)
      .scaleRight(4 / 9)
      .scaleTop(9 / 10)
      .scaleBottom(2 / 9)
  }

  show () {
    this.setRect(this.getRect())

    return super.show()
  }

  didShow () {
    this.$el.css('opacity', 1)
  }

  didHide () {
    this.$el.css('opacity', 0)
  }
}

module.exports = Window

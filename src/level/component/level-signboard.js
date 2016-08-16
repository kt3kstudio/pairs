const {ratio, Body, animation} = require('spn')
const block = require('../../ui/block')

const {component} = $.cc

@component
@block
@animation
  .show('bom-appear', 400)
  .hide('bom-disappear', 400)
class LevelSignboard extends Body {
  willShow () {
    this.needsGuidingRect()

    this.initialRect = this.guidingRect.scaleLeft(2/3).scaleRight(1/2).scaleTop(2/3).scaleBottom(1/2)
    this.setRect(this.initialRect)

    super.willShow()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }
  willHide () {
    this.elem.css('opacity', 0)
  }
}

module.exports = LevelSignboard

const sprite = require('../../ui/sprite')

const {ratio, width, height, Body, animation} = require('spn')

const {component} = $.cc

@sprite.static
@ratio.x(0.5).y(1)
@width(50) @height(50)
@animation
  .show('char-appear', 1000)
  .hide('char-disappear', 1000)
@component
class LevelKey extends Body {
  /**
   * @param {jQuery} elem The element
   */
  constructor (elem) {
    super()

    this.initSprite()
  }

  image () {
    return `${global.BASEPATH}/img/key.svg`
  }

  /**
   * @override
   */
  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  /**
   * @override
   */
  didShow () {
    this.elem.css('opacity', 1)
  }

  /**
   * @override
   */
  willHide () {
    this.elem.css('opacity', 0)
  }

  /**
   * Jumps with the given duration.
   */
  jump (duration = 300) {
    return this.elem.anim('jump', duration)
  }
}

module.exports = LevelKey

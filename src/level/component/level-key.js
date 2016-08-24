const sprite = require('../../ui/sprite')

const {Body, decorators} = require('spn')
const {animation, ratio} = decorators
const {component} = $.cc

@sprite.static
@ratio.x(0.5).y(1)
@animation
  .show('level-key-show', 3000)
  .hide('level-key-hide', 1500)
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
}

module.exports = LevelKey

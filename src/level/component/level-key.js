const sprite = require('../../ui/sprite')

const {Body, decorators} = require('spn')
const {animation, ratio} = decorators
const {component} = capsid

@sprite.static(`${global.BASEPATH}/img/key.svg`)
@ratio.x(0.5)
@ratio.y(1)
@animation.show('level-key-show', 3000)
@animation.hide('level-key-hide', 1500)
@component
class LevelKey extends Body {
  /**
   * @param {jQuery} elem The element
   */
  __init__ () {
    this.initSprite()
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

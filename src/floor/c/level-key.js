const sprite = require('../../ui/sprite')

const {ratio, width, height, Body, animation} = require('spn')

const {component} = capsid

@sprite.static(`${global.BASEPATH}/img/key.svg`)
@ratio.x(0.5)
@ratio.y(1)
@width(50) @height(50)
@animation.show('char-appear', 1000)
@animation.hide('char-disappear', 1000)
@component
class LevelKey extends Body {

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

  /**
   * Jumps with the given duration.
   */
  jump (duration = 300) {
    return this.elem.anim('jump', duration)
  }
}

module.exports = LevelKey

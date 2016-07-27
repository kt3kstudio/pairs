const StaticSprite = require('../../ui/sprite/static-sprite')

const {traits} = require('traits-decorator')
const {ratio, width, height, Body, animation} = require('spn')

const {component} = $.cc

@traits(StaticSprite)
@ratio.x(0.5) @ratio.y(1)
@width(50) @height(50)
@animation.show('char-appear', 1000)
@animation.hide('char-disappear', 1000)
@component('level-key')
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

const StaticSprite = require('../../ui/sprite/static-sprite')
const RelativeBody = require('../../ui/sprite/relative-body')

const {GridWalker, Body, Animation, decorators} = require('spn')
const {animation, ratio} = decorators
const {traits} = require('traits-decorator')
const {component} = $.cc

@traits(StaticSprite)
@ratio.x(0.5) @ratio.y(1)
@animation.show('level-key-show', 3000)
@animation.hide('level-key-hide', 1500)
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

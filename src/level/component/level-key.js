const StaticSprite = require('../../ui/sprite/static-sprite')
const RelativeBody = require('../../ui/sprite/relative-body')

const {GridWalker, Body, Animation} = require('spn')
const {traits} = require('traits-decorator')
const {component} = $.cc

@traits(StaticSprite)
@component('level-key')
class LevelKey extends Body {
  /**
   * @param {jQuery} elem The element
   */
  constructor (elem) {
    super()

    this.initSprite()
  }

  showAnim () { return new Animation('bom-appear', 400) }
  hideAnim () { return new Animation('bom-disappear', 400) }

  ratioX () { return 0.5 }
  ratioY () { return 1 }

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

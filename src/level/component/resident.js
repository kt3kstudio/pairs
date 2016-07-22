const StaticSprite = require('../../ui/sprite/static-sprite')
const RelativeBody = require('../../ui/sprite/relative-body')
const Speaker = require('../../ui/screenplay/speaker')
const {traits} = require('traits-decorator')
const {Body} = require('spn')

@traits(RelativeBody)
@traits(StaticSprite)
@traits(Speaker)
class Resident extends Body {

  ratioX () { return 0.5 }
  ratioY () { return 1 }

  constructor (elem) {
    super()

    this.initSprite()
    this.setSpeaker(elem)

    const [x, y] = elem.attr('xy').split(/\s+/)

    this.relX = x / 100
    this.relY = y / 100
    this.relW = 1 / 8
    this.relH = 1 / 8
  }

  willShow () {
    this.updateSprite()

    return super.willShow()
  }

  didShow () {
    this.elem.css('opacity', 1)
  }

  willHide () {
    this.elem.css('opacity', 0)
  }
}

module.exports = Resident
